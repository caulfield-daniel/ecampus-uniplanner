---
session: ses_042b
updated: 2026-08-03T21:16:09.959Z
---

# Session Summary

## Goal
Довести до идеала архитектурный фундамент проекта ecampus-uniplanner: зафиксировать KMP `shared` как единый источник истины моделей/типов/контрактов для всех клиентов, заменив хрупкий Kotlin/JS `.d.mts`-мост в web на генерацию структурных TS-типов через JSON Schema (descriptor → JSON Schema → TS), и проверить фактами, что план фундамента действительно исполнен.

## Constraints & Preferences
- KMP `shared` — единственный источник истины; никаких ручных TS-дублей моделей в web (правки — только в `shared/ApiModels.kt`, затем `./gradlew :shared:generateJsonSchemas` + `npm run generate:types`)
- Kotlin-потребители (backend JVM, будущий android) потребляют shared нативно; web — единственный не-Kotlin потребитель
- Parser — независимый микросервис ВНЕ KMP-контура; `api/parser-api.yaml` остаётся рукописным
- FSD-слои (entities/features/widgets/pages), public API-barrel'ы, `@/shared/types` alias сохранён
- Web ходит только в backend (`:8080/api/v1`); парсер (`:8000`) — внутренний сервис
- UI-тексты на русском; shadcn/ui; TanStack Query; sonner toasts
- Пароль ИС никогда не хранится на web
- Сгенерированные артефакты коммитятся в git (`api/schemas/*.json`, `web/src/shared/types/generated/*.d.ts`); `shared.mjs`/`.d.mts` удалены, JS-таргет убран

