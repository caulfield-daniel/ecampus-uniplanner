from fastapi import FastAPI
from .core.config import settings
from .core.cors import setup_cors


# Инициализация приложения
app = FastAPI(
    title=settings.app_title,
    version=settings.app_version,
    description=settings.app_description,
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
    openapi_url="/openapi.json",
)

# Настройка CORS
setup_cors(app)


@app.get("/health")
async def health_check():
    """Эндпоинт для проверки работоспособности сервиса"""
    return {
        "status": "ok",
        "service": "parser",
        "version": settings.app_version,
    }


@app.get("/")
async def root():
    """Корневой эндпоинт"""
    return {
        "message": "Ecampus UniPlanner Parser API",
        "docs": "/docs",
    }
