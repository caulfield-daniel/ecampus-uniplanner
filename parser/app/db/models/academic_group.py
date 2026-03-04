# app/db/models/academic_group.py
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, func
from app.db.base import Base
from datetime import datetime


class AcademicGroup(Base):
    __tablename__ = "academic_groups"

    id: Mapped[int] = mapped_column(primary_key=True)  # ID из API
    name: Mapped[str] = mapped_column(nullable=False)
    edu_level: Mapped[str] = mapped_column(nullable=False)
    specialty_id: Mapped[int] = mapped_column(
        ForeignKey("specialties.id"), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    def __init__(self, id: int, name: str, edu_level: str, specialty_id: int) -> None:
        self.id = id
        self.name = name
        self.edu_level = edu_level
        self.specialty_id = specialty_id
