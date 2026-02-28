from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    """
    Конфигурация приложения FastAPI Parser.
    Загружает значения из .env файла или переменных окружения.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,  # имена переменных не чувствительны к регистру
        extra="ignore",  # игнорировать неизвестные переменные
    )

    # === Сервер ===
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True

    # === CORS ===
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        """Преобразует строку CORS в список"""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    # === Парсер ===
    university_base_url: str = "https://ecampus.ncfu.ru/"
    university_schedule_url: str = university_base_url + "schedule/"
    request_timeout: int = 3
    retry_delay: int = 2

    # === OpenAPI документация ===
    app_title: str = "Ecampus UniPlanner Parser API"
    app_version: str = "1.0.0"
    app_description: str = "Микросервис для парсинга расписания университета"


# Глобальный экземпляр настроек
settings = Settings()
