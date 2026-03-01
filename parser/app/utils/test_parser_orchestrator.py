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

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


# Мок-функции для репозиториев (просто логируют полученные данные)
async def mock_institute_repo(institutes: List[InstituteCreate]) -> None:
    logger.info(f"mock_institute_repo получил {len(institutes)} институтов")
    for inst in institutes[:5]:
        logger.info(f"  Институт: {inst.id} - {inst.name} ({inst.shortName})")


async def mock_specialty_repo(
    specialties: List[SpecialtyCreate], institute_id: int
) -> None:
    logger.info(
        f"mock_specialty_repo для института {institute_id}: получил {len(specialties)} специальностей"
    )
    for spec in specialties[:5]:
        logger.info(f"  Специальность: {spec.instituteId} - {spec.name}")


async def mock_group_repo(groups: List[AcademicGroupCreate], specialty_id: int) -> None:
    logger.info(
        f"mock_group_repo для специальности {specialty_id}: получил {len(groups)} групп"
    )
    for group in groups[:5]:
        logger.info(f"  Группа: {group.id} - {group.name}")


async def mock_lesson_repo(lessons: List[LessonCreate]) -> None:
    logger.info(f"mock_lesson_repo получил {len(lessons)} занятий")
    for lesson in lessons[:5]:
        logger.info(f"  Занятие: {lesson.discipline} {lesson.date}")


async def main() -> None:
    # Инициализация клиента и аутентификатора
    client = HttpClient(base_url=settings.university_base_url)
    auth = auth_service.CookieFileAuthenticator(cookies_file="../cookies.json")

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
    )

    # Запускаем полный парсинг за короткий период (одна неделя)
    start_date = date(2026, 2, 23)
    end_date = date(2026, 3, 1)

    try:
        logger.info("Запуск полного парсинга с %s по %s", start_date, end_date)
        await orchestrator.run_full_parse(start_date=start_date, end_date=end_date)
    except Exception as e:
        logger.exception("Ошибка при выполнении парсинга")
    finally:
        await orchestrator.close()


if __name__ == "__main__":
    asyncio.run(main())
