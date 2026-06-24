import json
import logging
from pathlib import Path
from typing import Optional

from app.core import HttpClient
from .interface import Authenticator

logger = logging.getLogger(__name__)


class CookieFileAuthenticator(Authenticator):
    """
    Аутентификатор, использующий заранее сохранённые куки из файла.
    Не выполняет автоматический вход; если куки не работают, логирует ошибку.
    """

    def __init__(self, cookies_file: str = "cookies.json"):
        self.cookies_file = Path(cookies_file)

    async def ensure_session(self, client: HttpClient) -> bool:
        # 1. Загружаем куки из файла
        cookies = self._load_cookies()
        if not cookies:
            logger.error("Файл кук %s не найден или пуст", self.cookies_file)
            return False

        # 2. Устанавливаем куки в клиент
        client.client.cookies.update(cookies)

        # 3. Проверяем, работает ли сессия
        if await self._check_session(client):
            logger.info("Сессия успешно восстановлена из файла кук")
            return True
        else:
            logger.error(
                "Куки из файла %s недействительны. "
                "Пожалуйста, обновите файл кук вручную.",
                self.cookies_file,
            )
            return False

    # def _load_cookies(self) -> Optional[dict]:
    #     if not self.cookies_file.exists():
    #         return None
    #     try:
    #         with open(self.cookies_file, "r", encoding="utf-8") as f:
    #             return json.load(f)
    #     except Exception as e:
    #         logger.exception("Ошибка загрузки кук из %s: %s", self.cookies_file, e)
    #         return None
    def _load_cookies(self) -> Optional[dict]:
        if not self.cookies_file.exists():
            return None
        try:
            with open(self.cookies_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            # Если данные — словарь, возвращаем как есть
            if isinstance(data, dict):
                return data
            # Если данные — список, пробуем преобразовать (формат [{"name": "...", "value": "..."}, ...])
            if isinstance(data, list):
                cookies_dict = {}
                for item in data:
                    if isinstance(item, dict) and "name" in item and "value" in item:
                        cookies_dict[item["name"]] = item["value"]
                    elif isinstance(item, (list, tuple)) and len(item) == 2:
                        # на случай [["name","value"], ...]
                        cookies_dict[item[0]] = item[1]
                return cookies_dict
            logger.error("Неподдерживаемый формат кук: %s", type(data))
            return None
        except Exception as e:
            logger.exception("Ошибка загрузки кук из %s: %s", self.cookies_file, e)
            return None

    async def _check_session(self, client: HttpClient) -> bool:
        """Проверяет доступ к защищённой странице."""
        try:
            resp = await client.get("/schedule")
            return resp.status_code == 200 and "выйти" in resp.text.lower()
        except Exception:
            return False
