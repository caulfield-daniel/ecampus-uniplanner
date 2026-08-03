---
date: 2026-08-03
topic: "Доработка архитектурного фундамента: KMP как единый источник истины"
status: draft
execution_session: отдельная (не эта)
---

# План: KMP как источник истины для сервера и всех клиентов

## Цель

Довести до идеала принцип, зафиксированный в `ARCHITECTURE.md` (раздел **Design Principles**): **KMP `shared` — единый источник истины моделей, DTO и контрактов API** для сервера (`backend`) и всех клиентов (`web`, будущий `android`). Главный фокус — надёжный и оптимальный мост KMP→web, потому что для `backend`/`android` shared — нативный Kotlin-модуль (JVM/Android targets), а web — единственный не-Kotlin потребитель, которому нужна генерация.

## Текущее состояние (факты, проверены)

### Как устроено сейчас

- `shared/`: Kotlin 2.3.0, targets **jvm** + **js(IR)**; `@Serializable` + `@JsExport` data-классы; `ApiConstants.kt` (пути, `API_BASE_URL` из BuildConfig); `ModelValidators.kt`; `OpenApiValidationTest.kt` (сверка KMP ↔ `api/*.yaml`)
- Доставка в web: Gradle-задачи `buildJsDev`/`copyJsToWebDev` копируют `shared.mjs` + `shared.d.mts` в `web/src/shared/kmp/dto/` (**gitignored**)
- Web: импортирует **только декларации** (`import type` через `@/shared/types → @shared/kmp → dto/shared.d.mts`); рантайм `shared.mjs` не используется
- `api/*.yaml` — сейчас фактически второй источник («contract source of truth»), KMP его «зеркалит» + тест сверяет

### Проблемы тулчейна (tech debt)

1. **`.d.mts` нестабилен:** отсутствует `relatedLessonId` в `Task`/`Note` → ручной патч `Task & { relatedLessonId?: number }` в `web/src/shared/types/index.ts`
2. **Классы вместо структурных типов:** Kotlin/JS генерирует `class Task { copy(...) ... }` — не проходит структурную проверку TS для литералов → ручные `TaskInputDto`/`NoteInputDto`
3. **Нет `@JsExport`** у `LoginRequest`/`LoginResponse`/`RegisterRequest`/`UniversityLoginRequest` → ручные дубли в `web/src/entities/user/api/userApi.ts`
4. **Gitignored артефакт:** свежий clone без прогона Gradle не имеет типов
5. **Устаревшая документация:** README упоминает `:shared:buildJsDevAndCopy` (реально — `:shared:copyJsToWebDev`)
6. **Рантайм мёртв:** сериализация/валидаторы/константы Kotlin для браузера не используются
7. **Рассинхрон констант:** `gradle.properties apiBaseUrl` vs `web/.env VITE_API_BASE_URL`

## Целевая архитектура

```
shared/ApiModels.kt  (@Serializable, ЕДИНСТВЕННЫЙ источник)
   │
   ├─▶ backend (JVM) / android — нативный Gradle-модуль (уже так)
   │
   ├─▶ JSON Schema (генерируется из kotlinx.serialization descriptors,
   │     Gradle-таск :shared:generateJsonSchemas)  ← новый производный артефакт
   │        ├─▶ web: json-schema-to-typescript (npm) → структурные TS-интерфейсы
   │        │      → web/src/shared/types/generated/ (КОММИТИТСЯ в git)
   │        ├─▶ (опц.) parser: datamodel-code-generator → Pydantic-схемы
   │        └─▶ (опц.) web runtime: ajv-валидация ответов API
   │
   └─▶ api/*.yaml — схемы компонентов из сгенерированных JSON Schema
        (paths остаются ручными; OpenApiValidationTest — guard рассинхрона)
```

### Почему именно JSON Schema-мост (а не починка `.d.mts`)

- **Структурные TS-типы** (интерфейсы) вместо классов Kotlin/JS — решает проблему №2 раз и навсегда
- **Без Kotlin/Gradle на машине web-разработчика:** генерация — npm-скрипт (`generate:types`)
- **Один артефакт — много потребителей:** TS, Pydantic, OpenAPI, ajv-валидация
- **Генератор без внешних зависимостей:** обход `serializer().descriptor` — нативный механизм kotlinx.serialization
- **Коммит сгенерированных типов в git** — свежий clone работает без прогона Gradle (проблема №4)

## Этапы

### Этап 0. Принцип зафиксирован ✅
- Сделано в этой сессии: `ARCHITECTURE.md` — раздел Design Principles, актуализация shared/web/backend/Data Flow/Known Gaps

### Этап 1. Исследование тулчейна (spike)
- [ ] Проверить стабильность `.d.mts` на Kotlin 2.3.0 — зафиксировать баги (issue-отчёт)
- [ ] Выбрать способ генерации JSON Schema: **кастомный генератор на `descriptor`** (рекоменд.) vs библиотека; проверить покрытие: nullable, enum (приоритет 1..5, статусы), строки-даты (ISO), вложенные классы (`User` в `LoginResponse`), списки
- [ ] Проверить вывод `json-schema-to-typescript` (npm) на наших моделях: именование, `$ref`, комментарии, `enum` → union-типы
- [ ] Решить: коммитить ли сгенерированные TS-типы (рекомендация: **да**) и JSON Schema (рекомендация: **да**)

