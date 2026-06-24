from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.parser import ParserStatus
from app.schemas.parser import ParserStatusEnum
from datetime import datetime, timezone


class ParserStatusRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_status(self) -> ParserStatus | None:
        stmt = select(ParserStatus).where(ParserStatus.id == 1)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def start(self) -> None:
        """Устанавливает статус в running, обновляет last_start и last_update."""
        status = await self.get_status()
        now = datetime.now(timezone.utc).replace(
            tzinfo=None
        )  # для БД без временной зоны
        if not status:
            # Создаём новую запись
            status = ParserStatus(
                id=1,
                status=ParserStatusEnum.running,
                last_start=now,
                last_update=now,
                last_end=None,
                last_error=None,
                groups_count=0,
                lessons_count=0,
            )
            self.session.add(status)
        else:
            status.status = ParserStatusEnum.running
            status.last_start = now
            status.last_update = now
        await self.session.commit()

    async def finish(
        self, success: bool = True, groups_count: int = 0, lessons_count: int = 0
    ) -> None:
        """Устанавливает статус в idle, обновляет last_end, last_update и статистику."""
        status = await self.get_status()
        if status:
            now = func.now()
            status.status = ParserStatusEnum.idle
            status.last_end = now
            status.last_update = now
            if success:
                status.groups_count = groups_count
                status.lessons_count = lessons_count
            else:
                status.last_error = None
            await self.session.commit()

    async def fail(self, error: str) -> None:
        """Фиксирует ошибку: статус error, обновляет last_end, last_error, last_update."""
        status = await self.get_status()
        if status:
            now = func.now()
            status.status = ParserStatusEnum.error
            status.last_end = now
            status.last_error = error
            status.last_update = now
            await self.session.commit()
