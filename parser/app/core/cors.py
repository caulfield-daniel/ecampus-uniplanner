from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings


def setup_cors(app: FastAPI) -> None:
    """
    Настраивает CORS middleware для разрешения запросов с фронтенда.

    Важно: если allow_credentials=True, нельзя использовать allow_origins=["*"]
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,  # явный список доменов
        allow_credentials=True,  # разрешает cookies и auth-заголовки
        allow_methods=["GET", "POST", "OPTIONS"],  # только необходимые методы
        allow_headers=["Content-Type", "Authorization"],  # или ["*"] для всех
        max_age=600,  # кэширование preflight-запросов (10 минут)
    )
