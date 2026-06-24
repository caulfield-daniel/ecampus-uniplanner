from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import Optional
from datetime import date as dateT, time


class LessonBase(BaseModel):
    """
    Базовая схема занятия.
    Содержит поля, общие для ответов API и внутреннего использования.
    """

    id: Optional[int] = Field(None, description="Уникальный идентификатор (внутренний)")
    group: str = Field(..., min_length=1, description="Название группы")
    date: dateT = Field(..., description="Дата занятия")
    weekday: str = Field(..., min_length=1, description="День недели")
    discipline: str = Field(..., min_length=1, description="Название дисциплины")
    type: str = Field(..., min_length=1, description="Тип занятия")
    timeStart: Optional[time] = Field(None, description="Время начала")
    timeEnd: Optional[time] = Field(None, description="Время окончания")
    teacher: Optional[str] = Field(None, description="ФИО преподавателя")
    room: Optional[str] = Field(None, description="Аудитория")
    subgroup: Optional[str] = Field(None, description="Подгруппа")

    @field_validator("timeEnd")
    @classmethod
    def validate_time_range(cls, v, info):
        """Проверка, что время окончания позже времени начала."""
        if v and info.data.get("timeStart") and v <= info.data["timeStart"]:
            raise ValueError("Время окончания должно быть позже времени начала")
        return v


class LessonCreate(BaseModel):
    """Схема для создания занятия (используется в парсере)."""

    lessonId: int = Field(..., gt=0, description="Оригинальный ID занятия из API")
    groupId: int = Field(..., gt=0, description="ID группы (внешний ключ)")
    date: dateT = Field(..., description="Дата занятия")
    weekday: str = Field(..., min_length=1, description="День недели")
    discipline: str = Field(..., min_length=1, description="Название дисциплины")
    lessonType: str = Field(..., min_length=1, description="Тип занятия")
    timeBegin: Optional[time] = Field(None, description="Время начала")
    timeEnd: Optional[time] = Field(None, description="Время окончания")
    teacherId: Optional[int] = Field(None, gt=0, description="ID преподавателя")
    roomId: Optional[int] = Field(None, gt=0, description="ID аудитории")
    subgroup: Optional[str] = Field(None, description="Подгруппа")


class LessonUpdate(BaseModel):
    """Схема для частичного обновления занятия (PATCH)."""

    discipline: Optional[str] = Field(None, min_length=1)
    lessonType: Optional[str] = Field(None, min_length=1)
    timeBegin: Optional[time] = None
    timeEnd: Optional[time] = None
    teacherId: Optional[int] = Field(None, gt=0)
    roomId: Optional[int] = Field(None, gt=0)
    subgroup: Optional[str] = None


class Lesson(LessonBase):
    """Полная схема занятия для ответов API."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
