from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class TeacherBase(BaseModel):
    """Базовая схема преподавателя"""

    id: int = Field(..., description="Уникальный идентификатор")
    name: str = Field(
        default="неизвестно",
        min_length=1,
        max_length=100,
        description="ФИО преподавателя",
    )


class TeacherCreate(BaseModel):
    """Схема для создания преподавателя"""

    id: int = Field(..., gt=0)
    name: str = Field(default="неизвестно", min_length=1, max_length=100)


class TeacherUpdate(BaseModel):
    """Схема для обновления преподавателя"""

    name: Optional[str] = Field(None, min_length=1, max_length=100)


class Teacher(TeacherBase):
    """Полная схема преподавателя (для ответов API)"""

    model_config = ConfigDict(from_attributes=True)
