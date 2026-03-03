import logging
from typing import List
from datetime import date, datetime

from .base_parser import BaseParser
from app.schemas.lesson import LessonCreate
from app.schemas.teacher import TeacherCreate
from app.schemas.room import RoomCreate
from app.db.repositories.teacher import TeacherRepository
from app.db.repositories.room import RoomRepository

logger = logging.getLogger(__name__)


class ScheduleParser(BaseParser):
    """
    Парсер расписания, обращается к эндпоинту /schedule/GetSchedule.
    Возвращает список объектов LessonCreate.
    """

    def __init__(
        self, http_client, teacher_repo: TeacherRepository, room_repo: RoomRepository
    ):
        super().__init__(http_client)
        self.teacher_repo = teacher_repo
        self.room_repo = room_repo

    async def fetch_schedule(
        self,
        group_id: int,
        target_date: date,
        target_type: int = 2,  # 2 - для группы
    ) -> List[LessonCreate]:
        """
        Получает расписание для указанной группы на неделю, начинающуюся с target_date.
        """
        payload = {
            "date": target_date.isoformat(),
            "Id": group_id,
            "targetType": target_type,
        }
        logger.debug(
            "Запрос расписания для группы %d на дату %s", group_id, target_date
        )
        response = await self.http.post("/schedule/GetSchedule", data=payload)
        response.raise_for_status()
        data = response.json()  # ожидается список дней

        lessons: List[LessonCreate] = []

        for day in data:
            # Проверка дня
            day_date_str = day.get("Date")
            weekday = day.get("WeekDay")
            if not day_date_str or not weekday:
                logger.warning("Пропущен день без даты или WeekDay: %s", day)
                continue

            try:
                day_date = datetime.fromisoformat(day_date_str).date()
            except (ValueError, TypeError):
                logger.warning("Некорректный формат даты: %s", day_date_str)
                continue

            for les in day.get("Lessons", []):
                lesson_id = les.get("Id")
                if not lesson_id:
                    logger.warning("Пропущено занятие без Id: %s", les)
                    continue

                # Обработка преподавателя
                teacher_id = None
                teacher_data = les.get("Teacher")
                if teacher_data:
                    tid = teacher_data.get("Id")
                    tname = teacher_data.get("Name")
                    if tid and tname:
                        teacher_create = TeacherCreate(
                            id=tid, name=" ".join(tname.split())
                        )
                        await self.teacher_repo.upsert(teacher_create)
                        teacher_id = tid

                # Обработка аудитории
                room_id = None
                room_data = les.get("Aud")
                if room_data:
                    rid = room_data.get("Id")
                    rname = room_data.get("Name")
                    if rid and rname:
                        room_create = RoomCreate(id=rid, name=rname.strip())
                        await self.room_repo.upsert(room_create)
                        room_id = rid

                # Подгруппа
                subgroup = ""
                groups = les.get("Groups") or []
                if groups:
                    subgroup = groups[0].get("Subgroup", "")

                # Время
                time_begin_str = les.get("TimeBegin")
                time_end_str = les.get("TimeEnd")
                if not time_begin_str or not time_end_str:
                    logger.warning("Пропущено занятие %d без времени", lesson_id)
                    continue
                try:
                    time_begin = datetime.fromisoformat(time_begin_str).time()
                    time_end = datetime.fromisoformat(time_end_str).time()
                except (ValueError, TypeError):
                    logger.warning(
                        "Некорректный формат времени для занятия %d", lesson_id
                    )
                    continue

                # Строковые поля
                discipline = les["Discipline"].strip()
                lesson_type = les["LessonType"].strip()

                lesson: LessonCreate = LessonCreate(
                    lessonId=lesson_id,
                    groupId=group_id,
                    date=day_date,
                    weekday=weekday,
                    discipline=discipline,
                    lessonType=lesson_type,
                    timeBegin=time_begin,
                    timeEnd=time_end,
                    teacherId=teacher_id,
                    roomId=room_id,
                    subgroup=subgroup,
                )
                lessons.append(lesson)

        logger.info(
            "Получено расписание для группы %d на %s (занятий: %d)",
            group_id,
            target_date,
            len(lessons),
        )
        return lessons
