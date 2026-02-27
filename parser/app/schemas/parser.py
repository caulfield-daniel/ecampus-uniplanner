from pydantic import BaseModel, ConfigDict, Field, field_validator
from datetime import datetime, date
from typing import List, Optional
from enum import Enum


class ParserStatusEnum(str, Enum):
    """Статусы работы парсера"""

    running = "running"
    idle = "idle"
    error = "error"


class ParserStatusResponse(BaseModel):
    """
    Ответ со статусом парсера
    """

    status: ParserStatusEnum = Field(..., description="Текущий статус парсера")
    lastUpdate: Optional[datetime] = Field(
        None, description="Время последнего обновления"
    )
    groupsCount: Optional[int] = Field(
        None, ge=0, description="Количество обработанных групп"
    )
    lessonsCount: Optional[int] = Field(
        None, ge=0, description="Количество обработанных занятий"
    )

    model_config = ConfigDict(from_attributes=True)


class ParserSyncRequest(BaseModel):
    """
    Запрос на синхронизацию расписания
    """

    startDate: date = Field(..., description="Дата начала периода синхронизации")
    endDate: date = Field(..., description="Дата окончания периода синхронизации")
    groups: List[str] = Field(
        default_factory=list, description="Список групп для синхронизации"
    )

    model_config = ConfigDict(from_attributes=True)

    @field_validator("endDate")
    @classmethod
    def validate_date_range(cls, v, info):
        """Проверка, что дата окончания позже даты начала"""
        if v and info.data.get("startDate") and v < info.data["startDate"]:
            raise ValueError("Дата окончания должна быть позже даты начала")
        return v
