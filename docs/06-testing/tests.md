# Тестирование

## Стратегия

Тестируется слой Mediator (Service) — основная бизнес-логика. Контроллеры (Control) и Foundation (репозитории, HTTP-клиенты к парсеру) не покрыты юнит-тестами — осознанное решение в пользу скорости разработки одного разработчика в срок; обоснование зафиксировано в [05-implementation/code-structure.md](../05-implementation/code-structure.md).

## Тестовые классы

| Класс | Покрывает | Инструменты |
|---|---|---|
| `AuthServiceImplTest` | Регистрация, вход, получение текущего пользователя | MockK (репозитории, `PasswordEncoder`, `JwtService`) |
| `TaskServiceImplTest` | CRUD задач, фильтр по `lessonId`, инвариант `priority ∈ [1,5]` | MockK |
| `NoteServiceImplTest` | CRUD заметок, фильтр по `lessonId` | MockK |
| `ScheduleServiceImplTest` | Чтение расписания и списка групп из кэша | MockK |
| `ParserSyncServiceImplTest` | Синхронизация кэша с данными парсера | MockK (`ParserClient`) |
| `UniversityAuthServiceImplTest` | Капча-флоу личного входа в ИС вуза, привязка/отвязка | MockK |
| `UniversitySessionCryptoTest` | Шифрование/расшифровка сессии (AES-GCM) | JUnit5, без моков |
| `BackendApplicationTests` | Поднятие Spring-контекста целиком (`contextLoads()`) | требует живую PostgreSQL |

Все сервисные тесты используют MockK для репозиториев/клиентов — без поднятия Spring-контекста, что делает прогон быстрым (секунды, не десятки секунд).

## Запуск

```bash
./gradlew :backend:test
```

32 теста, 31 проходит. `BackendApplicationTests.contextLoads()` ожидаемо падает при запуске без живой PostgreSQL (Gradle-процесс не имеет доступа к контейнеру БД) — это не регрессия, а особенность изоляции тестового окружения; при наличии БД (`docker compose up -d postgres-backend`) тест проходит.

## Покрытие

JaCoCo подключён в `backend/build.gradle.kts`. Отчёт — `backend/build/reports/jacoco/test/html/index.html` после `./gradlew :backend:test`.

## Живая проверка (вне юнит-тестов)

Сквозная проверка через реальный HTTP (Docker Compose + PostgreSQL с реальными данными парсера) выявила баг, не пойманный юнит-тестами сервисного слоя — рассинхрон версий `kotlinx-serialization` (детали и исправление — [05-implementation/code-structure.md](../05-implementation/code-structure.md)). Это подтверждает осознанность решения не пропускать сквозную проверку перед защитой, даже при наличии юнит-тестов.
