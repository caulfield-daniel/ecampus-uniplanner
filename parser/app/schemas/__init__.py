# Схемы для моделей данных парсера
from .institute import Institute, InstituteBase, InstituteCreate, InstituteUpdate
from .specialty import Specialty, SpecialtyBase, SpecialtyCreate, SpecialtyUpdate
from .academic_group import (
    AcademicGroup,
    AcademicGroupBase,
    AcademicGroupCreate,
    AcademicGroupUpdate,
)
from .teacher import Teacher, TeacherBase, TeacherCreate, TeacherUpdate
from .room import Room, RoomBase, RoomCreate, RoomUpdate
from .parser import ParserStatusResponse, ParserStatusEnum, ParserSyncRequest


__all__ = [
    # Institute
    "Institute",
    "InstituteBase",
    "InstituteCreate",
    "InstituteUpdate",
    # Specialty
    "Specialty",
    "SpecialtyBase",
    "SpecialtyCreate",
    "SpecialtyUpdate",
    # AcademicGroup
    "AcademicGroup",
    "AcademicGroupBase",
    "AcademicGroupCreate",
    "AcademicGroupUpdate",
    # Teacher
    "Teacher",
    "TeacherBase",
    "TeacherCreate",
    "TeacherUpdate",
    # Room
    "Room",
    "RoomBase",
    "RoomCreate",
    "RoomUpdate",
    # ParserStatusResponse
    "ParserStatusResponse",
    "ParserStatusEnum",
    # ParserSyncRequest
    "ParserSyncRequest",
]
