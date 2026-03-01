from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, func
from app.db.base import Base
from datetime import datetime


class Teacher(Base):
    __tablename__ = "teachers"

    id: Mapped[int] = mapped_column(primary_key=True)  # ID из API
    name: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
