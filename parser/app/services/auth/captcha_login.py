import logging
import uuid

import httpx
from bs4 import BeautifulSoup

from app.core.config import settings
from app.schemas.auth import LoginAttemptResponse, LoginFailureReason
from .attempt_store import InMemoryAttemptStore, attempt_store

logger = logging.getLogger(__name__)

LOGIN_PAGE_PATH = "account/login"
LOGIN_SUBMIT_PATH = "Account/Login"
CAPTCHA_PATH = "Captcha/Captcha"

CSRF_FIELD_NAME = "__RequestVerificationToken"
# Сайт различает причину отказа двумя разными сообщениями (проверено живым
# запросом с заведомо неверной капчей): если капча не совпала — отдельная
# фраза "Неверный код проверки"; если капча совпала, но логин/пароль неверны —
# общая фраза "Неверное имя пользователя или пароль или код проверки".
# Порядок проверки важен: сначала более специфичная фраза про капчу.
CAPTCHA_ERROR_TEXT = "неверный код проверки"
CREDENTIALS_ERROR_TEXT = "неверное имя пользователя или пароль или код проверки"
LOGIN_SUCCESS_MARKER = "выйти"  # тот же эвристика, что и в CookieFileAuthenticator._check_session


class CaptchaLoginFlow:
    """
    Личный логин пользователя приложения в ecampus.ncfu.ru с капчей.

    В отличие от CookieFileAuthenticator (один общий сервисный аккаунт для
    скрейпинга публичного расписания групп, куки которого экспортируются
    разработчиком вручную), этот флоу — для КАЖДОГО пользователя приложения,
    который добровольно вводит свои собственные учётные данные ИС университета,
    чтобы привязать свой аккаунт. Капча решается самим пользователем на клиенте
    (никакого автоматического распознавания/обхода капчи здесь нет).

    Состояние попытки логина (cookie-jar между запросом капчи и отправкой формы)
    хранится только in-memory в InMemoryAttemptStore с TTL — parser не персистит
    ничего о пользователях приложения в своей БД (см. docs/03-architecture/microservices.md).
    """

    def __init__(self, store: InMemoryAttemptStore = attempt_store):
        self._store = store

    async def start_attempt(self) -> tuple[str, bytes]:
        """
        Начинает новую попытку логина: получает cookie-jar сессии и CSRF-токен
        со страницы логина, а также картинку капчи, привязанную к этой сессии.

        Возвращает (attempt_id, captcha_image_bytes).
        """
        client = httpx.AsyncClient(
            base_url=settings.university_base_url,
            timeout=httpx.Timeout(15.0),
            follow_redirects=True,
        )
        try:
            login_page = await client.get(LOGIN_PAGE_PATH)
            csrf_token = self._extract_csrf_token(login_page.text)

            captcha_response = await client.get(CAPTCHA_PATH)
            captcha_response.raise_for_status()
        except Exception:
            await client.aclose()
            raise

        attempt_id = str(uuid.uuid4())
        self._store.put(attempt_id, client, csrf_token)
        logger.info("Начата попытка личного логина %s", attempt_id)
        return attempt_id, captcha_response.content

    async def complete_attempt(
        self, attempt_id: str, login: str, password: str, captcha_answer: str
    ) -> LoginAttemptResponse:
        """
        Завершает попытку логина: отправляет форму логина с учётными данными
        пользователя и ответом на капчу, используя cookie-jar этой попытки.

        Пароль пользователя НЕ логируется и НЕ сохраняется — используется
        только для построения тела этого одного POST-запроса.
        """
        attempt = self._store.pop(attempt_id)
        if attempt is None:
            return LoginAttemptResponse(success=False, reason=LoginFailureReason.attempt_expired)

        client = attempt.client
        try:
            response = await client.post(
                LOGIN_SUBMIT_PATH,
                data={
                    CSRF_FIELD_NAME: attempt.csrf_token,
                    "Login": login,
                    "Password": password,
                    "Code": captcha_answer,
                    "RememberMe": "true",
                },
            )
            body = response.text.lower()

            if CAPTCHA_ERROR_TEXT in body:
                logger.info("Попытка логина %s неуспешна: неверная капча", attempt_id)
                return LoginAttemptResponse(success=False, reason=LoginFailureReason.invalid_captcha)

            if CREDENTIALS_ERROR_TEXT in body:
                logger.info("Попытка логина %s неуспешна: неверный логин/пароль", attempt_id)
                return LoginAttemptResponse(success=False, reason=LoginFailureReason.invalid_credentials)

            if LOGIN_SUCCESS_MARKER not in body:
                # Ни признака успеха, ни известного текста ошибки — не сохраняем
                # потенциально невалидную сессию.
                logger.warning("Не удалось распознать результат логина для попытки %s", attempt_id)
                return LoginAttemptResponse(success=False, reason=LoginFailureReason.unknown)

            cookies = {name: value for name, value in client.cookies.items()}
            logger.info("Попытка логина %s успешна", attempt_id)
            return LoginAttemptResponse(success=True, cookies=cookies)
        finally:
            await client.aclose()

    @staticmethod
    def _extract_csrf_token(html: str) -> str:
        soup = BeautifulSoup(html, "html.parser")
        token_input = soup.find("input", {"name": CSRF_FIELD_NAME})
        if token_input is None or not token_input.get("value"):
            raise RuntimeError(f"Не найден {CSRF_FIELD_NAME} на странице логина ecampus")
        return token_input["value"]
