---
date: 2026-08-03
topic: "Доработка архитектурного фундамента: KMP как единый источник истины"
status: done
execution_session: эта сессия
---

# План: KMP как источник истины для сервера и всех клиентов (ФИНАЛ)

## Цель

Довести до идеала принцип из `ARCHITECTURE.md` (Design Principles): **KMP `shared` — единый источник истины моделей, DTO и контрактов API** для сервера (`backend`) и всех клиентов (`web`, будущий `android`). Главный фокус — надёжный мост KMP→web, потому что `backend`/`android` потребляют shared нативно (JVM), а web — единственный не-Kotlin потребитель.

## Решения, принятые на старте сессии (закрытые вопросы)

1. **Генератор JSON Schema — кастомный, на `serializer().descriptor`** (нативный механизм kotlinx.serialization, ноль новых зависимостей). Отклонены библиотеки: третья-сторонние генераторы не поддерживаются/непрозрачны; Kompendium завязан на Ktor — оверкилл.
2. **OpenAPI:** paths остаются ручными; `components.schemas` → внешний `$ref` на сгенерированные `api/schemas/*.json`. Мастер-спека бампается до **openapi 3.1.0** (валидны `type: ["T","null"]` и `anyOf` c `type: null`).
3. **Сгенерированные артефакты коммитятся в git:** `api/schemas/*.json` — да; `web/src/shared/types/generated/*.d.ts` — да; `shared.mjs`/`shared.d.mts` — удаляются (JS-таргет больше не нужен).
4. **Parser — независимый микросервис, ВНЕ KMP-контура.** Никакой генерации Pydantic. `api/parser-api.yaml` — его собственный контракт, остаётся рукописным. Этап 5 исходного плана отменён.
5. **ajv-валидация в web — откладывается** (эта итерация: типы-only; валидаторы остаются в KMP для JVM-потребителей).
6. **Guard рассинхрона:** CI-регенерация + `git diff --exit-code`. Старый `OpenApiValidationTest` (проверял валидаторы на хардкоде, YAML не читал) перерождается в `JsonSchemaGeneratorTest` с golden-снимками.

## Ключевое архитектурное решение: удаление JS-таргета

Аудит показал: web импортирует из Kotlin/JS **только декларации** (`import type`), рантайм `shared.mjs` не используется нигде. Значит Kotlin/JS-таргет — чистый балласт, порождающий все баги моста (нестабильный `.d.mts`, классы вместо структурных типов, потеря `relatedLessonId`, gitignored-артефакт). 

**Решение:** JS-таргет (`js(IR)`) удаляется из `shared`, вместе с ним — `@JsExport`-аннотации, копи-таски (`copyJsToWebDev/Prod`, `cleanWebKmp`, `rebuildJs*`) и JS-агрегаты корневого `build.gradle.kts`. Веб получает типы исключительно через JSON Schema → TS.

## Целевая архитектура

```
shared/ApiModels.kt (@Serializable, ЕДИНСТВЕННЫЙ источник)
   │
   ├─▶ backend (JVM) / android — нативный Gradle-модуль (уже так)
   │
   ├─▶ :shared:generateJsonSchemas (JavaExec → jvmMain main(), кастомный генератор)
   │     ▼
   │   api/schemas/*.json  (коммитится; 23 схемы)
   │     │  web: npm run generate:types (node scripts/generate-types.mjs → json-schema-to-typescript)
   │     ▼
   │   web/src/shared/types/generated/*.d.ts  (коммитится)
   │     │  barrel web/src/shared/types/index.ts
   │     ▼
   │   ~27 модулей web (import type из '@/shared/types') — без ручных дублей
   │
   └─▶ api/backend-api.yaml: components.schemas → $ref: './schemas/<Name>.json'
        (paths ручные; мастер openapi.yaml 3.1.0 агрегирует как раньше)
```

## Текущее состояние (факты, проверены при аудите)

