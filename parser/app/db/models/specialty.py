from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, func, UniqueConstraint
from app.db.base import Base
from datetime import datetime


class Specialty(Base):
    __tablename__ = "specialties"
    __table_args__ = (
        UniqueConstraint("name", "institute_id", name="uq_specialties_name_institute"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)  # автоинкремент
    name: Mapped[str] = mapped_column(nullable=False)
    institute_id: Mapped[int] = mapped_column(
        ForeignKey("institutes.id"), nullable=False
    )
    branch_id: Mapped[int] = mapped_column(nullable=False, default=1)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    def __init__(
        self,
        name: str,
        institute_id: int,
        branch_id: int,
    ):
        self.name = name
        self.institute_id = institute_id
        self.branch_id = branch_id
