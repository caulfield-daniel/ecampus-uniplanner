from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class SpecialtyBase(BaseModel):
    """Базовая схема специальности"""

    # Автоматически генерируется при сохранении в БД
    id: Optional[int] = Field(None, description="Уникальный идентификатор")
    name: str = Field(
        ..., min_length=1, max_length=100, description="Название специальности"
    )
    instituteId: int = Field(..., description="ID института")


class SpecialtyCreate(BaseModel):
    """Схема для создания специальности"""

    name: str = Field(..., min_length=1, max_length=100)
    instituteId: int = Field(..., gt=0)
    branchId: Optional[int] = Field(default=1)


class SpecialtyUpdate(BaseModel):
    """Схема для обновления специальности"""

    name: Optional[str] = Field(None, min_length=1, max_length=100)
    instituteId: Optional[int] = Field(None, gt=0)


class Specialty(SpecialtyBase):
    """Полная схема специальности (для ответов API)"""

    model_config = ConfigDict(from_attributes=True)


class SpecialtyInfo(SpecialtyCreate):
    """
    Схема для информации о специальности
    (Не ORM-модель, используется в парсерах)
    """

    id: Optional[int] = Field(None)
