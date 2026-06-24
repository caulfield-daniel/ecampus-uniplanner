from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert as pg_insert
from app.db.models.specialty import Specialty
from app.schemas.specialty import SpecialtyCreate
from typing import List


class SpecialtyRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(self, create_data: SpecialtyCreate) -> Specialty:
        # Ищем существующую запись по названию и ID института
        stmt = select(Specialty).where(
            Specialty.name == create_data.name,
            Specialty.institute_id == create_data.instituteId,
        )
        result = await self.session.execute(stmt)
        existing: Specialty | None = result.scalar_one_or_none()
        if existing:
            # обновляем поля
            existing.branch_id = create_data.branchId
            return existing
        else:
            # создаём новую запись, id сгенерируется автоматически
            db_specialty = Specialty(
                name=create_data.name,
                institute_id=create_data.instituteId,
                branch_id=create_data.branchId,
            )
            self.session.add(db_specialty)
            return db_specialty

    async def upsert_many(self, items: List[SpecialtyCreate]) -> List[Specialty]:
        # Преобразуем Pydantic-схемы в словари для вставки
        values = [
            {
                "name": item.name,
                "institute_id": item.instituteId,
                "branch_id": item.branchId,
            }
            for item in items
        ]
        stmt = pg_insert(Specialty).values(values)
        stmt = stmt.on_conflict_do_update(

            index_elements=["name", "institute_id"],  # уникальный ключ
            set_={"branch_id": stmt.excluded.branch_id},
        ).returning(Specialty)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
