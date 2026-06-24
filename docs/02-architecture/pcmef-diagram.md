# Архитектура: PCMEF в Ecampus UniPlanner

Проект состоит из двух процессов: backend-монолит (Spring Boot, Kotlin) и микросервис-парсер (FastAPI, Python). PCMEF применяется к backend-монолиту целиком; парсер — внешняя инфраструктурная зависимость, вызываемая из слоя Foundation, и в PCMEF backend не входит (обоснование — [microservices.md](microservices.md)).

## Трактовка слоёв

| Слой | Реализация | Пакет/расположение | Ограничение |
|---|---|---|---|
| **P** Presentation | React-приложение | `web/` (отдельный процесс) | Не содержит бизнес-логики, только рендер и вызовы API |
| **C** Control | `@RestController` | `ru.uniplanner.backend.controller` | Валидация входа (`@Valid`), вызывает только `IXxxService`, не обращается к репозиториям/БД напрямую |
| **M** Mediator | `@Service` | `ru.uniplanner.backend.service` | Бизнес-сценарии и транзакции, не знает о HTTP/Presentation |
| **E** Entity | `@Entity` (JPA) | `ru.uniplanner.backend.entity` | Бизнес-методы и инварианты (см. [01-requirements/domain-model.md](../01-requirements/domain-model.md)), не содержит SQL |
| **F** Foundation | Spring Data репозитории + `WebClient` к парсеру | `ru.uniplanner.backend.repository`, `ru.uniplanner.backend.foundation` | Доступ к данным/HTTP, без бизнес-правил |

Зависимости строго сверху вниз: `Control → IXxxService → (Entity ∪ IXxxRepository)`, без циклов. Межслойная коммуникация — через интерфейсы (`IUserService`, `ITaskRepository` и т.п.), реализации скрыты за интерфейсом.

## Текущий статус реализации

- ✅ **Entity**: `UserEntity`, `TaskEntity`, `NoteEntity`, `CachedLessonEntity`, `UniversityCredentialEntity` — с бизнес-методами и инвариантами.
- ✅ **Foundation (репозитории)**: `IUserRepository`, `ITaskRepository`, `INoteRepository`, `ICachedLessonRepository`, `IUniversityCredentialRepository`; `ParserClient`/`UniversityAuthClient` (`WebClient`) — вызовы микросервиса-парсера.
- ✅ **Mediator (сервисы)**: `AuthServiceImpl`, `TaskServiceImpl`, `NoteServiceImpl`, `ScheduleServiceImpl`, `ParserSyncServiceImpl`, `UniversityAuthServiceImpl`.
- ✅ **Control (контроллеры)**: `AuthController`, `TaskController`, `NoteController`, `ScheduleController`, `ParserSyncController`, `UniversityAuthController` — 18 эндпоинтов, см. [04-detailed-design/api-design.md](../04-detailed-design/api-design.md).
- ✅ **Security**: `JwtService`, `JwtAuthFilter`, `SecurityUtils.currentUserId()`, роли `ROLE_USER`/`ROLE_ADMIN`/`ROLE_MANAGER`.
- ✅ **Сквозная обработка ошибок**: `GlobalExceptionHandler` (`@RestControllerAdvice`) транслирует `NotFoundException`/`ConflictException`/`UnauthorizedException`/ошибки валидации в `ru.uniplanner.shared.ErrorResponse`.
- ⏳ Не реализовано (осознанно, см. [10-final-report/summary.md](../10-final-report/summary.md)): админ-панель управления расписанием, cron для `POST /parser/sync`.

## Принятые сокращения (для прозрачности на защите)

- Парсер не подключён напрямую к схеме PCMEF backend — это сознательное отступление от «1:1» применения паттерна, обусловленное наличием отдельного микросервиса (см. вводные проекта).
- Mapper-классы (Entity ↔ shared DTO) формально относятся к Foundation как техническая трансляция данных, не бизнес-правило.
