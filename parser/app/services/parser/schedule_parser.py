"""
Парсер для получения расписания занятий через API.
"""

import logging
from typing import List, Dict, Any, Optional
from datetime import date
from .base_parser import BaseParser
from datetime import datetime

from app.schemas import LessonCreate

logger = logging.getLogger(__name__)


class ScheduleParser(BaseParser):
    """
    Парсер расписания, обращается к эндпоинту /schedule/GetSchedule.
    Возвращает список объектов LessonCreate.
    """

    async def fetch_schedule(
        self,
        group_id: int,
        target_date: date,
        target_type: int = 2,  # 2 - для группы
    ) -> List[LessonCreate]:
        """
        Получает расписание для указанной группы на неделю, начинающуюся с target_date.

        Args:
            group_id: ID группы.
            target_date: Дата понедельника недели.
            target_type: Тип расписания (по умолчанию 2 - группа).

        Returns:
            Список объектов LessonCreate.
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
        data = response.json()

        lessons: List[LessonCreate] = []

        for day in data:
            # День может быть представлен строкой с датой в формате ISO (например, "2026-02-23T00:00:00")
            day_date = datetime.fromisoformat(day["Date"]).date()
            for les in day["Lessons"]:
                teacher_id = None
                if les.get("Teacher"):
                    teacher_id = les.get("Teacher").get("Id")

                room_id = None
                if les.get("Aud"):
                    room_id = les.get("Aud").get("Id")

                subgroup = ""
                groups = les.get("Groups") or []
                if groups:
                    subgroup = groups[0].get("Subgroup", "")

                # Время в формате ISO, например "2026-02-23T11:20:00"
                time_begin = datetime.fromisoformat(les.get("TimeBegin")).time()
                time_end = datetime.fromisoformat(les.get("TimeEnd")).time()

                lesson = LessonCreate(
                    lesson_id=les["Id"],
                    group_id=group_id,
                    date=day_date,
                    weekday=day.get("WeekDay"),
                    discipline=les.get("Discipline").strip(),
                    lesson_type=les.get("LessonType").strip(),
                    time_begin=time_begin,
                    time_end=time_end,
                    teacher_id=teacher_id,
                    room_id=room_id,
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