### Этап 2. Генератор JSON Schema в shared
- [ ] Реализовать `JsonSchemaGenerator` (jvmMain или commonMain): обход `serializer().descriptor` всех моделей → `api/schemas/*.json`
- [ ] Gradle-таск `:shared:generateJsonSchemas` + агрегат в корневом `build.gradle.kts`
- [ ] Тест: для каждой `@Serializable` модели генерируется валидная схема; golden-снимки на 2–3 моделях
- **Критерий готовности:** `./gradlew :shared:generateJsonSchemas` — все модели покрыты

### Этап 3. Генерация TS-типов для web
- [ ] npm-скрипт `generate:types` (json-schema-to-typescript) → `web/src/shared/types/generated/`
- [ ] Удалить ручные дубли: auth-типы из `userApi.ts`, `TaskInputDto`/`NoteInputDto`, патч `relatedLessonId`; удалить мост `@shared/kmp` (`.d.mts`)
- [ ] Обновить alias/tsconfig; мигрировать импорты (~27 модулей web)
- [ ] `.gitignore`: убрать `web/src/shared/kmp/dto/`-исключение для новых типов (коммитим); `shared.mjs` больше не копируется в web
- **Критерий готовности:** tsc clean; `npm run test` green; lint clean; ноль `import ... from '@shared/kmp'`; grep не находит дублей моделей

### Этап 4. OpenAPI из KMP
- [ ] Схемы компонентов в `api/*.yaml` — через `$ref` на сгенерированные JSON Schema (или автосборка `components.schemas`)
- [ ] Дополнить спеки недостающим: `/university-auth/*`, `/parser/lessons` (по дизайну `2026-08-03-university-sync-design.md`)
- [ ] `OpenApiValidationTest`: переориентировать на проверку консистентности KMP ↔ OpenAPI (сгенерированные схемы идентичны)
- **Критерий готовности:** тест сверки зелёный после любого изменения моделей

### Этап 5. (опц.) Parser: Pydantic из JSON Schema
- [ ] Оценить `datamodel-code-generator` (JSON Schema → Pydantic) против ручных `parser/app/schemas/*.py`
- [ ] Решение: внедрять или оставить ручными + тест сверки
- **Решение о включении** — на старте сессии (см. Открытые вопросы)

### Этап 6. (опц.) Рантайм-валидация web
- [ ] ajv + JSON Schema на ответах API (или только на входе форм)
- **Решение о включении** — на старте сессии

### Этап 7. CI и документация
- [ ] GitHub Actions: шаг генерации (`generateJsonSchemas` + `generate:types`) + `git diff --exit-code` — предотвращает рассинхрон
- [ ] Обновить README (команды вместо устаревшей `buildJsDevAndCopy`), ARCHITECTURE.md Data Flow, `.gitignore`
- [ ] Убрать/закоммитить старый `web/src/shared/kmp/dto/` (по решению из Этапа 1)

## Definition of Done (общий)

- [ ] Ноль ручных TS-дублей моделей в web
- [ ] Демо: изменение поля в `shared/ApiModels.kt` → `npm run generate:types` → тип обновлён без ручных правок
- [ ] `tsc` / `npm run test` / `npm run build` / `npm run lint` — зелёные
- [ ] Свежий clone: web собирается без прогона Gradle
- [ ] `api/*.yaml` консистентен с KMP (автотест)

## Риски

| Риск | Митигация |
|---|---|
| Кастомный генератор JSON Schema: краевые случаи (enum, null, default, вложенность) | Юнит-тесты на каждый кейс + golden-снимки |
| `json-schema-to-typescript`: неожиданный вывод (имена, `$ref`, union vs enum) | Spike в Этапе 1 ДО миграции |
| Миграция ~27 модулей web — механические правки | Поэтапно, с tsc после каждого блока |
| Решение «коммитить генерированное» — разрастание diff'ов | Зафиксировать в начале; CI-diff-guard |
| Потеря рантайм-возможностей Kotlin (валидаторы) | Валидаторы остаются в KMP для JVM-потребителей; web получает ajv (опц.) |

## Открытые вопросы (решить на старте сессии)

1. **Генератор JSON Schema:** кастомный на `descriptor` vs библиотека (какая?) — spike ответит
2. **OpenAPI:** схемы полностью из KMP или ручные paths + генерируемые схемы? (рекомендация: paths ручные, схемы — из KMP)
3. **Коммитить ли сгенерированные артефакты** в git (TS-типы — да; JSON Schema — да; `shared.mjs` — нет)
4. **Parser** включать в KMP-контур (Pydantic-генерация) в этой итерации или позже?
5. **Рантайм-валидация web** (ajv) — нужна в этой итерации или только типы?

## Ссылки

- Принцип: `ARCHITECTURE.md` → Design Principles, Known Gaps (обновлены 2026-08-03)
- Мост сейчас: `web/src/shared/types/index.ts`, `web/src/shared/kmp/`, `shared/build.gradle.kts`
- Дизайн фичи, которому нужны типы: `thoughts/shared/designs/2026-08-03-university-sync-design.md`
