---
date: 2026-08-06
topic: "Миграция тулчейна на современные стабильные версии"
status: validated
execution_session: отдельная ветка (не начата)
---

# План: Миграция тулчейна на современные стабильные версии

## Цель

Поднять базовые инструменты проекта до актуальных **стабильных** версий (по состоянию на 2026-08-06), убрать beta-зависимости и хвосты удалённого JS-таргета. **Без** рискованных major-переходов (TypeScript 7, ESLint 10, React Compiler) — они вынесены в отдельные спайки.

## Ветка и база

- **Ветка миграции:** `chore/toolchain-upgrade-2026-08` (создаётся от `web` при старте реализации)
- **Важно:** база — `web`, **НЕ `main`**: `main` отстаёт на 20 коммитов (2026-06-24) и не содержит KMP-фундамент; `web` (2026-08-04) — актуальное состояние, upstream отсутствует
- Все коммиты миграции — только в этой ветке; `main`/`web` не трогаем

## Текущее состояние (факты, проверены)

- `web/package.json`: `vite ^8.0.0-beta.13` + `overrides` (форс beta); TS `~5.9.3`; ESLint `^9.39.1`; vitest `^4.1.10`; Bun не установлен; пакетный менеджер — npm (`package-lock.json`)
- `gradle/libs.versions.toml`: kotlin 2.3.0, kotlinxSerialization 1.7.3, buildconfig 5.3.5; wrapper 8.14.3; `jvmTarget JVM_21`
- Окружение: Node 22.12.0, npm 11.7.0, JDK 25.0.3.9 (JAVA_HOME), JDK 21.0.8.9, Java 8 на PATH (не мешает — gradlew берёт JAVA_HOME), Bun **не установлен**
- CI `.github/workflows/schema-sync.yml`: setup-java 21, setup-node 22, npm ci
- Хвосты: `kotlin-js-store/package-lock.json` (150 KB, tracked), пустые корневые `package.json` `{}` + `package-lock.json` (tracked), `kotlin.js.yarn=false` и `kotlin.daemon.useNewMemoryManager=true` в `gradle.properties`
- Backend — скомпилированный Spring Boot jar **без исходников** (не мигрируем); android-каталога нет

## Оценка целесообразности переходов

### Web — делать (решено, безопасные)

| Переход | Сейчас → Цель | Вердикт | Обоснование | Риск / митигация |
|---|---|---|---|---|
| Vite | beta.13 → **8.2.0 stable** | ✅ делать | Уже на vite 8 beta — переход на стабильную версию того же мажора, убирает `overrides`. Vite 8 на Rolldown — но проект уже на нём работает | Низкий; сборка+тесты в Этапе 1 |
| @vitejs/plugin-react | 5.1.1 → **6.0.5** | ✅ делать | 6.x требует vite ^8 (peer подтверждён); React Compiler — optional peer, НЕ включаем | Средний; plugin 6 — новый мажор, проверить сборку |
| React/ReactDOM | 19.2.0 → **19.2.8** | ✅ делать | Patch/minor, багфиксы | Низкий |
| React Router | 7.1.1 → **7.18.2** | ✅ делать | Minor в стабильной 7.x; peer react >=18 ок | Низкий |
| Tailwind + @tailwindcss/vite | 4.3.1 → **4.3.3** | ✅ делать | Patch; peer vite ^5.2\|\|^6\|\|^7\|\|^8 подтверждён | Низкий |
| jsdom | 28.1.0 → **30.0.1** | ✅ делать | Major в test-only devDep; vitest 4.1.10 peer `jsdom: *` | Низкий; vitest подтверждает |
| eslint-plugin-react-hooks | 7.0.1 → **7.1.1** | ✅ делать | Minor, совместим с ESLint 9 | Низкий |
| typescript-eslint | 8.48.0 → **8.66.0** | ✅ делать | Minor в 8.x, совместим с TS 5.9 | Низкий |
| lucide-react | 1.21.0 → **1.29.0** | ✅ делать | Minor | Низкий |
| @tanstack/react-query | 5.101.1 → **5.101.4** | ✅ делать | Patch | Низкий |
| @types/react / @types/node | 19.2.7 / 24.10.1 → актуальные | ✅ делать | Types, совместимы | Низкий |

