# Диаграммы последовательности

## 1. Login flow

```mermaid
sequenceDiagram
    participant P as React (Presentation)
    participant C as AuthController (Control)
    participant M as AuthServiceImpl (Mediator)
    participant F as IUserRepository (Foundation)
    participant DB as PostgreSQL

    P->>C: POST /auth/login {email, password}
    C->>C: ModelValidators.validateLoginRequest()
    C->>M: login(request)
    M->>F: findByEmail(email)
    F->>DB: SELECT * FROM users WHERE email = ?
    DB-->>F: UserEntity
    F-->>M: UserEntity
    M->>M: passwordEncoder.matches()
    M->>M: jwtService.generateToken()
    M-->>C: LoginResponse{token, user}
    C-->>P: 200 OK
```

## 2. Создание задачи

```mermaid
sequenceDiagram
    participant P as React (Presentation)
    participant C as TaskController (Control)
    participant M as TaskServiceImpl (Mediator)
    participant E as TaskEntity (Entity)
    participant F as ITaskRepository (Foundation)

    P->>C: POST /tasks {title, deadline, priority}
    C->>C: ModelValidators.validateTaskInput()
    C->>M: create(userId, input)
    M->>E: TaskMapper.toEntity(input, userId)
    E->>E: init { require(priority in 1..5) }
    M->>F: save(entity)
    F-->>M: persisted TaskEntity
    M-->>C: Task DTO
    C-->>P: 201 Created
```

## 3. Расписание (чтение из кэша backend'а)

```mermaid
sequenceDiagram
    participant P as React (SchedulePage)
    participant C as ScheduleController
    participant M as ScheduleServiceImpl
    participant F as ICachedLessonRepository

    P->>C: GET /schedule?group=ИВТ-21-1&from=&to=
    C->>M: getLessons(group, from, to)
    M->>F: findByGroupNameAndLessonDateBetween()
    F-->>M: List<CachedLessonEntity>
    M-->>C: List<Lesson> DTO
    C-->>P: 200 OK
```

## 4. Синхронизация расписания с парсером (UC-07)

```mermaid
sequenceDiagram
    participant Mgr as Менеджер группы
    participant C as ParserSyncController
    participant M as ParserSyncServiceImpl
    participant Cl as ParserClient (Foundation)
    participant Parser as Parser-микросервис (FastAPI)
    participant F as ICachedLessonRepository

    Mgr->>C: POST /parser/sync?group=ИВТ-б-о-23-1
    C->>M: syncGroupSchedule(group, from, to)
    M->>Cl: fetchLessons(group, from, to)
    Cl->>Parser: GET /lessons?group=&from=&to=
    Parser-->>Cl: распарсенные занятия (реальные данные вуза)
    Cl-->>M: List<ParsedLesson>
    M->>F: save/update CachedLessonEntity (по занятию)
    F-->>M: сохранено
    M-->>C: { group, syncedLessons }
    C-->>Mgr: 200 OK
```

## 5. Привязка задачи к занятию (UC-06)

```mermaid
sequenceDiagram
    participant P as React (LessonDetailSheet)
    participant C as TaskController
    participant M as TaskServiceImpl
    participant F as ITaskRepository

    P->>C: POST /tasks {title, deadline, priority, relatedLessonId}
    C->>M: create(userId, input)
    M->>F: save(TaskMapper.toEntity(input, userId))
    F-->>M: persisted TaskEntity (lesson_id заполнен)
    M-->>C: Task DTO
    C-->>P: 201 Created
    P->>C: GET /tasks?lessonId={id}
    C->>M: listForLesson(userId, lessonId)
    M->>F: findByUserIdAndLessonId(userId, lessonId)
    F-->>M: List<TaskEntity>
    M-->>C: List<Task> DTO
    C-->>P: 200 OK
```
