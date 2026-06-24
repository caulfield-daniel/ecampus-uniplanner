# REST API

Живая документация генерируется `springdoc-openapi` на `http://localhost:8080/api/v1/swagger-ui/index.html`. Базовый URL: `http://localhost:8080/api/v1`. Файлы `api/*.yaml` — проектный контракт.

## Эндпоинты (18)

| # | Метод | Путь | Контроллер | Доступ |
|---|---|---|---|---|
| 1 | POST | `/auth/register` | `AuthController` | публичный |
| 2 | POST | `/auth/login` | `AuthController` | публичный |
| 3 | GET | `/auth/me` | `AuthController` | JWT |
| 4 | GET | `/tasks?lessonId=` | `TaskController` | JWT |
| 5 | POST | `/tasks` | `TaskController` | JWT |
| 6 | PUT | `/tasks/{id}` | `TaskController` | JWT |
| 7 | DELETE | `/tasks/{id}` | `TaskController` | JWT |
| 8 | GET | `/notes?lessonId=` | `NoteController` | JWT |
| 9 | POST | `/notes` | `NoteController` | JWT |
| 10 | PUT | `/notes/{id}` | `NoteController` | JWT |
| 11 | DELETE | `/notes/{id}` | `NoteController` | JWT |
| 12 | GET | `/schedule?group=&from=&to=` | `ScheduleController` | JWT |
| 13 | GET | `/groups` | `ScheduleController` | JWT |
| 14 | POST | `/parser/sync?group=&from=&to=` | `ParserSyncController` | JWT |
| 15 | POST | `/university-auth/captcha` | `UniversityAuthController` | JWT |
| 16 | POST | `/university-auth/login` | `UniversityAuthController` | JWT |
| 17 | GET | `/university-auth/status` | `UniversityAuthController` | JWT |
| 18 | DELETE | `/university-auth/link` | `UniversityAuthController` | JWT |

`lessonId` — необязательный query-параметр у `GET /tasks`/`GET /notes` (не отдельный эндпоинт): фильтрует список по привязке к занятию, используется виджетом `LessonDetailSheet` и фильтром на страницах «Задачи»/«Заметки» во фронтенде.

Все ответы об ошибках унифицированы через `GlobalExceptionHandler` → `ru.uniplanner.shared.ErrorResponse { code, message }`.

## Валидация

Входные данные (`RegisterRequest`, `LoginRequest`, `TaskInput`, `NoteInput`) валидируются в слое Control через переиспользуемые правила из shared-модуля (`ru.uniplanner.shared.ModelValidators`) — одна и та же логика валидации работает на JVM (backend) и потенциально в JS/мобильном клиенте, без дублирования.

## Личный вход в ИС вуза vs сервисный аккаунт парсера

`/university-auth/*` — отдельный флоу для **личного** аккаунта пользователя приложения в ecampus.ncfu.ru (через капчу, `UniversityCredentialEntity`, зашифрованная сессия). Не путать с сервисным аккаунтом парсера, которым parser-микросервис сам забирает публичное расписание групп (простой cookie-файл, без участия конечных пользователей) — см. [02-architecture/microservices.md](../02-architecture/microservices.md).
