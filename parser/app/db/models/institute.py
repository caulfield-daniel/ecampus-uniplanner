from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base
from typing import Optional


class Institute(Base):
    __tablename__ = "institutes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(nullable=False)
    short_name: Mapped[str] = mapped_column(nullable=False)
    branch_id: Mapped[Optional[int]] = mapped_column(nullable=False, default=1)

    def __init__(self, id: int, name: str, short_name: str, branch_id: int) -> None:
        self.id = id
        self.name = name
        self.short_name = short_name
        self.branch_id = branch_id
