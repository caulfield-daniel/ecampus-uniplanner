import asyncio
import logging
from datetime import date
from typing import List
import sys
from pathlib import Path

# Добавляем корень проекта в sys.path, чтобы можно было импортировать модули
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from app.core import HttpClient
from app.services import auth as auth_service, ParserOrchestrator
from app.core import settings
from app.schemas.academic_group import AcademicGroupCreate
from app.schemas.institute import InstituteCreate
from app.schemas.lesson import LessonCreate
from app.schemas.specialty import SpecialtyCreate
from app.schemas.room import RoomCreate
from app.schemas.teacher import TeacherCreate
from app.tests.mock_repos import (
    InMemoryRoomRepo,
    InMemoryAcademicGroupRepo,
    InMemoryInstituteRepo,
    InMemoryLessonRepo,
    InMemorySpecialtyRepo,
    InMemoryTeacherRepo,
)

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


async def main() -> None:

    mock_institute_repo = InMemoryInstituteRepo()
    mock_specialty_repo = InMemorySpecialtyRepo()
    mock_group_repo = InMemoryAcademicGroupRepo()
    mock_lesson_repo = InMemoryLessonRepo()
    mock_teacher_repo = InMemoryTeacherRepo()
    mock_room_repo = InMemoryRoomRepo()

    # Инициализация клиента и аутентификатора
    client = HttpClient(base_url=settings.university_base_url)
    auth = auth_service.CookieFileAuthenticator(cookies_file="cookies.json")

    # Проверяем сессию
    if not await auth.ensure_session(client):
        logger.error("Не удалось восстановить сессию. Проверьте файл cookies.json")
        await client.close()
        return

    # Создаём оркестратор с мок-репозиториями
    orchestrator = ParserOrchestrator(
        http_client=client,
        authenticator=auth,
        institute_repo=mock_institute_repo,
        specialty_repo=mock_specialty_repo,
        group_repo=mock_group_repo,
        lesson_repo=mock_lesson_repo,
        teacher_repo=mock_teacher_repo,
        room_repo=mock_room_repo,
    )

    # Запускаем полный парсинг за короткий период (одна неделя)
    start_date = date(2026, 3, 1)
    end_date = date(2026, 3, 2)

    try:
        logger.info("Запуск полного парсинга с %s по %s", start_date, end_date)
        await orchestrator.run_full_parse(
            start_date=start_date,
            end_date=end_date,
        )
    except Exception as e:
        logger.exception("Ошибка при выполнении парсинга")
    finally:
        await orchestrator.close()
        print(mock_lesson_repo)


if __name__ == "__main__":
    asyncio.run(main())
