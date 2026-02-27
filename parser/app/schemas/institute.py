from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class InstituteBase(BaseModel):
    """Базовая схема института"""

    id: int = Field(..., description="Уникальный идентификатор института")
    shortName: str = Field(
        ..., min_length=1, max_length=10, description="Краткое название"
    )
    name: str = Field(..., min_length=1, max_length=100, description="Полное название")
    branchId: Optional[int] = Field(default=1, description="ID филиала")


class InstituteCreate(InstituteBase):
    """Схема для создания института"""

    pass


class InstituteUpdate(BaseModel):
    """Схема для обновления института"""

    shortName: Optional[str] = Field(None, min_length=1, max_length=10)
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    branchId: Optional[int] = None


class Institute(InstituteBase):
    """Полная схема института (для ответов API)"""

    model_config = ConfigDict(from_attributes=True)
