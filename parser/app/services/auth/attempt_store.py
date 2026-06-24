import logging
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Dict, Optional

import httpx

logger = logging.getLogger(__name__)


@dataclass
class LoginAttempt:
    """Состояние одной незавершённой попытки личного логина."""

    client: httpx.AsyncClient
    csrf_token: str
    created_at: datetime = field(default_factory=datetime.utcnow)


class InMemoryAttemptStore:
    """
    Хранилище незавершённых попыток личного логина пользователей в ecampus.

    Намеренно in-memory и не персистится в БД parser'а: parser не хранит
    ничего о пользователях приложения (см. docs/02-architecture/microservices.md),
    привязка user_id <-> сессия живёт в backend. Здесь хранится только
    cookie-jar самой попытки логина между шагом "запрос капчи" и шагом
    "завершение логина", с TTL.
    """

    def __init__(self, ttl_seconds: int = 300):
        self._ttl = timedelta(seconds=ttl_seconds)
        self._attempts: Dict[str, LoginAttempt] = {}

    def put(self, attempt_id: str, client: httpx.AsyncClient, csrf_token: str) -> None:
        self._evict_expired()
        self._attempts[attempt_id] = LoginAttempt(client=client, csrf_token=csrf_token)

    def pop(self, attempt_id: str) -> Optional[LoginAttempt]:
        self._evict_expired()
        return self._attempts.pop(attempt_id, None)

    def _evict_expired(self) -> None:
        now = datetime.utcnow()
        expired = [
            attempt_id
            for attempt_id, attempt in self._attempts.items()
            if now - attempt.created_at > self._ttl
        ]
        for attempt_id in expired:
            self._attempts.pop(attempt_id)
            # client.aclose() здесь не вызывается: метод синхронный, а aclose — async.
            # Для MVP это допустимо (httpx.AsyncClient будет собран GC), но при доведении
            # до продакшена стоит вынести эвикцию в periodic asyncio-таск с await aclose().
            logger.info("Попытка логина %s истекла по TTL", attempt_id)


attempt_store = InMemoryAttemptStore()
