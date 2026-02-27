from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class AcademicGroupBase(BaseModel):
    """Базовая схема академической группы"""

    id: int = Field(..., description="Уникальный идентификатор группы")
    name: str = Field(..., min_length=1, max_length=50, description="Название группы")
    eduLevel: str = Field(
        ..., min_length=1, max_length=50, description="Уровень образования"
    )
    specialtyId: int = Field(..., description="ID специальности")


class AcademicGroupCreate(BaseModel):
    """Схема для создания академической группы"""

    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1, max_length=50)
    eduLevel: str = Field(..., min_length=1, max_length=50)
    specialtyId: int = Field(..., gt=0)


class AcademicGroupUpdate(BaseModel):
    """Схема для обновления академической группы"""

    name: Optional[str] = Field(None, min_length=1, max_length=50)
    eduLevel: Optional[str] = Field(None, min_length=1, max_length=50)
    specialtyId: Optional[int] = Field(None, gt=0)


class AcademicGroup(AcademicGroupBase):
    """Полная схема академической группы (для ответов API)"""

    model_config = ConfigDict(from_attributes=True)
