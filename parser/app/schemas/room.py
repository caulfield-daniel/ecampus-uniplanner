from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class RoomBase(BaseModel):
    """Базовая схема аудитории"""

    id: int = Field(..., description="Уникальный идентификатор")
    name: str = Field(
        ..., min_length=1, max_length=50, description="Номер/название аудитории"
    )


class RoomCreate(BaseModel):
    """Схема для создания аудитории"""

    id: int = Field(..., gt=0)
    name: str = Field(..., min_length=1, max_length=50)


class RoomUpdate(BaseModel):
    """Схема для обновления аудитории"""

    name: Optional[str] = Field(None, min_length=1, max_length=50)


class Room(RoomBase):
    """Полная схема аудитории (для ответов API)"""

    model_config = ConfigDict(from_attributes=True)
