# Архитектура: PCMEF в Ecampus UniPlanner

Проект состоит из двух процессов: backend-монолит (Spring Boot, Kotlin) и микросервис-парсер (FastAPI, Python). PCMEF применяется к backend-монолиту целиком; парсер — внешняя инфраструктурная зависимость, вызываемая из слоя Foundation, и в PCMEF backend не входит (обоснование — `docs/03-architecture/microservices.md`).

## Трактовка слоёв

| Слой | Реализация | Пакет/расположение | Ограничение |
|---|---|---|---|
| **P** Presentation | React-приложение | `web/` (отдельный процесс) | Не содержит бизнес-логики, только рендер и вызовы API |
| **C** Control | `@RestController` | `ru.uniplanner.backend.controller` | Валидация входа (`@Valid`), вызывает только `IXxxService`, не обращается к репозиториям/БД напрямую |
| **M** Mediator | `@Service` | `ru.uniplanner.backend.service` | Бизнес-сценарии и транзакции, не знает о HTTP/Presentation |
| **E** Entity | `@Entity` (JPA) | `ru.uniplanner.backend.entity` | Бизнес-методы и инварианты (см. `domain-model.md`), не содержит SQL |
| **F** Foundation | Spring Data репозитории + `WebClient` к парсеру | `ru.uniplanner.backend.repository`, `ru.uniplanner.backend.foundation` | Доступ к данным/HTTP, без бизнес-правил |

Зависимости строго сверху вниз: `Control → IXxxService → (Entity ∪ IXxxRepository)`, без циклов. Межслойная коммуникация — через интерфейсы (`IUserService`, `ITaskRepository` и т.п.), реализации скрыты за интерфейсом.

## Текущий статус реализации (каркас)

- ✅ **Entity**: `UserEntity`, `TaskEntity`, `NoteEntity`, `CachedLessonEntity` — с бизнес-методами.
- ✅ **Foundation (репозитории)**: `IUserRepository`, `ITaskRepository`, `INoteRepository`, `ICachedLessonRepository`.
- ✅ **Сквозная обработка ошибок**: `GlobalExceptionHandler` (`@RestControllerAdvice`) транслирует `NotFoundException`/`ConflictException`/`UnauthorizedException`/ошибки валидации в `ru.uniplanner.shared.ErrorResponse`.
- ⏳ **Mediator (сервисы)**, **Control (контроллеры)**, **Security (JWT)**, **Foundation.ParserClient** — следующий этап (вертикальный срез Auth).

## Принятые сокращения (для прозрачности на защите)

- Парсер не подключён напрямую к схеме PCMEF backend — это сознательное отступление от «1:1» применения паттерна, обусловленное наличием отдельного микросервиса (см. вводные проекта).
- Mapper-классы (Entity ↔ shared DTO) формально относятся к Foundation как техническая трансляция данных, не бизнес-правило.