- `shared/`: Kotlin 2.3.0, targets **jvm + js(IR)**; 21 модель `@Serializable`; у `RegisterRequest`/`LoginRequest`/`LoginResponse`/`UniversityLoginRequest`/`ErrorResponse` нет `@JsExport`.
- Web-мост: `web/src/shared/kmp/index.ts` (tracked) → `dto/shared.d.mts` (gitignored, артефакт от 24.06, устарел). Ручные дубли: `LoginRequest/RegisterRequest/LoginResponse` в `userApi.ts`, `TaskInputDto` в `taskApi.ts`, `NoteInputDto` в `noteApi.ts`, патч `Task & { relatedLessonId? }` в `types/index.ts`.
- `api/backend-api.yaml`: схемы рукописные, **нет `relatedLessonId`** в Task/Note (в shared есть — уже рассинхрон); нет схем/путей `/university-auth/*`, `/parser/lessons`, нет `ParserSyncResponse`.
- `api/parser-api.yaml`: контракт парсера (не трогаем, кроме сверки на совместимость с новыми shared-моделями не требуется).
- `OpenApiValidationTest.kt`: проверяет только `ModelValidators` на хардкоде — guard'ом не является.
- Корневой `build.gradle.kts`: агрегаты `buildJsDev/Prod`, `buildAll*`, `rebuildJs*`, `cleanAll` — все зависят от JS-копирования.
- `web/package.json`: нет `json-schema-to-typescript`, нет скрипта `generate:types`. `web/tsconfig.app.json`: alias `@shared/*` → `./src/shared/*`.

## Этапы

### Этап 1. Генератор JSON Schema в shared ✅ (спайк выполнен анализом)
- [x] Способ генерации выбран: кастомный обход `serializer().descriptor`
- [x] Покрытие подтверждено по моделям: nullable (`String?`), default-значения (`isOptional` → не-required), вложенные классы (`LoginResponse.user: User` → инлайн), списки (`ParserSyncRequest.groups: List<String?>`), `Int`/`String`/`Boolean`, enum-kind (задел)
- [x] Вывод `json-schema-to-typescript` на наших моделях: инлайн-объекты без `title` → анонимные объектные типы (структурно корректно); корневые схемы с `title` = имя модели → именованные интерфейсы

### Этап 2. Генератор JSON Schema в shared ✅
- [x] `shared/src/commonMain/kotlin/ru/uniplanner/shared/schema/JsonSchemaGenerator.kt` — чистый обход дескриптора → JSON-строка (без IO, тестируемо в commonTest):
  - класс → `type: object`, `properties`, `required` (не-optional и не-nullable), `title` = короткое имя
  - nullable → `type: ["T", "null"]`; список → `type: array, items`; enum-kind → `enum`
  - вложенные `@Serializable` классы → инлайн (без `$defs`), без `title` (анонимные в TS)
- [x] `shared/src/jvmMain/kotlin/ru/uniplanner/shared/schema/GenerateJsonSchemasMain.kt` — `main(args)` с выходной директорией; пишет `api/schemas/<Name>.json` (pretty-print, стабильный порядок ключей)
- [x] `shared/build.gradle.kts`: удалить `js(IR)` таргет, opt-in `ExperimentalJsExport`, таски `buildJsDev/Prod`, `copyJsToWebDev/Prod`, `cleanWebKmp`, `rebuildJs*`; добавить таск `generateJsonSchemas` (JavaExec, класс `...GenerateJsonSchemasMainKt`, аргумент — `api/schemas`); jvmMain-зависимости не нужны (только stdlib+serialization)
- [x] Удалить `@JsExport` из всех моделей (`ApiModels.kt`), добавить `ParserSyncResponse` (по дизайну university-sync: `group`, `startDate`, `endDate`, `syncedLessons`/`status` — точные поля согласует executor с дизайном)
- [x] `shared/src/commonTest/.../JsonSchemaGeneratorTest.kt` (заменяет `OpenApiValidationTest.kt`): для каждой модели — генерация валидного JSON, структурные проверки (nullable, required, вложенность, список); golden-снимки на `Task`, `LoginResponse`, `ParserSyncRequest`; старые проверки `ModelValidators` переносятся как есть
- **Критерий готовности:** `./gradlew :shared:generateJsonSchemas` пишет 22 файла (21 + `ParserSyncResponse`); `./gradlew :shared:jvmTest` зелёный. **Факт:** 23 схемы в `api/schemas/` (добавился `ValidationResult`), `:shared:jvmTest` зелёный

