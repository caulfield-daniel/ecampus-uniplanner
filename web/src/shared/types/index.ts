// Единый источник истины типов web — JSON Schema, сгенерированные из
// shared/ApiModels.kt (см. api/schemas/*.json и shared/.../schema/JsonSchemaGenerator.kt).
// TS-типы генерируются командой `npm run generate:types` (web/scripts/generate-types.mjs)
// в src/shared/types/generated/. Ручные правки запрещены — правим модели в shared
// и перегенерируем. Алиас @/shared/types сохранён для обратной совместимости.

export type {
  AcademicGroup,
  CaptchaChallengeResponse,
  ErrorResponse,
  GroupInfo,
  Institute,
  Lesson,
  LoginRequest,
  LoginResponse,
  Note,
  NoteInput,
  ParserStatusResponse,
  ParserSyncRequest,
  ParserSyncResponse,
  RegisterRequest,
  Room,
  Specialty,
  Task,
  TaskInput,
  Teacher,
  UniversityLinkStatus,
  UniversityLoginRequest,
  User,
  ValidationResult,
} from './generated';
