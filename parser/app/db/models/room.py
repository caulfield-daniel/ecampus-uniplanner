from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import func
from app.db.base import Base
from datetime import datetime


class Room(Base):
    __tablename__ = "rooms"

    id: Mapped[int] = mapped_column(primary_key=True)  # ID из API
    name: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