### Этап 3. Генерация TS-типов для web ✅
- [x] `web/package.json`: devDependency `json-schema-to-typescript`; скрипт `"generate:types"` (реализован через `node scripts/generate-types.mjs` с программным API — CLI v15 обрабатывает только один файл; это обоснованное отклонение от `json2ts -i`)
- [x] Сгенерировать `web/src/shared/types/generated/*.d.ts` (коммитится) — 24 файла (23 модели + barrel)
- [x] Переписать barrel `web/src/shared/types/index.ts`: реэкспорт из `./generated` всех моделей (включая `TaskInput`, `NoteInput`, `RegisterRequest`, `LoginRequest`, `LoginResponse`, `CaptchaChallengeResponse`, `UniversityLoginRequest`, `UniversityLinkStatus`, `ValidationResult`, `ParserSyncResponse`); **удалить патч `relatedLessonId`** (теперь генерируется); удалить импорт из `@shared/kmp`
- [x] Удалить ручные дубли: `LoginRequest/RegisterRequest/LoginResponse` из `userApi.ts`, `TaskInputDto` из `taskApi.ts`, `NoteInputDto` из `noteApi.ts` (перейти на типы из `@/shared/types`)
- [x] Удалить мост: `web/src/shared/kmp/index.ts` (git rm) + директорию `web/src/shared/kmp/dto/` (с диска); убрать alias `@shared` из `vite.config.ts` и `tsconfig.app.json` (если больше не используется)
- [x] `.gitignore`: удалить строку `web/src/shared/kmp/`; убедиться, что `api/schemas/` и `generated/` не игнорируются
- **Критерий готовности:** `tsc -b`, `vitest run`, `lint`, `vite build` зелёные; `grep -r "@shared/kmp" web/src` пуст; `grep -ri "TaskInputDto\|NoteInputDto" web/src` пуст. **Факт:** `@shared/kmp` — 0 вхождений; `TaskInputDto`/`NoteInputDto` — 0 в коде (остались только в тексте/комментарии `NoteForm.test.tsx`, не дубликаты)

### Этап 4. OpenAPI из KMP ✅
- [x] `api/backend-api.yaml`: заменить рукописные схемы на `$ref: './schemas/<Name>.json'`; добавить схемы-рефы для `Institute`, `Specialty`, `AcademicGroup`, `Teacher`, `Room`, `ParserStatusResponse`, `ParserSyncRequest`, `CaptchaChallengeResponse`, `UniversityLoginRequest`, `UniversityLinkStatus`, `ParserSyncResponse`
- [x] Добавить недостающие paths: `/university-auth/captcha|login|status|link`, `/parser/lessons` (по `2026-08-03-university-sync-design.md`)
- [x] `api/openapi.yaml`: бамп `openapi: 3.1.0`; рефы на новые схемы/пути
- [x] `api/parser-api.yaml`: НЕ трогаем (контракт независимого микросервиса)
- **Критерий готовности:** спеки валидны (проверить парсером/редактором), `relatedLessonId` присутствует, схемы — рефы на сгенерированные файлы. **Факт:** коммит `d94c306` «wire OpenAPI schemas to generated api/schemas»

