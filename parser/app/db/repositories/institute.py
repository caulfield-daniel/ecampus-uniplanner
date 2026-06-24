from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.institute import Institute
from app.schemas.institute import InstituteCreate
from typing import List


class InstituteRepository:
    """Репозиторий для работы с моделью `Institute`."""

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def upsert(self, create_data: InstituteCreate) -> Institute:
        stmt = select(Institute).where(Institute.id == create_data.id)
        result = await self.session.execute(stmt)
        existing: Institute | None = result.scalar_one_or_none()

        # 1. Пытаемся найти существующую запись по id
        if existing:
            # 2. Если запись существует, обновляем поля (маппинг camelCase -> snake_case)
            existing.name = create_data.name
            existing.short_name = create_data.shortName
            existing.branch_id = create_data.branchId
            return existing
        else:
            # 3. Создаём новый объект ORM с явным маппингом полей
            db_institute = Institute(
                id=create_data.id,
                name=create_data.name,
                short_name=create_data.shortName,
                branch_id=create_data.branchId,
            )
            self.session.add(db_institute)
            return db_institute

    async def upsert_many(self, items: List[InstituteCreate]) -> List[Institute]:
        """Пакетная вставка/обновление (простая реализация через цикл)."""
        saved: List[Institute] = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved
