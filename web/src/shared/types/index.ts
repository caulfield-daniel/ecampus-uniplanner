import type {
  Lesson as KmpLesson,
  GroupInfo,
  Task as KmpTask,
  Note as KmpNote,
  User,
  ErrorResponse,
  ValidationResult,
  Institute,
  Specialty,
  AcademicGroup,
  Teacher,
  Room,
  ParserStatusResponse,
  ParserSyncRequest,
} from '@shared/kmp/';

// relatedLessonId добавлен в shared/ApiModels.kt, но генерация .d.mts из
// Kotlin/JS временно нестабильна на этой машине (см. docs/06-implementation/notes.md) —
// расширяем тип ответа локально, не дожидаясь починки тулчейна.
export type Task = KmpTask & { relatedLessonId?: number };
export type Note = KmpNote & { relatedLessonId?: number };
export type Lesson = KmpLesson;

export type { GroupInfo, User, ErrorResponse, ValidationResult, Institute, Specialty, AcademicGroup, Teacher, Room, ParserStatusResponse, ParserSyncRequest };