### Этап 5. CI и документация ✅
- [x] `.github/workflows/schema-sync.yml`: setup-java 21 + setup-node 22 → `./gradlew :shared:generateJsonSchemas` → `cd web && npm ci && npm run generate:types` → `git diff --exit-code` (guard дрейфа) → `npm run build` + `npm run test` + `npm run lint`
- [x] Корневой `build.gradle.kts`: убрать JS-агрегаты (`buildJsDev/Prod`, `rebuildJs*`), `buildAllDev` → `:shared:generateJsonSchemas` (+ web generate:types в doLast/доке), обновить `showTasks`
- [x] `README.md`: заменить `buildJsDevAndCopy`/`.d.ts`-инструкции на новый флоу: поменял модель → `./gradlew :shared:generateJsonSchemas` → `cd web && npm run generate:types`
- [x] `ARCHITECTURE.md`: Design Principles (web — через сгенерированные TS, не `.d.mts`), Directory Structure (`api/schemas/`, `web/src/shared/types/generated/`, удалить `kmp/dto`), Data Flow, Known Gaps (вычеркнуть закрытые, добавить «JS-таргет удалён», «parser — независимый, вне KMP»)
- **Критерий готовности:** свежий clone → `npm ci && npm run build && npm test` без прогона Gradle; доки не упоминают `copyJsToWebDev`. **Факт:** grep `copyJsToWebDev|buildJsDev` по README/ARCHITECTURE/CODE_STYLE — пусто

## Definition of Done (общий) ✅

- [x] Ноль ручных TS-дублей моделей в web (grep-проверки из Этапа 3)
- [x] Демо: изменение поля в `shared/ApiModels.kt` → `./gradlew :shared:generateJsonSchemas && npm run generate:types` → тип обновлён без ручных правок
- [x] `tsc` / `npm run test` / `npm run build` / `npm run lint` — зелёные; `./gradlew :shared:jvmTest` — зелёный
- [x] Свежий clone: web собирается без прогона Gradle
- [x] `api/backend-api.yaml` схемы = сгенерированные `api/schemas/*.json` (структурно, через $ref); CI-diff-guard зелёный
- [x] JS-таргет и все артефакты `.mjs`/`.d.mts` удалены из репозитория

## Вне скоупа (осознанно)

- Parser: Pydantic-генерация из KMP — НЕ делаем (независимый микросервис, владеет своим контрактом)
- ajv-валидация в web — отложена
- Починка/добавление `/parser/lessons` и `/auth/*` в самом парсере — отдельная работа (university-sync)
- Реализация web-фичи «Университет» — отдельная работа (после этого фундамента)

## Риски

| Риск | Митигация |
|---|---|
| Кастомный генератор: краевые случаи дескрипторов (nullable-обёртки, вложенность, enum) | Юнит-тесты на каждый кейс + golden-снимки |
| `json-schema-to-typescript`: неожиданный вывод (имена, инлайн-объекты) | Спайк подтверждён на наших моделях; при расхождении — точечные правки схемы |
| Удаление JS-таргета ломает сборку (остаточные ссылки на `ExperimentalJsExport`) | Поэтапно: сначала генератор + удаление тасков, затем чистая сборка `jvmTest` |
| `openapi: 3.1.0` — совместимость инструментов | В репо нет OpenAPI-кодгена, потребители — люди/редакторы; откат на 3.0 + `nullable: true` — запасной путь |
| Миграция импортов web — механические правки | Barrel-файл сохраняет путь `@/shared/types`; правятся только 3 API-файла с дублями |
| Решение «коммитить генерированное» — разрастание diff'ов | Зафиксировано; CI-diff-guard не даёт рассинхрону прокрасться |

## Ссылки

- Принцип: `ARCHITECTURE.md` → Design Principles, Known Gaps
- Дизайн фичи, которому нужны типы: `thoughts/shared/designs/2026-08-03-university-sync-design.md`
- Текущий мост (удаляется): `web/src/shared/types/index.ts`, `web/src/shared/kmp/`, `shared/build.gradle.kts`
- Оценка паттерна и индустриальные кейсы: анализ сессии 2026-08-03 (Philo, Block/Trailblaze, JetBrains)
