<<<<<<< HEAD
export type {
  Lesson,
  GroupInfo,
  Task,
  TaskInput,
  Note,
  NoteInput,
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
} from './dto/shared.d.mts';
=======
// ========== ТИПЫ (TypeScript декларации) ==========
import type * as KmpTypes from './dto/shared.d.mts';

// ========== ЭКСПОРТ ТИПОВ (с выравниванием пространства имён) ==========
export type Lesson = KmpTypes.ru.uniplanner.shared.Lesson;
export type GroupInfo = KmpTypes.ru.uniplanner.shared.GroupInfo;
export type Task = KmpTypes.ru.uniplanner.shared.Task;
export type TaskInput = KmpTypes.ru.uniplanner.shared.TaskInput;
export type Note = KmpTypes.ru.uniplanner.shared.Note;
export type NoteInput = KmpTypes.ru.uniplanner.shared.NoteInput;
export type User = KmpTypes.ru.uniplanner.shared.User;
export type ErrorResponse = KmpTypes.ru.uniplanner.shared.ErrorResponse;
export type ValidationResult = KmpTypes.ru.uniplanner.shared.ValidationResult;
export type Institute = KmpTypes.ru.uniplanner.shared.Institute;
export type Specialty = KmpTypes.ru.uniplanner.shared.Specialty;
export type AcademicGroup = KmpTypes.ru.uniplanner.shared.AcademicGroup;
export type Teacher = KmpTypes.ru.uniplanner.shared.Teacher;
export type Room = KmpTypes.ru.uniplanner.shared.Room;
export type ParserStatusResponse = KmpTypes.ru.uniplanner.shared.ParserStatusResponse;
export type ParserSyncRequest = KmpTypes.ru.uniplanner.shared.ParserSyncRequest;
>>>>>>> shared-kmp
