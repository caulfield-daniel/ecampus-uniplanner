from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.lesson import Lesson
from app.schemas.lesson import LessonCreate
from typing import List


class LessonRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(self, create_data: LessonCreate) -> Lesson:
        # Ищем существующую запись по названию и ID института
        stmt = select(Lesson).where(
            Lesson.lesson_id == create_data.lessonId,
            Lesson.date == create_data.date,
            Lesson.group_id == create_data.groupId,
        )
        result = await self.session.execute(stmt)
        existing: Lesson | None = result.scalar_one_or_none()
        if existing:
            # обновляем поля
            existing.weekday = create_data.weekday
            existing.discipline = create_data.discipline

            return existing
        else:
            # создаём новую запись, id сгенерируется автоматически
            db_lesson = Lesson(
                id=create_data.lessonId,
                weekday=create_data.weekday,
                discipline=create_data.discipline,
            )
            self.session.add(db_lesson)
            return db_lesson

    async def upsert_many(self, items: List[LessonCreate]) -> List[Lesson]:
        saved: List[Lesson] = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved
