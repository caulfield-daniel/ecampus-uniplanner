# REST API

Живая документация генерируется `springdoc-openapi` на `http://localhost:8080/api/v1/swagger-ui.html`. Файлы `api/*.yaml` — проектный контракт, написанный заранее, не обязательно синхронизирован 1:1 с реализацией.

## Эндпоинты (13)

| # | Метод | Путь | Контроллер | Доступ |
|---|---|---|---|---|
| 1 | POST | `/auth/register` | `AuthController` | публичный |
| 2 | POST | `/auth/login` | `AuthController` | публичный |
| 3 | GET | `/auth/me` | `AuthController` | JWT |
| 4 | GET | `/tasks` | `TaskController` | JWT |
| 5 | POST | `/tasks` | `TaskController` | JWT |
| 6 | PUT | `/tasks/{id}` | `TaskController` | JWT |
| 7 | DELETE | `/tasks/{id}` | `TaskController` | JWT |
| 8 | GET | `/notes` | `NoteController` | JWT |
| 9 | POST | `/notes` | `NoteController` | JWT |
| 10 | PUT | `/notes/{id}` | `NoteController` | JWT |
| 11 | DELETE | `/notes/{id}` | `NoteController` | JWT |
| 12 | GET | `/schedule?group=&from=&to=` | `ScheduleController` | JWT |
| 13 | GET | `/groups` | `ScheduleController` | JWT |

Все ответы об ошибках унифицированы через `GlobalExceptionHandler` → `ru.uniplanner.shared.ErrorResponse { code, message }`.

## Валидация

Входные данные (`RegisterRequest`, `LoginRequest`, `TaskInput`, `NoteInput`) валидируются в слое Control через переиспользуемые правила из shared-модуля (`ru.uniplanner.shared.ModelValidators`) — одна и та же логика валидации работает на JVM (backend) и потенциально в JS/мобильном клиенте, без дублирования.

## Известное упрощение

- `GET /schedule` читает только локальный кэш `cached_lessons`backend. Текущие данные — seed-миграция (`V2__seed_demo_lessons.sql`), а не результат живого парсинга. Интеграция с микросервисом-парсером (`POST /parser/sync`, `GET /parser/status`) — следующий шаг, не выполнен в этой итерации (см. `docs/08-final/summary.md`).