## Progress
### Done
- [x] Полный FSD-рефакторинг web (7 фаз, 9 коммитов от `bd1cd80` до `25cb8db`): 85/85 тестов, build/lint/tsc зелёные, 0 импортов из нижних слоёв в верхние, удалён единственный useEffect (AuthProvider→UserProvider+useSyncExternalStore)
- [x] Брейншторм по фичам/багам + дизайн университетской синхронизации: `thoughts/shared/designs/2026-08-03-university-sync-design.md` (закоммичен)
- [x] Аудит: backend (скомпилированный Spring Boot) уже содержит контур `/university-auth/captcha|login|status|link` + шифрованные cookies; у парсера этих эндпоинтов нет — разрыв контрактов (задокументировано в дизайне)
- [x] Дизайн переработан в KMP-first (пользователь указал: «зеркалить» = нарушение принципа) — типы приезжают через JSON Schema, не TS-дублями
- [x] `ARCHITECTURE.md` обновлён: добавлен раздел **Design Principles** (KMP — источник истины, api/*.yaml — производный контракт), исправлены устаревшие факты (backend=Spring Boot без исходников, AuthProvider→providers/, структура web/src/shared/), переработана Data Flow-диаграмма, Known Gaps перечисляют весь тулчейн-долг
- [x] Создан план: `thoughts/shared/plans/2026-08-03-kmp-foundation-plan.md` (закоммичен, статус `validated`, исполнялся в «этой сессии»)
- [x] **Верификация фактов — установлено, что план уже ИСПОЛНЕН в этой же сессии** (судя по состоянию репо):
  - `shared/build.gradle.kts`: JS-таргет удалён; есть `generateJsonSchemas` (JavaExec, `:generate` task)
  - Корневой `build.gradle.kts`: `generateSchemas`/`buildAll`/`cleanAll`/`showTasks` в группе "ecampus"; `buildAll` = `:shared:build`
  - `web/package.json`: скрипт `generate:types` + зависимость `json-schema-to-typescript ^15.0.4`
  - `web/scripts/generate-types.mjs` существует
  - `api/openapi.yaml`: **openapi: 3.1.0**, уже содержит `/university-auth/captcha|login|status|link` и `/parser/lessons` + `ParserSyncResponse`
  - `api/schemas/*.json`: **23 файла закоммичены** (Task/Note/NoteInput содержат `relatedLessonId`; есть ParserSyncResponse, UniversityLoginRequest.json и т.д.)
  - `web/src/shared/types/generated/*.d.ts`: **24 файла закоммичены** (LoginRequest/LoginResponse/RegisterRequest/UniversityLoginRequest/ParserSyncResponse...)
  - `web/src/shared/types/index.ts`: **переписан** — re-export из `./generated` (структурные TS-типы), комментарий «ручные правки запрещены», `@shared/kmp`-мост мёртв (grep: 0 вхождений `@shared/kmp`; `TaskInputDto`/`NoteInputDto` — только в комментарии теста `NoteForm.test.tsx:1,53`)
  - `web/vite.config.ts`: alias `@shared` удалён (осталось только 1 вхождение `alias:`)
  - `.gitignore`: исключение для `kmp/` удалено (grep: «NO kmp in .gitignore»); `git status` чистый
  - README.md, CODE_STYLE.md: обновлены под новый тулчейн (команды `:shared:generateJsonSchemas` + `npm run generate:types`, запрет ручных правок generated/)
  - `@JsExport` полностью удалён из ApiModels.kt (grep: 0 вхождений); добавлены `ParserSyncResponse`, `CaptchaChallengeResponse`, `UniversityLoginRequest`, `UniversityLinkStatus`
  - `shared/src/commonTest/`: `OpenApiValidationTest.kt` **УДАЛЁН** (ENOENT), заменён на `JsonSchemaGeneratorTest.kt` + остался `ModelValidatorsTest.kt`
- [x] Оба коммита выполнены: `docs: KMP as single source of truth + foundation plan`, `docs(design): KMP-first typing for university sync (no TS mirrors)`

### In Progress
- [ ] Завершение верификации плана фактами — последний невыполненный пункт: **CI-workflow (.github/workflows/) отсутствует (`glob` вернул "No files found")** — в плане Этап 7 требует GitHub Actions с регенерацией + `git diff --exit-code`, но его нет в репозитории

### Blocked
- (none)

## Key Decisions
- **Кастомный генератор JSON Schema на `serializer().descriptor`** (в `shared/.../schema/JsonSchemaGenerator.kt`), а не Kotlin/JS `.d.mts`: `.d.mts` генерирует классы (не структурные TS-интерфейсы) — из-за этого требовались ручные `TaskInputDto`/`NoteInputDto`; тулчейн нестабилен (терял `relatedLessonId`), и `@JsExport` забывался вручную. JSON Schema даёт структурные интерфейсы, работает без Gradle на машине web-разработчика, коммитится в git
- **JS-таргет и `shared.mjs`/`.d.mts` удалены**: рантайм Kotlin в браузере не использовался (только `import type`); чистый балласт. Если когда-нибудь понадобится Kotlin-логика в браузере — вернуть js-таргет осознанно
- **Сгенерированные артефакты коммитятся в git**: `api/schemas/*.json` (да), `web/src/shared/types/generated/*.d.ts` (да) — свежий clone работает без прогона Gradle
- **OpenAPI 3.1.0** (валидны `type: ["T","null"]` и `anyOf`); paths ручные, `components.schemas` — внешний `$ref` на `api/schemas/*.json`
- **Parser вне KMP-контура**: без генерации Pydantic; `parser-api.yaml` рукописный (этап 5 исходного плана отменён)
- **ajv-валидация в web отложена** (итерация «типы-only»); валидаторы остаются в KMP для JVM-потребителей
- **Guard рассинхрона**: CI-регенерация + `git diff --exit-code` вместо удалённого `OpenApiValidationTest`
- **Open Questions дизайна university-sync** (автоопределение группы, личное vs публичное расписание, задачи из расписания) — дефолты из дизайна: ручной выбор группы для v1, синхронизация по группе, задачи из расписания — отдельной фичей (пользователь не возразил)

## Next Steps
1. **Завершить верификацию плана (текущая задача)**: составить итоговый отчёт «план исполнен» по фактам; единственный невыполненный пункт — **Этап 7, CI-workflow**: `.github/workflows/` отсутствует (нужно создать workflow с `./gradlew :shared:generateJsonSchemas` + `npm run generate:types` + `git diff --exit-code`)
2. Проверить `shared/build.gradle.kts` на точное содержание `JsonSchemaGenerator` (видел только 1 строку: `val generateJsonSchemas by tasks.registering(JavaEx...`) — фрагмент обрезан при компакции контекста
3. Если CI нужен — создать workflow (это единственный пункт DoD, который явно не закрыт); если решение «CI позже» — обновить план/DoD и явно закрыть верификацию
4. После верификации — вернуться к реализации web-части university-sync (этап B дизайна `2026-08-03-university-sync-design.md`): типы уже в shared/generated, т.е. `entities/university` → `features/university/*` → `widgets/university` → `pages/university` → роутер `/university` + sidebar
5. Доработка парсера (этап A): `/auth/captcha`, `/auth/login`, `/parser/lessons`, `/parser/groups` — отдельная работа; и вычистить `cookies.json` из git (проблема безопасности, зафиксирована в дизайне)

## Critical Context
- **Ключевое открытие**: план KMP-фундамента фактически уже исполнен в этой сессии (вероятно, параллельной/последующей сессией) — репозиторий чист, артефакты на месте, все решения плана отражены в коде. Пользователь попросил «перечитать план и проверить, что предлагалось проверить на фактах» — верификация почти завершена, осталось CI
- Backend — скомпилированные классы Spring Boot, исходников нет; README называет его Ktor (расхождение зафиксировано в ARCHITECTURE.md)
- `UniversityLoginRequest` был без `@JsExport` (теперь неактуально — @JsExport удалён целиком); `ParserSyncResponse { syncedLessons }` создан
- Проблема безопасности: `parser/cookies.json` закоммичен в git (живая сессия ecampus.ncfu.ru) — не вычищена
- Алиас `@shared` в vite.config удалён — web импортирует через `@/shared/types` (перейдя на `./generated`)
- Тест `NoteForm.test.tsx` содержит упоминание `NoteInputDto` только в тексте/комментариях, не в коде — дублей типов в web нет
- `gradlew :shared:generateJsonSchemas` + `npm run generate:types` — команды генерации (README.md, CODE_STYLE.md обновлены)
- Дизайн university-sync: `api/openapi.yaml` уже содержит `/university-auth/*` и `/parser/lessons` — контракт готов, ждёт реализации в парсере и web

## File Operations
### Read
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\ARCHITECTURE.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\plans\2026-08-03-kmp-foundation-plan.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\shared\types\index.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\build.gradle.kts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\build.gradle.kts` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\package.json` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\vite.config.ts` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonMain\kotlin\ru\uniplanner\shared\ApiModels.kt` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonMain\kotlin\ru\uniplanner\shared\ModelValidators.kt` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonMain\kotlin\ru\uniplanner\shared\ApiConstants.kt` (частично)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonMain\kotlin\ru\uniplanner\shared\schema\JsonSchemaGenerator.kt` (фрагмент)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\README.md` (фрагмент)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\CODE_STYLE.md` (фрагмент)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\openapi.yaml` (фрагмент)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\backend-api.yaml` (фрагмент)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\features\note\note-form\NoteForm.test.tsx` (grep)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\.gitignore` (grep)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\gradlew` (grep)

### Modified
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\ARCHITECTURE.md` (Design Principles, актуализация фактов, Data Flow, Known Gaps)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\designs\2026-08-03-university-sync-design.md` (KMP-first: убран «зеркалить», добавлен этап 0 + constraint, список компонентов)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\plans\2026-08-03-kmp-foundation-plan.md` (создан)

### Commits
- `docs(design): university IS sync feature design`
- `docs(design): KMP-first typing for university sync (no TS mirrors)`
- `docs: KMP as single source of truth + foundation plan`