### Bun — делать (решено)

| Переход | Вердикт | Обоснование | Риск / митигация |
|---|---|---|---|
| npm → **Bun 1.3.14** | ✅ делать | Быстрее install/run, единый бинарь, bun.lock; скрипты (generate-types.mjs на node:fs) совместимы | **Средний:** Vite 8 тянет нативные модули (rolldown ~1.2.0, lightningcss) — под Bun нативные node-бинарники могут не подхватиться. **Спайк Этапа 0:** `bun install && bun run build` до перехода остальных пакетов. Fallback — остаться на npm |

### JVM/KMP — делать (решено)

| Переход | Сейчас → Цель | Вердикт | Обоснование | Риск / митигация |
|---|---|---|---|---|
| Gradle | 8.14.3 → **9.6.1** | ✅ делать | 9.6.1 — current stable; кэш `.gradle/9.1.0` уже есть (Gradle 9 пробовался); configuration-cache уже включён | Средний: Kotlin 2.4.10 совместим с Gradle 9 (KGP поддерживает 8.14–9.x); проверить в Этапе 3 |
| Kotlin | 2.3.0 → **2.4.10** | ✅ делать | Актуальный стабильный; golden-снимки JsonSchemaGeneratorTest должны остаться (descriptor-вывод стабилен в 2.x) | Низкий; jvmTest подтверждает |
| kotlinx-serialization | 1.7.3 → **1.11.0** | ✅ делать | Актуальный; API стабилен для @Serializable | Низкий |
| buildconfig | 5.3.5 → **6.0.10** | ✅ делать | 5.x может не поддерживать Gradle 9; 6.0.10 — актуальный | **Средний:** API (useKotlinOutput/buildConfigField) мог измениться в 6.x — проверить DSL в Этапе 3; fallback — держать 5.3.5 если Gradle 9 его переваривает |
| jvmTarget | JVM_21 → **JVM_25** | ✅ делать | JDK 25.0.3.9 установлен и в JAVA_HOME; 25 — LTS; CI обновляется на 25 | Средний: Kotlin 2.4.10 должен поддерживать JVM_25 (проверить в спайке Этапа 0; fallback JVM_24) |

### Чистка хвостов — делать (решено)

| Действие | Вердикт | Обоснование |
|---|---|---|
| `git rm kotlin-js-store/package-lock.json` (150 KB) | ✅ | Мусор от удалённого JS-таргета |
| Удалить корневые `package.json` `{}` + `package-lock.json` | ✅ | Пустые, не используются (CI ходит только в `web/`) |
| `gradle.properties`: убрать `kotlin.js.yarn=false` | ✅ | JS-таргет удалён |
| `gradle.properties`: убрать `kotlin.daemon.useNewMemoryManager=true` | ✅ | Property устарел в новых KGP; проверить, что не нужен |

### Отложено (осознанно, отдельные спайки)

| Переход | Вердикт | Причина |
|---|---|---|
| TypeScript 5.9.3 → **7.0.2** | ⏸ спайк позже | Go-native rewrite, major; typescript-eslint 8.x совместимость с TS7 не гарантирована |
| ESLint 9 → **10.8.0** | ⏸ спайк позже | Major; плагины (react-hooks, react-refresh, typescript-eslint) могут не поддерживать |
| **React Compiler 1.0.0** | ⏸ спайк позже | Решение сессии: «только безопасные»; plugin-react 6 готов, включается флагом `reactCompiler: true` + react-compiler-runtime |
| JUnit 4 → 5 | ⏸ не в скоупе | Работает; переход — отдельная задача |
| Backend / Parser / Android | ⏸ не в скоупе | Backend без исходников; parser вне KMP; android нет |

## Этапы

### Этап 0. Спайк совместимости (критично до старта)
- [ ] `bun install && bun run build` на **текущих** версиях — проверить нативные модули Vite 8 (rolldown, lightningcss) под Bun
- [ ] Kotlin 2.4.10: доступен ли `JvmTarget.JVM_25` (fallback JVM_24)
- [ ] buildconfig 6.0.10: совместим ли текущий DSL (`useKotlinOutput`, `buildConfigField`)
- [ ] Golden-снимки JsonSchemaGeneratorTest стабильны при Kotlin 2.4
- **Выход:** отчёт; если Bun ломает сборку — остаёмся на npm (переход Bun отменяется, остальное продолжается)

