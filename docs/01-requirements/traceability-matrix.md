# Матрица трассировки: требования → UC → реализация

| Требование методички (трактория Б) | UC | Реализация |
|---|---|---|
| Аутентификация и авторизация | UC-01, UC-02 | `AuthController`, `JwtService`, `JwtAuthFilter` |
| Web UI 5+ страниц | UC-02..UC-06 | `web/src/pages/{LoginPage,TodayPage,SchedulePage,TasksPage,NotesPage}.tsx` |
| REST API ≥8 эндпоинтов | все UC | 18 эндпоинтов, см. [04-detailed-design/api-design.md](../04-detailed-design/api-design.md) |
| Модульное тестирование | UC-01..UC-07 (сервисный слой) | `backend/src/test/kotlin/.../service/*Test.kt` |
| Работа с внешним источником данных (бонус) | UC-07 | `ParserClient` (Foundation) ↔ микросервис-парсер |
| Ролевая модель | UC-07 (Manager), UC-01..UC-09 (User) | `UserEntity.role`, `ROLE_USER`/`ROLE_MANAGER`/`ROLE_ADMIN` |

## Бизнес-требования → use cases

| Бизнес-требование | UC |
|---|---|
| Студент должен видеть расписание без ручного ввода | UC-03, UC-07 |
| Студент должен вести задачи и заметки, привязанные к учебному процессу | UC-04, UC-05, UC-06 |
| Студент может использовать свой личный аккаунт ИС вуза для более точных данных | UC-08, UC-09 |
| Данные парсера должны обновляться без участия разработчика | UC-07 |
