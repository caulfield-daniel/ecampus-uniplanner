from __future__ import annotations

from datetime import datetime, date, time
from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class Lesson(Base):
    __tablename__ = "lessons"

    # Внутренний первичный ключ (автоинкремент)
    id: Mapped[int] = mapped_column(primary_key=True)

    lesson_id: Mapped[int] = mapped_column(nullable=False, index=True)
    group_id: Mapped[int] = mapped_column(
        ForeignKey("academic_groups.id"), nullable=False, index=True
    )
    date: Mapped[date] = mapped_column(nullable=False)
    weekday: Mapped[str] = mapped_column(nullable=False)
    discipline: Mapped[str] = mapped_column(nullable=False)
    lesson_type: Mapped[str] = mapped_column(nullable=False)
    time_begin: Mapped[time | None] = mapped_column(nullable=True)
    time_end: Mapped[time | None] = mapped_column(nullable=True)
    teacher_id: Mapped[int | None] = mapped_column(
        ForeignKey("teachers.id"), nullable=True
    )
    room_id: Mapped[int | None] = mapped_column(ForeignKey("rooms.id"), nullable=True)
    subgroup: Mapped[str | None] = mapped_column(nullable=True)

    # Служебное поле
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
