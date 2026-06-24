# Реализация: структура кода

## Пакеты backend (`ru.uniplanner.backend`)

| Пакет | Слой PCMEF | Содержимое |
|---|---|---|
| `entity` | Entity | `UserEntity`, `TaskEntity`, `NoteEntity`, `CachedLessonEntity`, бизнес-методы |
| `repository` | Foundation | `IUserRepository`, `ITaskRepository`, `INoteRepository`, `ICachedLessonRepository` |
| `service` | Mediator | `IAuthService`/`AuthServiceImpl`, `ITaskService`/`TaskServiceImpl`, `INoteService`/`NoteServiceImpl`, `IScheduleService`/`ScheduleServiceImpl`, `IParserSyncService`/`ParserSyncServiceImpl`, `IUniversityAuthService`/`UniversityAuthServiceImpl` |
| `controller` | Control | `AuthController`, `TaskController`, `NoteController`, `ScheduleController`, `ParserSyncController`, `UniversityAuthController` |
| `mapper` | Foundation (техническая трансляция) | `UserMapper`, `TaskMapper`, `NoteMapper`, `LessonMapper` |
| `foundation` | Foundation | `ParserClient`, `UniversityAuthClient` (`WebClient` к микросервису-парсеру) |
| `security` | сквозной | `JwtService`, `JwtAuthFilter`, `SecurityUtils.currentUserId()`, `UniversitySessionCrypto` (AES-GCM) |
| `config` | Foundation/инфраструктура | `SecurityConfig`, `CorsConfig` |
| `exception` | сквозной | `NotFoundException`, `ConflictException`, `UnauthorizedException`, `GlobalExceptionHandler` |

## Решения по тестам

- Тестируется только Mediator (Service): `AuthServiceImplTest`, `TaskServiceImplTest`, `NoteServiceImplTest`, `ScheduleServiceImplTest` — MockK на репозиториях, без поднятия Spring-контекста (быстро).
- Контроллеры и Foundation (парсер) не покрыты юнит-тестами ради скорости — осознанное решение, зафиксированное здесь.
- JaCoCo подключен (`backend/build.gradle.kts`), отчёт — `backend/build/reports/jacoco/test/html/index.html` после `./gradlew :backend:test`.

## Заметки по интеграции shared-модуля

- DTO для запросов (`RegisterRequest`, `LoginRequest`, `TaskInput`, `NoteInput`) не имеют `jakarta.validation`-аннотаций — это сломало бы KMP/JS-совместимость. Вместо этого валидация вызывается явно в Control-слое через `ru.uniplanner.shared.ModelValidators` (одна логика валидации работает на backend и потенциально на клиентах).
- На фронте `RegisterRequest`/`LoginRequest`/`LoginResponse` НЕ импортируются из shared (не экспортированы в JS намеренно) — объявлены как локальные TS-интерфейсы в `web/src/app/providers/AuthProvider.tsx`. Аналогично `TaskInput`/`NoteInput` тела запросов представлены локальными `TaskInputDto`/`NoteInputDto` в `web/src/entities/{task,note}/api/*.ts`, т.к. Kotlin/JS-экспорт генерирует классы с методами (`copy`/`equals`/`hashCode`), которые не проходят структурную проверку TS для литералов объектов.
- Мост `web/src/shared/kmp/index.ts` был исправлен: актуальный Kotlin/JS-экспорт — плоский (без вложенного namespace `ru.uniplanner.shared`), старая версия моста ссылалась на несуществующий путь `KmpTypes.ru.uniplanner.shared.*`.
- **Известная нестабильность тулчейна**: на машине разработки несколько раз генерация публичного `.d.mts` из Kotlin/JS (`:shared:jsBrowserDevelopmentLibraryDistribution`) не подхватывала свежие изменения `ApiModels.kt` даже после полной чистки `build/`-директорий (компилировался корректный IR, но `.d.mts` не обновлялся). При добавлении `relatedLessonId` в `Task`/`Note` решено не тратить время на диагностику Kotlin/JS Gradle-плагина — тип расширен локально через intersection-type в `web/src/shared/types/index.ts` (`KmpTask & { relatedLessonId?: number }`). Если генерация починится сама (новая версия плагина/чистая машина), эту аугментацию можно убрать.
- `GET /tasks` и `GET /notes` принимают необязательный `?lessonId=` (тот же роут, не новый эндпоинт) — фильтрует по `ITaskRepository.findByUserIdAndLessonId`/аналогично для заметок. Используется `LessonDetailSheet`-виджетом и фильтром на страницах «Задачи»/«Заметки» на фронте.

## Найденный и исправленный баг: рассинхрон версий kotlinx-serialization

При первой живой проверке через Docker (после поднятия реальной БД) `POST /auth/login` падал с `500` (`AbstractMethodError: GeneratedSerializer.typeParametersSerializers`). Причина: плагин `org.springframework.boot:spring-dependency-management` подключает собственный `kotlinx-serialization-bom`, которым **понижает** версию `kotlinx-serialization-core`/`-json` (с заявленной в каталоге `1.8.1` до `1.6.3`) — даже при наличии явного `implementation(libs.kotlinx.serialization.json)` в `backend/build.gradle.kts`. Сериализаторы (`$$serializer`), сгенерированные компилятором Kotlin 2.3.0 в shared-модуле, вызывают метод интерфейса `GeneratedSerializer`, появившийся позже версии 1.6.3 — рассинхрон версий компилятора и runtime-библиотеки.

Контроллеры не покрыты юнит-тестами (см. «Решения по тестам» выше) — баг не всплывал в `./gradlew :backend:test`, так как тесты сервисного слоя не проходят через HTTP message converter. Обнаружен только при сквозной проверке через реальный HTTP-запрос.

**Исправление:** в `backend/build.gradle.kts` добавлен явный блок `dependencyManagement { dependencies { dependency(...) } }`, переопределяющий версию для `kotlinx-serialization-core`/`-core-jvm`/`-json`/`-json-jvm` до версии из каталога (`1.8.1`) — это единственный механизм, который имеет приоритет выше Spring-овского BOM.

## Найденный и исправленный баг: повторный `POST /parser/sync` падал без `@Transactional`

При массовой синхронизации кэша расписания для всех 866 групп, известных парсеру, 4 группы из них (уже синхронизированные ранее в этой же сессии) стабильно падали с `500` (`InvalidDataAccessApiUsageException: No EntityManager with actual transaction available for current thread — cannot reliably process 'remove' call`), тогда как 862 группы, синхронизируемые впервые, проходили без ошибок.

Причина: `ParserSyncServiceImpl.syncGroupSchedule` вызывал производный delete-запрос Spring Data (`ICachedLessonRepository.deleteByGroupNameAndLessonDateBetween`) без `@Transactional` на методе сервиса. Такие производные delete-запросы Hibernate выполняет не bulk-`UPDATE`/`DELETE`, а построчно через `entityManager.remove()` — для этого обязательна активная транзакция. При первой синхронизации группы под этим диапазоном дат ничего не находилось для удаления, `remove()` не вызывался, и отсутствие транзакции не проявлялось — баг маскировался для большинства групп и проявлялся только при повторном sync уже существующих данных, то есть в самом обычном, ожидаемом сценарии использования эндпоинта.

**Исправление:** `@Transactional` добавлен непосредственно на `syncGroupSchedule`. Подтверждено повторным прогоном: все 866 групп, включая 4 ранее упавшие, синхронизировались без ошибок (`parser/bulk_sync.py`).
