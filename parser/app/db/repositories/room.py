from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.room import Room
from app.schemas.room import RoomCreate
from typing import List


class RoomRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(self, create_data: RoomCreate) -> Room:
        # Ищем существующую запись по названию и ID института
        stmt = select(Room).where(Room.id == create_data.id)
        result = await self.session.execute(stmt)
        existing: Room | None = result.scalar_one_or_none()
        if existing:
            # обновляем поля
            existing.name = create_data.name
            return existing
        else:
            # создаём новую запись, id сгенерируется автоматически
            db_room = Room(id=create_data.id, name=create_data.name)
            self.session.add(db_room)
            return db_room

    async def upsert_many(self, items: List[RoomCreate]) -> List[Room]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved
