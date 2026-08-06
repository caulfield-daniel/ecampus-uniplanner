---
session: ses_042b
updated: 2026-08-06T22:16:07.811Z
---

# Session Summary

## Goal
Выполнить миграцию тулчейна (ветка `chore/toolchain-upgrade-2026-08`) на современные стабильные версии согласно плану `thoughts/shared/plans/2026-08-06-toolchain-migration-plan.md`: Bun 1.3.14, Vite 8.2 stable, Kotlin 2.4.10, Gradle 9.6.1, JVM_25, buildconfig 6.0.10, чистку хвостов JS-таргета, обновление CI и документации — без рискованных major (TS7/ESLint10/React Compiler), всё зелёное (build/test/lint/drift-guard).

## Constraints & Preferences
- **Только стабильные версии**; TS7/ESLint10/React Compiler — вынесены в отдельные спайки, НЕ трогать
- **Ветка миграции**: `chore/toolchain-upgrade-2026-08`, создана от `dev` (НЕ `web`/`main`; `main` отстаёт на 20 коммитов)
- **Все коммиты миграции — только в этой ветке**; `main`/`web`/`dev` не трогаем
- **Backend требует JDK 21**; **shared/JVM требует JDK 25** (JVM_25). JAVA_HOME в PATH → JDK 25.0.3.9 (подходит для JVM-модулей, НЕ для backend)
- Пакетный менеджер web — **Bun 1.3.14** (npm больше не используется в web)
- Drift-guard обязателен: `generateJsonSchemas` + `generate:types` не должны менять закоммиченные артефакты

## Progress
### Done
- [x] **Создана ветка** `chore/toolchain-upgrade-2026-08` от `dev`
- [x] **Установлен Bun 1.3.14** глобально (`npm install -g bun@1.3.14`) — до этого Bun не был установлен
- [x] **Спайк совместимости (Этап 0)** ✅: `rm -rf node_modules package-lock.json && bun install` (392 пакета), `bun run build` ✅ (845ms, warning про `__dirname`), `bun run test` 86/86 ✅, `bun run lint` ✅. Нативные модули Vite 8 работают под Bun
- [x] **Проверены актуальные версии** (npm registry, 2026-08): vite 8.2.1, plugin-react 6.0.5, react 19.2.8, router 7.18.2, tailwind 4.3.3, jsdom 30.0.1, hooks 7.1.1, typescript-eslint 8.66.0, lucide 1.29.0, react-query 5.101.4, @types/react 19.2.18, @types/node 26.1.2
- [x] **Этап 1+2 (web-бомп + Bun)**: обновлён `web/package.json` (все версии + `packageManager: bun@1.3.14`, убраны `overrides`); `vite.config.ts`: `__dirname` → `import.meta.dirname` (почистил warning native configLoader); drift-guard типов чистый (0 изменений). Коммит `0c3d87f` (4 файла, 982 вставок, 7263 удалений; удалён web/package-lock.json, создан web/bun.lock)
- [x] **Этап 3 — JVM/KMP**: `gradle/libs.versions.toml`: kotlin 2.3.0→2.4.10, kotlinxSerialization 1.8.1→1.11.0, buildConfig 5.3.5→6.0.10; wrapper 8.14.3→9.6.1 (через `JAVA_HOME=JDK21 ./gradlew wrapper --gradle-version 9.6.1` — при JDK 25 старый Kotlin 2.3.0 падал `IllegalArgumentException: 25.0.3`); `shared/build.gradle.kts`: JVM_21→JVM_25 + `runtimeDependencyFiles`→`runtimeDependencyFiles!!` (nullable в Kotlin 2.4). `:shared:jvmTest` ✅, `:shared:generateJsonSchemas` ✅ (drift 0). Коммит `68dea7d`
- [x] **E4 — чистка хвостов**: `git rm` kotlin-js-store/package-lock.json, корневых package.json/package-lock.json, удалён пустой kotlin-js-store/, из gradle.properties убраны `kotlin.js.yarn=false` и `kotlin.daemon.useNewMemoryManager=true`. Коммит `abe0ee8`
- [x] **E5 — CI**: `.github/workflows/schema-sync.yml`: setup-java 21→25, setup-node/npm→ `oven-sh/setup-bun@v2` 1.3.14 + `bun install --frozen-lockfile` + `bun run *`. Коммит `a8365aa`
- [x] **E6 — документация (частично)**: `README.md` обновлён (техстек-таблица с версиями, Backend-секция — JDK 21 осн + JVM-модули JDK 25, CI-секция → Bun). Не закоммичено

### In Progress
- [ ] **E6 — документация**: дообновить `ARCHITECTURE.md` (строки 175-204: `npm install`→`bun install`, `npm run *`→`bun run *`, строка 202 про "web-tmp"/root package.json уже неактуальна) и `CODE_STYLE.md` (строка 140: `npm run generate:types`→`bun run generate:types`)

### Blocked
- (none)

