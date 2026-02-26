// ========== ИМПОРТ ТИПОВ из деклараций (только для TypeScript) ==========
import type * as KmpTypes from './shared.dev.d.ts';

// ========== ИМПОРТ RUNTIME из JS-бандла (подставляется Vite) ==========
import * as KmpRuntime from '@shared/kmp'; // предполагаем, что алиас @shared/kmp ведёт на нужный .js файл

// ========== ЭКСПОРТ ТИПОВ ==========
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
export type ParserStatusResponse =
  KmpTypes.ru.uniplanner.shared.ParserStatusResponse;
export type ParserSyncRequest = KmpTypes.ru.uniplanner.shared.ParserSyncRequest;

// ========== ЭКСПОРТ RUNTIME-ОБЪЕКТОВ ==========

// Костыль для TypeScript, чтобы работало автодополнение
export const Kmp = KmpRuntime;
// На деле Vite подставит dev/prod runtime-сборку в зависимости от окружения
const KmpRuntimeTyped = KmpRuntime as typeof KmpTypes;

// Безопасно извлекаем объекты из пространства имён (если они есть)
export const ModelValidators =
  KmpRuntimeTyped.ru?.uniplanner?.shared?.ModelValidators;
export const ApiConstants =
  KmpRuntimeTyped.ru?.uniplanner?.shared?.ApiConstants;

// Если нужно экспортировать весь runtime-модуль целиком (например, для вызова функций)
export default KmpRuntime;
