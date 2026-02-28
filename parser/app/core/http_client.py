"""
Модуль для управления HTTP-клиентом с поддержкой сессий и повторных попыток.
"""

import httpx
import logging
from typing import Optional, Dict
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)

logger = logging.getLogger(__name__)


class HttpClient:
    """
    Асинхронный HTTP-клиент с единой сессией, обработкой ошибок и повторными попытками.

    Attributes:
        base_url (str): Базовый URL для всех запросов.
        client (httpx.AsyncClient): Экземпляр клиента.
    """

    def __init__(self, base_url: str, cookies: Optional[Dict[str, str]] = None):
        """
        Инициализация клиента.

        Args:
            base_url: Базовый URL (например, https://ecampus.ncfu.ru).
            cookies: Начальные куки (например, после логина).
        """
        self.base_url = base_url
        self.client = httpx.AsyncClient(
            base_url=base_url,
            cookies=cookies,
            timeout=httpx.Timeout(15.0),
            follow_redirects=True,
        )
        logger.debug(f"HTTP клиент инициализирован для {base_url}")

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(
            (httpx.TimeoutException, httpx.NetworkError, httpx.HTTPStatusError)
        ),
    )
    async def get(self, url: str, **kwargs) -> httpx.Response:
        """
        Выполняет GET-запрос с повторными попытками при ошибках сети/таймаутах.

        Args:
            url: Относительный или абсолютный URL.
            **kwargs: Дополнительные параметры для client.get.

        Returns:
            httpx.Response: Ответ сервера.

        Raises:
            httpx.HTTPStatusError: Если статус ответа 4xx/5xx.
        """
        logger.debug(f"GET {url}")
        response = await self.client.get(url, **kwargs)
        response.raise_for_status()
        return response

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type(
            (httpx.TimeoutException, httpx.NetworkError, httpx.HTTPStatusError)
        ),
    )
    async def post(self, url: str, **kwargs) -> httpx.Response:
        """
        Выполняет POST-запрос с повторными попытками при ошибках сети/таймаутах.

        Args:
            url: Относительный или абсолютный URL.
            **kwargs: Дополнительные параметры для client.post (data, json и т.д.).

        Returns:
            httpx.Response: Ответ сервера.
        """
        logger.debug(f"POST {url}")
        response = await self.client.post(url, **kwargs)
        response.raise_for_status()
        return response

    async def close(self) -> None:
        """Закрывает клиент и освобождает ресурсы."""
        await self.client.aclose()
        logger.debug("HTTP клиент закрыт")
