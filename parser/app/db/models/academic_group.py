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
