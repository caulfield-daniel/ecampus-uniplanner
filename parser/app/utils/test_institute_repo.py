import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from app.db.session import AsyncSessionLocal
from app.db.repositories.institute import InstituteRepository
from app.schemas.institute import InstituteCreate

from app.core.config import settings
print("DB_HOST:", settings.db_host)
print("DB_NAME:", settings.db_name)


async def test():
    # Создаём тестовые данные
    test_institute = InstituteCreate(
        id=999999,  # используем заведомо уникальный ID
        name="Тестовый институт",
        shortName="ТИ",
        branchId=1,
    )

    async with AsyncSessionLocal() as session:
        repo = InstituteRepository(session)
        # Сохраняем
        saved = await repo.upsert(test_institute)
        await session.commit()
        print(f"✅ Институт сохранён: id={saved.id}, name={saved.name}")

        # Проверяем, что можно найти по ID
        from sqlalchemy import select
        from app.db.models.institute import Institute

        stmt = select(Institute).where(Institute.id == test_institute.id)
        result = await session.execute(stmt)
        found = result.scalar_one_or_none()
        if found:
            print(f"✅ Институт найден в БД: {found.name}")
        else:
            print("❌ Институт не найден после сохранения")

        # Проверяем обновление
        updated_data = InstituteCreate(
            id=test_institute.id,
            name="Тестовый институт (обновлённый)",
            shortName="ТИ",
            branchId=2,
        )
        saved_updated = await repo.upsert(updated_data)
        await session.commit()
        print(f"✅ Институт обновлён: branch_id={saved_updated.branch_id}")

        # Проверяем, что обновление применилось
        stmt = select(Institute).where(Institute.id == test_institute.id)
        result = await session.execute(stmt)
        updated = result.scalar_one()
        assert updated.name == updated_data.name
        assert updated.branch_id == updated_data.branchId
        print("✅ Обновление прошло успешно")


if __name__ == "__main__":
    asyncio.run(test())
