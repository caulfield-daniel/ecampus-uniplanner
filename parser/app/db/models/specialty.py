from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, func
from app.db.base import Base
from datetime import datetime


class Specialty(Base):
    __tablename__ = "specialties"

    id: Mapped[int] = mapped_column(primary_key=True)  # автоинкремент
    name: Mapped[str] = mapped_column(nullable=False)
    institute_id: Mapped[int] = mapped_column(
        ForeignKey("institutes.id"), nullable=False
    )
    branch_id: Mapped[int] = mapped_column(nullable=False, default=1)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