### Этап 1. Web: бомп пакетов (до Bun)
- [ ] `web/package.json`: vite `^8.2.0` (без overrides), plugin-react `^6.0.5`, react/react-dom 19.2.8, router 7.18.2, tailwind 4.3.3, jsdom 30.0.1, hooks 7.1.1, typescript-eslint 8.66.0, lucide 1.29.0, query 5.101.4, актуальные @types
- [ ] Не трогаем: TS ~5.9.3, ESLint ^9.39.1, vitest ^4.1.10 (уже latest), msw, sonner, json-schema-to-typescript (latest)
- **Критерий:** `npm run build && npm run test && npm run lint` зелёные (ещё на npm)

### Этап 2. Bun 1.3.14
- [ ] `packageManager: "bun@1.3.14"` в package.json; удалить package-lock.json, node_modules
- [ ] `bun install` → `bun.lock`; `bun run build/test/lint/generate:types` зелёные; drift-guard (generate:types → diff 0)
- **Критерий:** все скрипты работают через `bun run`

### Этап 3. JVM/KMP
- [ ] `libs.versions.toml`: kotlin 2.4.10, kotlinxSerialization 1.11.0, buildconfig 6.0.10
- [ ] wrapper: gradle-9.6.1; `shared/build.gradle.kts`: `JvmTarget.JVM_25`
- [ ] `./gradlew :shared:jvmTest` + `generateJsonSchemas` → drift-guard 0 (api/schemas без изменений)
- **Критерий:** `./gradlew buildAll` зелёный, артефакты не изменились

### Этап 4. Чистка хвостов
- [ ] `git rm kotlin-js-store/package-lock.json`; удалить корневые package.json/package-lock.json
- [ ] `gradle.properties`: убрать `kotlin.js.yarn=false`, `kotlin.daemon.useNewMemoryManager=true`

### Этап 5. CI
- [ ] `schema-sync.yml`: setup-java 25, setup-node → `oven-sh/setup-bun@v2` (1.3.14), `bun install --frozen-lockfile`, `bun run *`, cache `web/bun.lock`

### Этап 6. Документация
- [ ] README/ARCHITECTURE/CODE_STYLE: Java 25, Gradle 9.6, Kotlin 2.4, Bun вместо npm

### Этап 7. DoD
- [ ] `bun run build/test/lint`, `./gradlew :shared:jvmTest`, `generateJsonSchemas` — drift-guard 0
- [ ] Свежий clone на ветке миграции собирается по пайплайну CI
- [ ] Один коммит на этап; итоговый коммит-отчёт «toolchain upgraded»

## Вне скоупа (сознательно)

- TypeScript 7, ESLint 10, React Compiler — отдельные спайки после стабилизации
- Backend (нет исходников), Parser (свой контракт), Android (нет каталога)
- JUnit 5, ajv-валидация, фича «Университет» — отдельные задачи

## Риски

| Риск | Митигация |
|---|---|
| Bun не тянет нативные модули Vite 8 (rolldown/lightningcss) | Спайк Этапа 0; fallback — остаться на npm (остальная миграция идёт) |
| buildconfig 6.0.10 несовместим с текущим DSL | Спайк; fallback 5.3.5, если Gradle 9 его принимает |
| Kotlin 2.4.10 без JVM_25 | Fallback JVM_24 (JDK 25 всё равно компилирует) |
| Golden-снимки JsonSchemaGeneratorTest меняются при Kotlin 2.4 | Обновить осознанно, зафиксировать diff в коммите Этапа 3 |
| plugin-react 6 меняет поведение сборки | Этап 1 изолирован; revert коммита |

## Ссылки

- Принципы: `ARCHITECTURE.md` → Design Principles
- Предыдущий фундамент: `thoughts/shared/plans/2026-08-03-kmp-foundation-plan.md` (done)
- CI: `.github/workflows/schema-sync.yml`
