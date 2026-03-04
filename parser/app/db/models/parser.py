from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
from app.schemas.parser import ParserStatusEnum


class ParserStatus(Base):
    __tablename__ = "parser_status"

    id: Mapped[int] = mapped_column(primary_key=True, default=1)
    status: Mapped[ParserStatusEnum] = mapped_column(
        nullable=False, default=ParserStatusEnum.idle
    )
    last_update: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    last_start: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    last_end: Mapped[Optional[datetime]] = mapped_column(nullable=True)
    last_error: Mapped[Optional[str]] = mapped_column(nullable=True, default=None)
    groups_count: Mapped[int] = mapped_column(nullable=False, default=0)
    lessons_count: Mapped[int] = mapped_column(nullable=False, default=0)

    def __init__(
        self,
        id: int = 1,
        status: ParserStatusEnum = ParserStatusEnum.idle,
        last_update: Optional[datetime] = None,
        last_start: Optional[datetime] = None,
        last_end: Optional[datetime] = None,
        last_error: Optional[str] = None,
        groups_count: int = 0,
        lessons_count: int = 0,
    ) -> None:
        self.id = id
        self.status = status
        self.last_update = last_update
        self.last_start = last_start
        self.last_end = last_end
        self.last_error = last_error
        self.groups_count = groups_count
        self.lessons_count = lessons_count
