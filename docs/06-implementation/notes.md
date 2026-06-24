# Реализация: структура кода

## Пакеты backend (`ru.uniplanner.backend`)

| Пакет | Слой PCMEF | Содержимое |
|---|---|---|
| `entity` | Entity | `UserEntity`, `TaskEntity`, `NoteEntity`, `CachedLessonEntity`, бизнес-методы |
| `repository` | Foundation | `IUserRepository`, `ITaskRepository`, `INoteRepository`, `ICachedLessonRepository` |
| `service` | Mediator | `IAuthService`/`AuthServiceImpl`, `ITaskService`/`TaskServiceImpl`, `INoteService`/`NoteServiceImpl`, `IScheduleService`/`ScheduleServiceImpl` |
| `controller` | Control | `AuthController`, `TaskController`, `NoteController`, `ScheduleController` |
| `mapper` | Foundation (техническая трансляция) | `UserMapper`, `TaskMapper`, `NoteMapper`, `LessonMapper` |
| `security` | сквозной | `JwtService`, `JwtAuthFilter`, `SecurityUtils.currentUserId()` |
| `config` | Foundation/инфраструктура | `SecurityConfig`, `CorsConfig` |
| `exception` | сквозной | `NotFoundException`, `ConflictException`, `UnauthorizedException`, `GlobalExceptionHandler` |

## Решения по тестам

- Тестируется только Mediator (Service): `AuthServiceImplTest`, `TaskServiceImplTest`, `NoteServiceImplTest`, `ScheduleServiceImplTest` — MockK на репозиториях, без поднятия Spring-контекста (быстро).
- Контроллеры и Foundation (парсер) не покрыты юнит-тестами ради скорости — осознанное решение, зафиксированное здесь.
- JaCoCo подключен (`backend/build.gradle.kts`), отчёт — `backend/build/reports/jacoco/test/html/index.html` после `./gradlew :backend:test`.

## Заметки по интеграции shared-модуля

- DTO для запросов (`RegisterRequest`, `LoginRequest`, `TaskInput`, `NoteInput`) не имеют `jakarta.validation`-аннотаций — это сломало бы KMP/JS-совместимость. Вместо этого валидация вызывается явно в Control-слое через `ru.uniplanner.shared.ModelValidators` (одна логика валидации работает на backend и потенциально на клиентах).
- На фронте `RegisterRequest`/`LoginRequest`/`LoginResponse` НЕ импортируются из shared (не экспортированы в JS намеренно) — объявлены как локальные TS-интерфейсы в `web/src/context/AuthContext.tsx`. Аналогично `TaskInput`/`NoteInput` тела запросов представлены локальными `web/src/api/requestTypes.ts`, т.к. Kotlin/JS-экспорт генерирует классы с методами (`copy`/`equals`/`hashCode`), которые не проходят структурную проверку TS для литералов объектов.
- Мост `web/src/shared/kmp/index.ts` был исправлен: актуальный Kotlin/JS-экспорt — плоский (без вложенного namespace `ru.uniplanner.shared`), старая версия моста ссылалась на несуществующий путь `KmpTypes.ru.uniplanner.shared.*`.
