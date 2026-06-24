import logging

from app.core import HttpClient

from .interface import Authenticator

logger = logging.getLogger(__name__)


class NoAuthAuthenticator(Authenticator):
    """
    Расписание группы (`/schedule/GetSchedule`) на сайте вуза отдаётся без
    авторизации — подтверждено эмпирически (см. docs/02-architecture/microservices.md).
    Сервисный аккаунт с cookie-сессией (`CookieFileAuthenticator`) нужен только для
    будущих фич, требующих личного входа (оценки/статистика конкретного студента,
    см. UC-08/UC-09 в docs/01-requirements/use-case-specifications.md) — для обычного
    инкрементального парсинга расписания он избыточен и добавляет точку отказа
    (протухающая cookie-сессия требует ручного обновления вручную через браузер).
    """

    async def ensure_session(self, client: HttpClient) -> bool:
        return True
