"""
Базовый класс для всех парсеров сайта.
"""

from app.core import HttpClient


class BaseParser:
    """
    Абстрактный базовый парсер, предоставляющий HTTP-клиент.

    Attributes:
        http (HttpClient): Экземпляр клиента для выполнения запросов.
    """

    def __init__(self, http_client: HttpClient):
        """
        Инициализация парсера.

        Args:
            http_client: HTTP-клиент с активной сессией.
        """
        self.http = http_client
