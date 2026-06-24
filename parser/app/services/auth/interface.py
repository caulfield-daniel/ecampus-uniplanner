from abc import ABC, abstractmethod
from app.core import HttpClient


class Authenticator(ABC):
    """Абстрактный аутентификатор для портала ecampus."""

    @abstractmethod
    async def ensure_session(self, client: HttpClient) -> bool:
        """
        Проверяет, активна ли сессия, и при необходимости выполняет вход.
        Возвращает True, если сессия установлена и работает.
        """
        pass
