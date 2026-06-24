from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date
from app.schemas.parser import ParserStatusResponse, ParserSyncRequest, ParserStatusEnum
from app.schemas.lesson import Lesson as LessonSchema
from app.db.repositories.parser import ParserStatusRepository
from app.db.repositories.academic_group import AcademicGroupRepository
from app.db.repositories.lesson import LessonRepository
from app.core.dependencies import get_db_session
from app.services.parser.parser_runner import ParserRunner
from typing import List

router = APIRouter(prefix="/parser", tags=["parser"])


@router.post("/run-full", response_model=dict)
async def run_full_parse(
    background_tasks: BackgroundTasks,
    start_date: date,
    end_date: date,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Запускает полный парсинг (институты → специальности → группы → расписание)
    за указанный период. Выполняется в фоне.
    """
    status_repo = ParserStatusRepository(db)
    status = await status_repo.get_status()
    if status and status.status == ParserStatusEnum.running:
        raise HTTPException(409, "Парсинг уже выполняется")

    # Запускаем фоновую задачу
    background_tasks.add_task(ParserRunner.run_full_parse, start_date, end_date)
    return {"message": "Полный парсинг запущен в фоне"}


@router.post("/run-incremental", response_model=dict)
async def run_incremental_parse(
    background_tasks: BackgroundTasks,
    request: ParserSyncRequest,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Инкрементальный парсинг расписания для указанных групп и периода.
    Если список групп пуст, парсится для всех групп.
    """
    status_repo = ParserStatusRepository(db)
    status = await status_repo.get_status()
    if status and status.status == ParserStatusEnum.running:
        raise HTTPException(409, "Парсинг уже выполняется")

    # Получаем ID групп, если переданы названия, нужно преобразовать их в ID
    group_ids: List[int] = []
    if request.groups:

        group_repo = AcademicGroupRepository(db)
        for group_name in request.groups:
            group = await group_repo.get_by_name(group_name)
            if group:
                group_ids.append(group.id)
    else:
        # Если список пуст, берём все группы из БД
        group_repo = AcademicGroupRepository(db)
        all_groups = await group_repo.get_all()
        group_ids = [g.id for g in all_groups]

    # Запускаем фоновую задачу
    background_tasks.add_task(
        ParserRunner.run_incremental_parse,
        group_ids,
        request.startDate,
        request.endDate,
    )
    return {"message": "Инкрементальный парсинг запущен в фоне"}


@router.get("/groups", response_model=List[str])
async def list_groups(db: AsyncSession = Depends(get_db_session)):
    """
    Возвращает названия всех групп, накопленных parser'ом — для backend'а,
    который тянет (pull) эти данные через ParserClient в свой кэш расписания.
    """
    group_repo = AcademicGroupRepository(db)
    return await group_repo.get_all_names()


@router.get("/lessons", response_model=List[LessonSchema])
async def list_lessons(
    group: str,
    date_from: date,
    date_to: date,
    db: AsyncSession = Depends(get_db_session),
):
    """
    Возвращает занятия группы за период — для backend'а (см. list_groups).
    """
    lesson_repo = LessonRepository(db)
    return await lesson_repo.get_by_group_name_and_date_range(group, date_from, date_to)


@router.get("/status", response_model=ParserStatusResponse)
async def get_parser_status(db: AsyncSession = Depends(get_db_session)):
    """
    Возвращает текущий статус парсера.
    """
    repo = ParserStatusRepository(db)
    db_status = await repo.get_status()
    if not db_status:
        # Если записи ещё нет, возвращаем idle
        return ParserStatusResponse(status=ParserStatusEnum.idle, lastUpdate=None, groupsCount=0, lessonsCount=0)
    # Преобразуем ORM в Pydantic-схему
    return ParserStatusResponse(
        status=db_status.status,
        lastUpdate=db_status.last_update,
        groupsCount=db_status.groups_count,
        lessonsCount=db_status.lessons_count,
    )
