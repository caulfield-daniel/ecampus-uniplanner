import logging
from datetime import date
from typing import List, Optional, Callable, Awaitable

from app.services.auth import Authenticator
from app.core import HttpClient
from app.services.parser import (
    InstituteParser,
    SpecialtyParser,
    AcademicGroupParser,
    ScheduleParser,
)


from app.schemas import (
    InstituteCreate,
    SpecialtyCreate,
    LessonCreate,
    AcademicGroupCreate,
)

logger = logging.getLogger(__name__)


class ParserOrchestrator:
    """
    Координатор парсинга. Управляет последовательностью:
    1. Получение списка институтов.
    2. Получение специальностей для каждого института.
    3. Получение групп для каждой специальности.
    4. Получение расписания для каждой группы за указанный период.
    """

    def __init__(
        self,
        http_client: HttpClient,
        authenticator: Authenticator,
        institute_repo: Optional[
            Callable[[List[InstituteCreate]], Awaitable[None]]
        ] = None,
        specialty_repo: Optional[
            Callable[[List[SpecialtyCreate], int], Awaitable[None]]
        ] = None,
        group_repo: Optional[
            Callable[[List[AcademicGroupCreate], int], Awaitable[None]]
        ] = None,
        lesson_repo: Optional[Callable[[List[LessonCreate]], Awaitable[None]]] = None,
    ):
        """
        Инициализация оркестратора.

        Args:
            http_client: HTTP-клиент для запросов.
            authenticator: аутентификатор для проверки/обновления сессии.
            institute_repo: асинхронная функция сохранения институтов.
            specialty_repo: асинхронная функция сохранения специальностей (принимает список и ID института).
            group_repo: асинхронная функция сохранения групп (принимает список и ID специальности).
            lesson_repo: асинхронная функция сохранения занятий.
        """
        self.http = http_client
        self.auth = authenticator
        self.institute_repo = institute_repo
        self.specialty_repo = specialty_repo
        self.group_repo = group_repo
        self.lesson_repo = lesson_repo

        # Парсеры создаются один раз и переиспользуются
        self._institute_parser = InstituteParser(self.http)
        self._specialty_parser = SpecialtyParser(self.http)
        self._group_parser = AcademicGroupParser(self.http)
        self._schedule_parser = ScheduleParser(self.http)

    async def ensure_session(self) -> bool:
        """Проверяет и при необходимости обновляет сессию."""
        return await self.auth.ensure_session(self.http)

    async def run_full_parse(self, start_date: date, end_date: date) -> None:
        """
        Полный цикл парсинга: институты → специальности → группы → расписание за период.
        """
        if not await self.ensure_session():
            raise RuntimeError("Не удалось установить сессию. Парсинг прерван.")

        logger.info("Начинаем полный парсинг с %s по %s", start_date, end_date)

        # 1. Институты
        institutes = await self._safe_parse(
            self._institute_parser.fetch_institutes, "институтов"
        )
        if self.institute_repo:
            await self.institute_repo(institutes)
        logger.info("Получено и сохранено %d институтов", len(institutes))

        # 2. Для каждого института – специальности
        all_specialties = []
        for inst in institutes:
            try:
                specialties = await self._specialty_parser.fetch_specialties(
                    inst.id,
                    inst.branchId,
                )
                if self.specialty_repo:
                    await self.specialty_repo(specialties, inst.id)
                all_specialties.extend(specialties)
                logger.debug(
                    "Для института %s получено %d специальностей",
                    inst.name,
                    len(specialties),
                )
            except Exception as e:
                logger.exception(
                    "Ошибка при получении специальностей для института %s: %s",
                    inst.name,
                    e,
                )

        # 3. Для каждой специальности – группы
        all_groups: List[AcademicGroupCreate] = []
        for spec in all_specialties:
            try:
                groups = await self._group_parser.fetch_groups(spec)
                if self.group_repo:
                    await self.group_repo(groups, 0) # 1 ДЛЯ ТЕСТИРОВАНИЯ
                all_groups.extend(groups)
                logger.debug(
                    "Для специальности %s получено %d групп",
                    spec.name,
                    len(groups),
                )
            except Exception as e:
                logger.exception(
                    "Ошибка при получении групп для специальности %s: %s",
                    spec.name,
                    e,
                )

        # 4. Для каждой группы – расписание за период
        # Предполагаем, что нам нужно расписание на каждый день периода.
        # Но эндпоинт GetSchedule обычно возвращает данные на неделю, поэтому
        # нужно проходиться по понедельникам.
        mondays = self._mondays_between(start_date, end_date)
        for group in all_groups:
            for monday in mondays:
                try:
                    lessons = await self._schedule_parser.fetch_schedule(
                        group.id, monday
                    )
                    if self.lesson_repo:
                        await self.lesson_repo(lessons)
                    logger.debug(
                        "Расписание для группы %s на %s получено",
                        group.name,
                        monday,
                    )
                except Exception as e:
                    logger.exception(
                        "Ошибка при получении расписания для группы %s на %s: %s",
                        group.name,
                        monday,
                        e,
                    )
                    # Продолжаем со следующей датой/группой

        logger.info("Полный парсинг завершён")

    async def run_incremental_parse(self, groupIds: List[int], date_from: date) -> None:
        """
        Инкрементальный парсинг – только для указанных групп, начиная с date_from.
        """
        if not await self.ensure_session():
            raise RuntimeError("Не удалось установить сессию. Парсинг прерван.")

        mondays = self._mondays_between(date_from, date.today())  # или до сегодня
        for groupId in groupIds:
            for monday in mondays:
                try:
                    lessons = await self._schedule_parser.fetch_schedule(
                        groupId, monday
                    )
                    if self.lesson_repo:
                        await self.lesson_repo(lessons)
                    logger.info(
                        "Расписание для группы %d на %s обновлено", groupId, monday
                    )
                except Exception as e:
                    logger.exception(
                        "Ошибка при получении расписания для группы %d на %s: %s",
                        groupId,
                        monday,
                        e,
                    )

    async def close(self):
        """Закрывает HTTP-клиент."""
        await self.http.close()

    async def _safe_parse(self, parser_method: Callable, entity_name: str):
        """Безопасно вызывает метод парсера, возвращает пустой список при ошибке."""
        try:
            return await parser_method()
        except Exception as e:
            logger.exception("Ошибка при парсинге %s: %s", entity_name, e)
            return []

    @staticmethod
    def _mondays_between(start: date, end: date) -> List[date]:
        """Возвращает список всех понедельников между start и end включительно."""
        mondays = []
        current = start
        while current <= end:
            if current.weekday() == 0:  # понедельник
                mondays.append(current)
            current = date.fromordinal(current.toordinal() + 1)
        return mondays
