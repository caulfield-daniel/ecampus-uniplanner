from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional
from datetime import date as dateType, time


class LessonBase(BaseModel):
    """
    Базовая схема занятия
    Соответствует Lesson из OpenAPI спецификации
    """

    id: int = Field(
        ..., alias="lesson_id", description="Уникальный идентификатор занятия"
    )
    group: str = Field(..., min_length=1, description="Название группы")
    date: dateType = Field(..., description="Дата занятия")
    weekday: str = Field(..., min_length=1, description="День недели")
    discipline: str = Field(..., min_length=1, description="Название дисциплины")
    type: str = Field(..., alias="lesson_type", min_length=1, description="Тип занятия")
    timeStart: Optional[time] = Field(
        None, alias="time_begin", description="Время начала"
    )
    timeEnd: Optional[time] = Field(
        None, alias="time_end", description="Время окончания"
    )
    teacher: Optional[str] = Field(None, description="ФИО преподавателя")
    room: Optional[str] = Field(None, description="Аудитория")
    subgroup: Optional[str] = Field(None, description="Подгруппа")

    @field_validator("timeEnd")
    @classmethod
    def validate_time_range(cls, v, info):
        """Проверка, что время окончания позже времени начала"""
        if v and info.data.get("timeStart") and v <= info.data["timeStart"]:
            raise ValueError("Время окончания должно быть позже времени начала")
        return v


class LessonCreate(BaseModel):
    """Схема для создания занятия (для внутреннего использования)"""

    lesson_id: int = Field(..., gt=0)
    group_id: int = Field(..., gt=0)
    date: dateType
    weekday: str
    discipline: str
    lesson_type: str
    time_begin: Optional[time] = None
    time_end: Optional[time] = None
    teacher_id: Optional[int] = None
    room_id: Optional[int] = None
    subgroup: Optional[str] = None


class LessonUpdate(BaseModel):
    """Схема для обновления занятия"""

    discipline: Optional[str] = Field(None, min_length=1)
    lesson_type: Optional[str] = Field(None, min_length=1)
    time_begin: Optional[time] = None
    time_end: Optional[time] = None
    teacher_id: Optional[int] = None
    room_id: Optional[int] = None
    subgroup: Optional[str] = None


class Lesson(LessonBase):
    """Полная схема занятия (для ответов API)"""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class LessonPublic(BaseModel):
    """
    Публичная схема занятия для внешнего API
    Соответствует Lesson из OpenAPI и KMP-модели
    """

    id: int
    group: str
    date: dateType
    weekday: str
    discipline: str
    type: str
    timeStart: time
    timeEnd: time
    teacher: Optional[str] = None
    room: Optional[str] = None
    subgroup: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
