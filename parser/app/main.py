import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import auth, parser
from app.core.config import settings

from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.db.session import AsyncSessionLocal
from app.db.repositories.parser import ParserStatusRepository
from app.schemas.parser import ParserStatusEnum


# Настройка логирования
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # При старте: сбрасываем зависший статус
    async with AsyncSessionLocal() as session:
        repo = ParserStatusRepository(session)
        status = await repo.get_status()
        if status and status.status == ParserStatusEnum.running:
            logger.warning(
                "Устанавливаем статус парсинга в 'idle'"
            )
            status.status = ParserStatusEnum.idle
            status.last_error = "Парсинг был прерван во время предыдущего запуска"
            await session.commit()
    yield
    # При завершении ничего не делаем


app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description=settings.app_description,
    lifespan=lifespan,  # подключаем lifespan
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(parser.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Корневой эндпоинт для проверки работоспособности."""
    return {
        "service": "Ecampus UniPlanner Parser",
        "version": settings.app_version,
        "status": "running",
    }


@app.get("/health")
async def health_check():
    """Проверка здоровья сервиса."""
    return {"status": "healthy"}
