from typing import List, Dict, Any
from app.schemas.institute import InstituteCreate
from app.schemas.specialty import SpecialtyCreate, SpecialtyInfo
from app.schemas.academic_group import AcademicGroupCreate
from app.schemas.lesson import LessonCreate
from app.schemas.teacher import TeacherCreate
from app.schemas.room import RoomCreate


class InMemoryInstituteRepo:
    """Мок-репозиторий для институтов, хранит данные в памяти."""

    def __init__(self):
        self._storage: Dict[int, InstituteCreate] = {}

    async def upsert(self, item: InstituteCreate) -> InstituteCreate:
        self._storage[item.id] = item
        return item

    async def upsert_many(self, items: List[InstituteCreate]) -> List[InstituteCreate]:
        saved = []
        for item in items:
            self._storage[item.id] = item
            saved.append(item)
        return saved


class InMemorySpecialtyRepo:
    """Мок-репозиторий для специальностей, генерирует внутренние ID."""

    def __init__(self):
        self._storage: Dict[int, SpecialtyInfo] = {}
        self._next_id = 1

    async def upsert(self, item: SpecialtyCreate) -> SpecialtyInfo:
        # Поиск по уникальному ключу (name, instituteId)
        existing = next(
            (
                s
                for s in self._storage.values()
                if s.name == item.name and s.instituteId == item.instituteId
            ),
            None,
        )
        if existing:
            updated = SpecialtyInfo(
                id=existing.id,
                name=item.name,
                instituteId=item.instituteId,
                branchId=item.branchId,
            )
            self._storage[existing.id] = updated  # type: ignore
            return updated
        else:
            new_id = self._next_id
            self._next_id += 1
            new_spec = SpecialtyInfo(
                id=new_id,
                name=item.name,
                instituteId=item.instituteId,
                branchId=item.branchId,
            )
            self._storage[new_id] = new_spec
            return new_spec

    async def upsert_many(self, items: List[SpecialtyCreate]) -> List[SpecialtyInfo]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved


class InMemoryAcademicGroupRepo:
    """Мок-репозиторий для групп, добавляет specialty_id."""

    def __init__(self):
        # Храним объекты с полями id, name, eduLevel, specialtyId
        self._storage: Dict[int, Any] = {}

    async def upsert(self, item: AcademicGroupCreate, specialty_id: int) -> Any:
        existing = self._storage.get(item.id)
        if existing:
            existing.name = item.name
            existing.eduLevel = item.eduLevel
            existing.specialtyId = specialty_id
            return existing
        else:
            group_obj = type("Group", (), {})()
            group_obj.id = item.id # type: ignore
            group_obj.name = item.name  # type: ignore
            group_obj.eduLevel = item.eduLevel  # type: ignore
            group_obj.specialtyId = specialty_id  # type: ignore
            self._storage[item.id] = group_obj
            return group_obj

    async def upsert_many(
        self, items: List[AcademicGroupCreate], specialty_id: int
    ) -> List[Any]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item, specialty_id))
        return saved


class InMemoryLessonRepo:
    """Мок-репозиторий для занятий, генерирует внутренние ID и использует составной ключ."""

    def __init__(self):
        # Ключ (lesson_id, group_id, date)
        self._storage: Dict[tuple, Any] = {}
        self._next_id = 1

    async def upsert(self, item: LessonCreate) -> Any:
        key = (item.lessonId, item.groupId, item.date)
        existing = self._storage.get(key)

        if existing:
            existing.discipline = item.discipline
            existing.lessonType = item.lessonType
            existing.timeBegin = item.timeBegin
            existing.timeEnd = item.timeEnd
            existing.teacherId = item.teacherId
            existing.roomId = item.roomId
            existing.subgroup = item.subgroup
            return existing
        else:
            lesson_obj = type("Lesson", (), {})()
            lesson_obj.id = self._next_id # type: ignore
            self._next_id += 1
            lesson_obj.lessonId = item.lessonId  # type: ignore
            lesson_obj.groupId = item.groupId  # type: ignore
            lesson_obj.date = item.date  # type: ignore
            lesson_obj.weekday = item.weekday  # type: ignore
            lesson_obj.discipline = item.discipline  # type: ignore
            lesson_obj.lessonType = item.lessonType  # type: ignore
            lesson_obj.timeBegin = item.timeBegin  # type: ignore
            lesson_obj.timeEnd = item.timeEnd  # type: ignore
            lesson_obj.teacherId = item.teacherId  # type: ignore
            lesson_obj.roomId = item.roomId  # type: ignore
            lesson_obj.subgroup = item.subgroup  # type: ignore
            self._storage[key] = lesson_obj
            return lesson_obj

    async def upsert_many(self, items: List[LessonCreate]) -> List[Any]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved


class InMemoryTeacherRepo:
    """Мок-репозиторий для преподавателей, использует ID из API."""

    def __init__(self):
        self._storage: Dict[int, TeacherCreate] = {}

    async def upsert(self, item: TeacherCreate) -> TeacherCreate:
        self._storage[item.id] = item
        return item

    async def upsert_many(self, items: List[TeacherCreate]) -> List[TeacherCreate]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved


class InMemoryRoomRepo:
    """Мок-репозиторий для аудиторий, использует ID из API."""

    def __init__(self):
        self._storage: Dict[int, RoomCreate] = {}

    async def upsert(self, item: RoomCreate) -> RoomCreate:
        self._storage[item.id] = item
        return item

    async def upsert_many(self, items: List[RoomCreate]) -> List[RoomCreate]:
        saved = []
        for item in items:
            saved.append(await self.upsert(item))
        return saved