## Key Decisions
- **База миграции — `dev`, не `web`/`main`**: `main` отстаёт на 20 коммитов и не содержит KMP-фундамент; `dev` актуален после merge web→dev. План (писался до merge) указывал `web`, но актуальная база — `dev`
- **Bun 1.3.14 вместо npm**: переход согласован в плане; спайк подтвердил, что нативные бинари Vite 8 (rolldown) стабильны под Bun
- **Gradle 9.6.1 + Kotlin 2.4.10**: совместимость подтверждена context7 (KGP 2.3.20–2.3.21 поддерживает Gradle до 9.3.0; 2.4.10 новее — совместим с 9.6.1)
- **JVM_25 вместо JVM_24**: JDK 25 LTS в JAVA_HOME, опасного отказа планирования снят фактическим прохождением `jvmTest` с JVM_25
- **buildconfig 6.0.10**: DSL `useKotlinOutput`/`buildConfigField` совместим — подтверждено успешным прохождением сборки, миграция кода не потребовалась
- **gradle-wrapper.jar не коммитится**: попадает в .gitignore — коммитят только gradlew/gradlew.bat + gradle-wrapper.properties (стандартная практика)

## Next Steps
1. Дописать `ARCHITECTURE.md` (строки 180-204): npm→bun команды, обновить 202-строку (note про web-tmp и root `{}` — уже неактуально), строка 177 модель `JsonSchemaGeneratorTest`
2. Дописать `CODE_STYLE.md` (строка 140): `npm run` → `bun run` в команде регенерации
3. Закоммитить E6 (`README.md` + `ARCHITECTURE.md` + `CODE_STYLE.md`), msg вида `docs: update commands to Bun, JDK 25, Kotlin 2.4`
4. Обновить леджер `thoughts/ledgers/CONTINUITY_ses_042b.md` (или создать новый для ses_043) с итогами миграции
5. Финальная верификация на ветке: `bun run build/test/lint` в web, `./gradlew :shared:jvmTest` + `:shared:generateJsonSchemas` (drift-guard), backend-прогон с JDK21 если требуется
6. По стратегии: после миграции стабильное состояние → merge `chore/toolchain-upgrade-2026-08` → `dev` → затем `main` → потом планы фич

## Critical Context
- **Git-лог ветки `chore/toolchain-upgrade-2026-08`** (последние сверху):
  - `a8365aa` ci: upgrade to Java 25 + Bun 1.3.14
  - `abe0ee8` chore(cleanup): remove JS-target leftovers and stale gradle.properties flags
  - `68dea7b` chore(jvm): upgrade Gradle 9.6.1, Kotlin 2.4.10, kotlinx-serialization 1.11.0, buildconfig 6.0.10, jvmTarget JVM_25
  - `0c3b87f` chore(web): upgrade toolchain to stable versions + migrate to Bun 1.3.14
- **Рабочее дерево**: `?? .playwright-mcp/` (игноримается, не трогать) + модифицированные README/ARCHITECTURE/CODE_STYLE (незакоммичены)
- **Прошлые сессии**: ветка `dev` с коммитами `b834c47` (fix loading isLoading), `e89d779` (ledger), `5eecd6e`+`5aca5cb` (merge web→dev); 86 web-тестов все зелёные
- **Environment**: Node 22.12.0, npm 11.7.0, Bun 1.3.14 (глобально), JAVA_HOME → JDK 25.0.3.9, JDK 21.0.8.9 (для backend/wrapper), Windows bash-шелл
- **claw**: `:shared:jvmTest` с golden-снимками прошёл; `generateJsonSchemas` с drift-guard чистый; nested-проблема: Kotlin 2.3.0 не может парсить JDK 25 (поэтому wrapper обновлял на JDK 21)
- **Возможная user-работа**: после миграции нужно влить ветку в `dev` → `main`; планов фич пока нет

## File Operations
### Read
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\.github\workflows\schema-sync.yml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\ARCHITECTURE.md` (фрагмент: строки 175-204)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\CODE_STYLE.md` (фрагмент: строки 135-144)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\gradle\libs.versions.toml`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\shared\build.gradle.kts`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\thoughts\shared\plans\2026-08-06-toolchain-migration-plan.md`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\package.json`
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\web\vite.config.ts`

### Modified (незакоммичено, ветка `chore/toolchain-upgrade-2026-08`)
- `C:\Users\user\Desktop\shit\dev\coursework-03\ecampus-uniplanner\README.md` (техстек-таблица + backend/CI секции — СДЕЛАНО, НЕ закоммичено)

### Коммит (в `chore/toolchain-upgrade-2026-08`):
- `0c3b87f`, `68dea7b`, `abe0ee8`, `a8365aa` (см. ниже в Critical Context)

### Env/Snapshots:
- Bun 1.3.14, Node 22.12.0, npm 11.7.0, JDK 25.0.3.9, JDK 21.0.8.9, Gradle 9.6.1 (wrapper), Kotlin 2.4.10, kotlinx-serialization 1.11.0, buildconfig 6.0.10, async 0.0.24 (docker-compose), vite 8.2.1 stable
