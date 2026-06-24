from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate
from typing import List


class TeacherRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(self, create_data: TeacherCreate) -> Teacher:
        # Ищем существующую запись по названию и ID института
        stmt = select(Teacher).where(Teacher.id == create_data.id)
        result = await self.session.execute(stmt)
        existing: Teacher | None = result.scalar_one_or_none()
        if existing:
            # обновляем поля
            existing.name = create_data.name
            return existing
        else:
            # создаём новую запись, id сгенерируется автоматически
            db_room = Teacher(id=create_data.id, name=create_data.name)
            self.session.add(db_room)
            return db_room

    async def upsert_many(self, items: List[TeacherCreate]) -> List[Teacher]:
        saved: List = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved
