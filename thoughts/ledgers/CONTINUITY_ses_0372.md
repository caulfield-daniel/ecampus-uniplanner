---
session: ses_0372
updated: 2026-08-03T19:40:20.968Z
---

# Session Summary

## Goal
Довести до конца `thoughts/shared/plans/2026-08-03-kmp-foundation-plan.md`: сделать KMP `shared` единым источником истины моделей/DTO/контрактов для backend и всех клиентов, с надёжным мостом KMP→web (JSON Schema → TS-типы), и подтвердить это зелёными сборками + CI-guard'ом.

## Constraints & Preferences
- **Parser — независимый микросервис, ВНЕ KMP-контура** (решение пользователя): никакой генерации Pydantic; `api/parser-api.yaml` остаётся его рукописным контрактом; этап «Pydantic-генерация» исходного плана отменён
- Генератор JSON Schema — **кастомный, на `serializer().descriptor`** (kotlinx.serialization, ноль новых зависимостей)
- OpenAPI: paths рукописные, `components.schemas` → внешний `$ref: './schemas/<Name>.json'`; мастер-спека бампается до **openapi 3.1.0** (валидны `type: ["T","null"]`)
- Сгенерированные артефакты **коммитятся в git**: `api/schemas/*.json` и `web/src/shared/types/generated/*.d.ts`
- **JS-таргет Kotlin удаляется целиком** (web не использует рантайм `shared.mjs` — только декларации)
- ajv-валидация в web — отложена (эта итерация типы-only); валидаторы остаются в KMP для JVM
- Путь-баррел `@/shared/types` должен сохраниться (миграция импортов web не должна трогать ~27 модулей)
- Отвечать на русском

## Progress
### Done
- [x] Исследование индустрии (внешние кейсы KMP как источника бизнес-истины) и оценка архитектуры в проекте — ответ пользователю дан
- [x] Детальный аудит проекта: прочитаны все ключевые файлы (см. File Operations), выполнены grep-проверки потребления типов в web
- [x] Ключевое архитектурное решение: **удаление `js(IR)`-таргета** из `shared` + генерация `api/schemas/*.json` кастомным генератором + `json-schema-to-typescript` в web
- [x] Финальный план записан в `thoughts/shared/plans/2026-08-03-kmp-foundation-plan.md`, `status: draft → validated`, `execution_session: эта сессия`; содержит 5 этапов, DoD, «вне скоупа», таблицу рисков

### In Progress
- [ ] Этап 1 плана помечен выполненным (`[x]` — спайк-подтверждение: обход `serializer().descriptor` покрывает nullable, default-значения, вложенность, списки; вывод `json-schema-to-typescript` проверен на наших моделях). Код генератора ещё не написан — Этап 2 не начат

### Blocked
- (none) — внешний поиск `mcp.exa.ai/mcp` стабильно отдавал 403, но обойдён через DuckDuckGo HTML (`html.duckduckgo.com/html/?q=...`); `r.jina.ai` → 451, medium.com → timeout. Для продолжения работы не критично

## Key Decisions
- **Удалить `js(IR)`-таргет из `shared`**: web импортирует только `import type` из `.d.mts`, рантайм `shared.mjs` — мёртвый код; удаление JS-таргета + `@JsExport` + копи-тасок убивает 6 из 7 проблем тулчейна одним ударом
- **Кастомный генератор на `serializer().descriptor`**: нативный механизм (вместо сторонних библиотек; Kompendium отклонён — завязан на Ktor, оверкилл)
- **OpenAPI: рукописные paths + внешние `$ref` на сгенерированные схемы**, бамп до 3.1.0 (пути остаются ручными, схемы — производные)
- **Коммитить генерируемое** (`api/schemas/`, `web/src/shared/types/generated/`) + CI-guard `git diff --exit-code` — иначе дрейф неизбежен
- **Parser исключён из конвейера** — по прямому указанию пользователя
- **ajv отложен** — в это итерация только типы
- **`OpenApiValidationTest` → `JsonSchemaGeneratorTest`** с golden-снимками: старый тест YAML вообще не читал (проверял ModelValidators на хардкоде) — guard'ом не был
- **Добавить `ParserSyncResponse` в shared** (по дизайну university-sync) — заодно проверит конвейер на новой модели; итого 22 схемы (21 + 1)

## Next Steps
По этапам плана (порядок важен):
1. **Этап 2.1** — `shared/src/commonMain/kotlin/ru/uniplanner/shared/schema/JsonSchemaGenerator.kt`: чистый обход дескриптора → JSON-строка без IO (класс → `type: object` + `properties` + `required` + `title` = короткое имя; nullable → `["T","null"]`; список → `array/items`; enum → `enum`; вложенные классы → инлайн без `$defs` и без `title`)
2. **Этап 2.2** — `shared/src/jvmMain/kotlin/ru/uniplanner/shared/schema/GenerateJsonSchemasMain.kt`: `main(args)` с выходной директорией, pretty-print, стабильный порядок ключей
3. **Этап 2.3** — `shared/build.gradle.kts`: удалить `js(IR)`, opt-in `ExperimentalJsExport`, `buildJsDev/Prod`, `copyJsToWebDev/Prod`, `cleanWebKmp`, `rebuildJs*`; добавить таск `generateJsonSchemas` (JavaExec, класс `...GenerateJsonSchemasMainKt`, аргумент `api/schemas`)
4. **Этап 2.4** — удалить `@JsExport` из всех моделей; добавить `ParserSyncResponse` (поля согласовать с `2026-08-03-university-sync-design.md`: `group`, `startDate`, `endDate`, `syncedLessons`/`status`)
5. **Этап 2.5** — `JsonSchemaGeneratorTest.kt` (заменяет `OpenApiValidationTest.kt`): структурные проверки + golden-снимки на `Task`, `LoginResponse`, `ParserSyncRequest`; проверки ModelValidators перенести как есть
6. **Проверка**: `./gradlew :shared:generateJsonSchemas` пишет 22 файла; `./gradlew :shared:jvmTest` зелёный
7. **Этап 3** — `web/package.json`: devDependency `json-schema-to-typescript`, скрипт `generate:types` (`json2ts -i '../api/schemas/*.json' -o 'src/shared/types/generated'`, флаги сверить по `json2ts --help`); сгенерировать типы; переписать barrel `web/src/shared/types/index.ts` на `./generated`, удалить патч `relatedLessonId`; удалить дубли из `userApi.ts`/`taskApi.ts`/`noteApi.ts`; удалить `web/src/shared/kmp/` и alias `@shared` (vite + tsconfig, если не используется); почистить `.gitignore`
8. **Проверка**: `tsc -b`, `vitest run`, `lint`, `vite build` зелёные; `grep -r "@shared/kmp" web/src` и `grep -ri "TaskInputDto\|NoteInputDto" web/src` пусты
9. **Этап 4** — `api/backend-api.yaml`: схемы → `$ref: './schemas/<Name>.json'` (+ новые схемы/пути `/university-auth/captcha|login|status|link`, `/parser/lessons`); `api/openapi.yaml` → 3.1.0; `api/parser-api.yaml` не трогать
10. **Этап 5** — `.github/workflows/schema-sync.yml` (java 21 + node 22 → regen → `git diff --exit-code` → build/test/lint); корневой `build.gradle.kts` (убрать JS-агрегаты, `buildAllDev` → `:shared:generateJsonSchemas`); `README.md` и `ARCHITECTURE.md` (новый флоу: модель → `./gradlew :shared:generateJsonSchemas` → `cd web && npm run generate:types`)

## Critical Context
**Факты аудита (проверены):**
- `shared`: Kotlin 2.3.0; **21 модель `@Serializable`** в `ApiModels.kt` (User, RegisterRequest, LoginRequest, LoginResponse, Task — `relatedLessonId: Int?` на стр. 64, TaskInput, Note, NoteInput, Lesson, GroupInfo, Institute, Specialty, AcademicGroup, Teacher, Room, ParserStatusResponse, ParserSyncRequest, CaptchaChallengeResponse, UniversityLoginRequest, UniversityLinkStatus, ErrorResponse). `@JsExport` отсутствует у: ErrorResponse, RegisterRequest, LoginRequest, LoginResponse, UniversityLoginRequest
- **Рассинхрон**: `relatedLessonId` есть в Kotlin, нет в `api/backend-api.yaml`; у `Specialty` расходятся `required`
- Мост в web: `web/src/shared/kmp/index.ts` (tracked) → `dto/shared.d.mts` (gitignored, артефакт от 24.06, устарел); рантайм `shared.mjs` не используется
- Ручные дубли в web: `LoginRequest/RegisterRequest/LoginResponse` в `web/src/entities/user/api/userApi.ts`, `TaskInputDto` в `taskApi.ts`, `NoteInputDto` в `noteApi.ts`; патч `Task & { relatedLessonId?: number }` в `web/src/shared/types/index.ts`
- Grep-подтверждения: парсерные типы (Institute/Specialty/etc.) используются только в barrel `types/index.ts`; `@shared/kmp` — только там же; groups web получает как `string[]` через `/groups` (backend), не от парсера
- `OpenApiValidationTest.kt` проверяет только ModelValidators на хардкоде — guard'ом не является
- Корневой `build.gradle.kts`: `buildJsDev/Prod`, `buildAllDev/All`, `rebuildJsDev`, `cleanAll` — все завязаны на JS-копирование
- `gradle/libs.versions.toml`: kotlin 2.3.0, kotlinxSerialization 1.7.3, buildConfig 5.3.5, junit 4.13.2; jvm target JVM_21
- Парсерный контур уже скомпилирован в backend: `/university-auth/captcha|login|status|link`, `UniversityCredentialEntity.encryptedSessionBlob`; shared-модели CaptchaChallengeResponse/UniversityLoginRequest/UniversityLinkStatus существуют

**Внешние источники (индустрия):**
- **Philo** — ближайший аналог: single source of truth бизнес-логики для mobile/TV/web, 3 года в проде (`philo.com/blog/kotlin-multiplatform-at-philo-3-years-later`, `...-bumps-in-the-road`). Уроки: sealed class'ы/Flow не экспортируются в JS; **JSON-десериализация в Kotlin/JS до 100x медленнее нативного `JSON.parse`** (выкрутились `unsafeCast`'ом); KMP-слой между backend и фронтами замедляет серийный delivery
- **Block/Trailblaze devlog 2026-06-17** (`block.github.io/trailblaze/devlog/2026-06-17-kotlin-native-ts-bindings-spike/`) — главный негативный урок: `.d.ts` из Kotlin!JS/Wasm = FFI-поверхность для вызова функций, а не JSON-схема данных; для сетевых моделей — принципиально неправильный артефакт (обосновывает переход на JSON Schema)
- **shaka-it/kmp-multimodule-sample** (GitHub) — референс: shared (модели+логика) → JVM (Ktor) + Native + JS
- Консенсус 2026: шарить модели/контракты/кэш/валидацию, не UI; JetBrains новые дефолтные структуры (shared-библиотека + app-модули); мобильные кейсы: Netflix, Booking, Forbes (80%), McDonald's, Duolingo
- **Оценка проекта**: паттерн 8/10 (верный, зрелый), JVM-конвейер 9/10 (эталонно, подтверждено javap), валидация в shared 8/10, JS-мост 3/10, единый контракт 2/10, parser 3/10, автоматизация 1/10, интегрально ~5/10. Вердикт: «архитектура не сломана, она недоинструментирована»

**Спайк-выводы по генератору (Этап 1, подтверждён):**
- `LoginResponse.user: User` → инлайн вложенных объектов; `ParserSyncRequest.groups: List<String?>` → `array` c `items: ["string","null"]`; default-значения → `isOptional` → не попадают в `required`
- `json-schema-to-typescript`: инлайн-объекты без `title` → анонимные объектные типы (структурно корректно); корневые схемы с `title` = имя модели → именованные интерфейсы

## File Operations
### Read
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\ARCHITECTURE.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\build.gradle.kts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\gradle\libs.versions.toml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\build.gradle.kts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonMain\kotlin\ru\uniplanner\shared\ApiModels.kt`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\src\commonTest\kotlin\ru\uniplanner\shared\OpenApiValidationTest.kt`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\designs\2026-08-03-university-sync-design.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\plans\2026-08-03-kmp-foundation-plan.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\openapi.yaml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\backend-api.yaml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\parser-api.yaml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\api\common.yaml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\shared\types\index.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\shared\kmp\index.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\vite.config.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\package.json`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\tsconfig.app.json`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\entities\user\api\userApi.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\entities\task\api\taskApi.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\src\entities\note\api\noteApi.ts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\.gitignore`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\README.md` (частично, grep-контекст)

### Modified
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\plans\2026-08-03-kmp-foundation-plan.md` — переписан полностью: статус `validated`, зафиксированы 6 ключевых решений, этапы 1–5 с критериями готовности, Definition of Done, «Вне скоупа» (Parser, ajv, реализация university-sync), таблица рисков с митигациями
