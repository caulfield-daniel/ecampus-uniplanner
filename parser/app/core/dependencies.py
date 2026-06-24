from app.core.http_client import HttpClient
from app.core.config import settings
from app.services.auth.cookie_file_auth import CookieFileAuthenticator
from app.db.session import AsyncSessionLocal


async def get_http_client():
    """
    Зависимость, создающая и возвращающая HttpClient.
    После завершения запроса клиент автоматически закрывается.
    """
    client = HttpClient(base_url=settings.university_base_url)
    try:
        yield client
    finally:
        await client.close()


def get_authenticator() -> CookieFileAuthenticator:
    """
    Возвращает экземпляр аутентификатора.
    Поскольку аутентификатор не хранит состояние, можно использовать как синглтон.
    """
    return CookieFileAuthenticator(cookies_file=settings.cookies_file_path)


async def get_db_session():
    """
    Зависимость, создающая и возвращающая сессию к базе данных.
    После завершения запроса сессия автоматически закрывается.
    """
    async with AsyncSessionLocal() as session:
        yield session
