from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.academic_group import AcademicGroup
from app.schemas.academic_group import AcademicGroupCreate
from typing import List


class AcademicGroupRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(
        self, create_data: AcademicGroupCreate, specialty_id: int
    ) -> AcademicGroup:
        # Ищем существующую запись по названию и ID института
        stmt = select(AcademicGroup).where(AcademicGroup.id == create_data.id)
        result = await self.session.execute(stmt)
        existing: AcademicGroup | None = result.scalar_one_or_none()
        if existing:
            # обновляем поля
            existing.name = create_data.name
            existing.edu_level = create_data.eduLevel
            return existing
        else:
            db_academic_group = AcademicGroup(
                id=create_data.id,
                name=create_data.name, 
                edu_level=create_data.eduLevel,
                specialty_id=specialty_id,
            )
            self.session.add(db_academic_group)
            return db_academic_group

    async def upsert_many(
        self, items: List[AcademicGroupCreate], specialty_id
    ) -> List[AcademicGroup]:
        saved: List[AcademicGroup] = []
        for item in items:
            saved.append(await self.upsert(item, specialty_id))
        return saved

    async def get_by_name(self, name: str) -> AcademicGroup | None:
        stmt = select(AcademicGroup).where(AcademicGroup.name == name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self) -> List[AcademicGroup]:
        stmt = select(AcademicGroup)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
