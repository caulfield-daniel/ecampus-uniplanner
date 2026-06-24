from pydantic import BaseModel, ConfigDict, Field
from typing import Dict, Optional
from enum import Enum


class LoginFailureReason(str, Enum):
    """Причины неуспешного завершения попытки личного логина."""

    invalid_captcha = "invalid_captcha"
    invalid_credentials = "invalid_credentials"
    attempt_expired = "attempt_expired"
    unknown = "unknown"


class CaptchaChallengeResponse(BaseModel):
    """
    Ответ на запуск попытки личного логина: картинка капчи и идентификатор
    попытки, который нужно передать на шаге завершения логина.
    """

    attempt_id: str = Field(..., description="Идентификатор попытки логина")
    captcha_image_base64: str = Field(
        ..., description="Картинка капчи (PNG/JPEG), закодированная в base64"
    )

    model_config = ConfigDict(from_attributes=True)


class LoginAttemptRequest(BaseModel):
    """
    Запрос на завершение личного логина пользователя в ecampus.ncfu.ru.

    Логин/пароль — учётные данные ИС университета конкретного пользователя
    приложения, вводятся им добровольно для привязки СВОЕГО аккаунта
    (легитимный кейс "Connect my account"). Не персистятся на стороне parser.
    """

    attempt_id: str = Field(..., description="Идентификатор попытки логина")
    login: str = Field(..., description="Логин пользователя в ИС университета")
    password: str = Field(..., description="Пароль пользователя в ИС университета")
    captcha_answer: str = Field(..., description="Ответ на капчу (математический пример)")

    model_config = ConfigDict(from_attributes=True)


class LoginAttemptResponse(BaseModel):
    """Результат завершения попытки личного логина."""

    success: bool = Field(..., description="Успешно ли завершён логин")
    cookies: Optional[Dict[str, str]] = Field(
        None, description="Cookies аутентифицированной сессии (только при success=True)"
    )
    reason: Optional[LoginFailureReason] = Field(
        None, description="Причина неудачи (только при success=False)"
    )

    model_config = ConfigDict(from_attributes=True)
