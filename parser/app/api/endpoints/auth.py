import base64

from fastapi import APIRouter, HTTPException

from app.schemas.auth import CaptchaChallengeResponse, LoginAttemptRequest, LoginAttemptResponse
from app.services.auth.captcha_login import CaptchaLoginFlow

router = APIRouter(prefix="/auth", tags=["auth"])

_flow = CaptchaLoginFlow()


@router.post("/captcha", response_model=CaptchaChallengeResponse)
async def start_captcha_challenge():
    """
    Начинает новую попытку личного логина пользователя приложения в ecampus.ncfu.ru
    и возвращает картинку капчи для решения на клиенте.

    Не путать с /parser/* (общий сервисный аккаунт для скрейпинга публичного
    расписания групп) — это отдельный флоу для персональных сессий пользователей.
    """
    attempt_id, image_bytes = await _flow.start_attempt()
    return CaptchaChallengeResponse(
        attempt_id=attempt_id,
        captcha_image_base64=base64.b64encode(image_bytes).decode("ascii"),
    )


@router.post("/login", response_model=LoginAttemptResponse)
async def complete_login(request: LoginAttemptRequest):
    """
    Завершает попытку личного логина: отправляет логин/пароль/ответ капчи.
    """
    try:
        return await _flow.complete_attempt(
            attempt_id=request.attempt_id,
            login=request.login,
            password=request.password,
            captcha_answer=request.captcha_answer,
        )
    except NotImplementedError as exc:
        raise HTTPException(status_code=501, detail=str(exc)) from exc
