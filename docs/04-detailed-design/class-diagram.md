# Диаграмма классов (слой Entity)

```mermaid
classDiagram
    class UserEntity {
        +UUID id
        +String email
        +String passwordHash
        +String fullName
        +String groupName
        +String role
        +hasRole(role) Boolean
        +isAdmin() Boolean
    }
    class TaskEntity {
        +Long id
        +UUID userId
        +String title
        +String description
        +OffsetDateTime deadline
        +Int priority
        +Boolean completed
        +Long lessonId
        +markCompleted()
        +isOverdue(now) Boolean
        +reschedule(newDeadline)
    }
    class NoteEntity {
        +Long id
        +UUID userId
        +String title
        +String content
        +Long lessonId
    }
    class CachedLessonEntity {
        +Long id
        +String groupName
        +LocalDate lessonDate
        +String discipline
        +LocalTime timeStart
        +LocalTime timeEnd
    }
    class UniversityCredentialEntity {
        +UUID id
        +UUID userId
        +String encryptedSessionBlob
        +Boolean isValid
    }

    UserEntity "1" --> "many" TaskEntity : userId
    UserEntity "1" --> "many" NoteEntity : userId
    UserEntity "1" --> "0..1" UniversityCredentialEntity : userId
    CachedLessonEntity "0..1" --> "many" TaskEntity : lessonId
    CachedLessonEntity "0..1" --> "many" NoteEntity : lessonId
```

`TaskEntity.priority` ограничен инвариантом `init { require(priority in 1..5) }` — бизнес-правило хранится в Entity, не в Control/Mediator (соответствует не-анемичной модели PCMEF).

## Интерфейсы слоя Mediator (контракты сервисов)

| Интерфейс | Реализация | Ключевые методы |
|---|---|---|
| `IAuthService` | `AuthServiceImpl` | `register()`, `login()`, `getCurrentUser()` |
| `ITaskService` | `TaskServiceImpl` | `list(userId, lessonId?)`, `create()`, `update()`, `delete()` |
| `INoteService` | `NoteServiceImpl` | `list(userId, lessonId?)`, `create()`, `update()`, `delete()` |
| `IScheduleService` | `ScheduleServiceImpl` | `getLessons(group, from, to)`, `listGroups()` |
| `IParserSyncService` | `ParserSyncServiceImpl` | `syncGroupSchedule(group, from, to)` |
| `IUniversityAuthService` | `UniversityAuthServiceImpl` | `startCaptchaChallenge()`, `completeLogin()`, `getLinkStatus()`, `unlink()` |
