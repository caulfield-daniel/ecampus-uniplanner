# Доменная модель

Курсовой проект реализует 7 бизнес-сущностей (требование методички — 5-7+), разделённых на два типа по источнику и зоне ответственности.

## Ядро (управляется backend, полноценные Entity с бизнес-методами)

| Сущность | Таблица БД | Бизнес-методы (слой Entity) |
|---|---|---|
| User | `users` | `hasRole()`, `isAdmin()`, `changePassword()` |
| Task | `tasks` | `markCompleted()`, `isOverdue(now)`, `reschedule(newDeadline)`, инвариант `priority ∈ [1,5]` |
| Note | `notes` | `updateContent()`, `belongsTo(userId)` |
| CachedLesson | `cached_lessons` | `isToday(date)`, `overlaps(other)` |

## Справочники (read-only, источник — микросервис-парсер)

| Сущность | DTO в shared | Примечание |
|---|---|---|
| AcademicGroup | `AcademicGroup` | Жизненным циклом управляет parser; backend читает через `cached_lessons`/прокси |
| Teacher | `Teacher` | read-only |
| Room | `Room` | read-only |

Справочники намеренно не содержат бизнес-логики: их состояние формируется внешним процессом (парсер сайта университета), backend выступает транслятором/кэширующим слоем, а не владельцем их жизненного цикла. Это сознательное архитектурное решение, а не недосмотр анемичности модели.

## Связи

- `User 1—N Task`, `User 1—N Note` — через `user_id` (FK на `users.id`).
- `CachedLesson` не имеет FK на `User`, связь по `group_name` (denormalized — кэш для скорости чтения расписания).
- `CachedLesson 1—N Task`, `CachedLesson 1—N Note` — через необязательный `lesson_id` (`ON DELETE SET NULL`), см. [03-database/er-diagram.md](../03-database/er-diagram.md). Позволяет привязать задачу/заметку к конкретному занятию (UC-06 в [use-case-specifications.md](use-case-specifications.md)).
