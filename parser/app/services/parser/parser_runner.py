from datetime import date
from typing import Optional
from app.db.session import AsyncSessionLocal
from app.db.repositories.institute import InstituteRepository
from app.db.repositories.specialty import SpecialtyRepository
from app.db.repositories.academic_group import AcademicGroupRepository
from app.db.repositories.lesson import LessonRepository
from app.db.repositories.teacher import TeacherRepository
from app.db.repositories.room import RoomRepository
from app.db.repositories.parser import ParserStatusRepository
from app.services.parser.orchestrator import ParserOrchestrator
from app.core.http_client import HttpClient
from app.services.auth.cookie_file_auth import CookieFileAuthenticator
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class ParserRunner:
    """
    Исполнитель фоновых задач парсинга. Управляет сессией БД,
    создаёт репозитории и оркестратор, обновляет статус.
    """

    @staticmethod
    async def run_full_parse(start_date: date, end_date: date) -> None:
        """Полный парсинг (институты, специальности, группы, расписание)."""
        # Устанавливаем статус "выполняется"
        async with AsyncSessionLocal() as session:
            status_repo = ParserStatusRepository(session)
            await status_repo.start()
            await session.commit()  # важно закоммитить изменение статуса

        try:
            # Создаём HTTP-клиент и аутентификатор
            client = HttpClient(base_url=settings.university_base_url)
            auth = CookieFileAuthenticator(cookies_file=settings.cookies_file_path)

            # Открываем сессию для репозиториев парсинга
            async with AsyncSessionLocal() as session:
                # Инициализируем все репозитории
                institute_repo = InstituteRepository(session)
                specialty_repo = SpecialtyRepository(session)
                group_repo = AcademicGroupRepository(session)
                lesson_repo = LessonRepository(session)
                teacher_repo = TeacherRepository(session)
                room_repo = RoomRepository(session)

                # Создаём оркестратор с репозиториями
                orchestrator = ParserOrchestrator(
                    db_session=session,
                    http_client=client,
                    authenticator=auth,
                    institute_repo=institute_repo,
                    specialty_repo=specialty_repo,
                    group_repo=group_repo,
                    lesson_repo=lesson_repo,
                    teacher_repo=teacher_repo,
                    room_repo=room_repo,
                )

                # Запускаем основной процесс парсинга
                await orchestrator.run_full_parse(start_date, end_date)

                # После успешного завершения коммитим все изменения
                await session.commit()

            # Обновляем статус на "успешно завершён"
            async with AsyncSessionLocal() as session:
                status_repo = ParserStatusRepository(session)
                await status_repo.finish(success=True)
                await session.commit()

        except Exception as e:
            logger.exception("Ошибка при полном парсинге")
            # Фиксируем ошибку в статусе
            async with AsyncSessionLocal() as session:
                status_repo = ParserStatusRepository(session)
                await status_repo.fail(str(e))
                await session.commit()
            raise  # пробрасываем исключение дальше

        finally:
            # Обязательно закрываем HTTP-клиент
            await client.close()

    @staticmethod
    async def run_incremental_parse(
        group_ids: list[int], start_date: date, end_date: date = date.today()
    ) -> None:
        """
        Инкрементальный парсинг расписания для указанных групп за период.
        """
        # Устанавливаем статус "выполняется"
        async with AsyncSessionLocal() as session:
            status_repo = ParserStatusRepository(session)
            await status_repo.start()
            await session.commit()

        try:
            # Создаём HTTP-клиент и аутентификатор
            client = HttpClient(base_url=settings.university_base_url)
            auth = CookieFileAuthenticator(cookies_file=settings.cookies_file_path)

            # Открываем сессию для репозиториев
            async with AsyncSessionLocal() as session:
                # Инициализируем репозитории
                institute_repo = InstituteRepository(session)
                specialty_repo = SpecialtyRepository(session)
                group_repo = AcademicGroupRepository(session)
                lesson_repo = LessonRepository(session)
                teacher_repo = TeacherRepository(session)
                room_repo = RoomRepository(session)

                # Создаём оркестратор с репозиториями
                orchestrator = ParserOrchestrator(
                    db_session=session,
                    http_client=client,
                    authenticator=auth,
                    institute_repo=institute_repo,
                    specialty_repo=specialty_repo,
                    group_repo=group_repo,
                    lesson_repo=lesson_repo,
                    teacher_repo=teacher_repo,
                    room_repo=room_repo,
                )

                # Запускаем инкрементальный парсинг
                await orchestrator.run_incremental_parse(
                    group_ids, start_date, end_date
                )

                # Коммитим изменения
                await session.commit()

            # Обновляем статус на успешное завершение
            async with AsyncSessionLocal() as session:
                status_repo = ParserStatusRepository(session)
                await status_repo.finish(success=True)
                await session.commit()

        except Exception as e:
            logger.exception("Ошибка при инкрементальном парсинге")
            # Фиксируем ошибку в статусе
            async with AsyncSessionLocal() as session:
                status_repo = ParserStatusRepository(session)
                await status_repo.fail(str(e))
                await session.commit()
            raise  # пробрасываем исключение для логирования выше

        finally:
            # Обязательно закрываем HTTP-клиент
            await client.close()
