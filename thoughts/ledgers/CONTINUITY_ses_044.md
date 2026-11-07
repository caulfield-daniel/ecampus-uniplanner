---
session: ses_044
updated: 2026-11-07T00:00:00.000Z
---

# Session Summary

## Goal

Выход из двойственности «курсовой проект → продукт»: объявить новый статус проекта, заморозить курсовой снимок в отдельной ветке, сделать `main` релизной веткой продукта, отделить архивную документацию от живой. Затем — «План A: Релизная стабилизация»: живой CI на `dev`/PR, backend-тесты на PostgreSQL, релизная гигиена и `v1.0.0`.

## Constraints & Preferences

- Курсовой уже защищён (июнь 2026) — требования методички и траектории Б больше не ограничивают развитие.
- Курсовой снимок должен сохраниться (архивная ветка + тег + `docs/coursework/`).
- `main` = релизы, `dev` = интеграция, `archive/*` = read-only.
- Документация не должна противоречить коду; курсовой пакет не должен выглядеть как действующие требования.

## Progress

### Done

- [x] **Архивная ветка и тег**: `archive/coursework-2026` → `53a6795`, аннотированный тег `coursework-defense-2026-06`.
- [x] **Перенос курсового пакета** в `docs/coursework/`: `00-project-charter`, `01-requirements`, `05-implementation`, `10-final-report`; туда же docx-пояснительная записка (`docs/coursework/report/`) и скриншоты GitHub Insights (`docs/coursework/images/`).
- [x] **Баннеры архива** на всех документах курсового пакета + `docs/coursework/README.md` с объяснением, почему архив.
- [x] **Относительные ссылки** пересчитаны: 0 битых ссылок по всему репозиторию (проверено скриптом).
- [x] **`docs/README.md`** — карта документации со статусами LIVING / ARCHIVED и приоритетом источников истины.
- [x] **`docs/development/git-flow.md`** — модель веток, поток изменений, CI, политика архива.
- [x] **README.md переписан под продукт**: блок «Статус проекта», убраны раздел статистики с TODO и битые ссылки на `docs/images/*`, обновлены дерево и карта документации, убраны формулировки-обязательства траектории Б.
- [x] **ARCHITECTURE.md синхронизирован с кодом**: backend — реальные исходники и `:backend` в Gradle (а не «compiled only»), shared — JVM 25, web — Vite 8.2 stable + Bun, убраны «Ktor planned», `AuthProvider` → `AppProviders`/`entities/user`, добавлены backend-команды и актуальные Known Gaps.
- [x] **Живые доки очищены от курсовой риторики**: `06-testing`, `07-ui` (screens + README), `08-deployment` (README + admin-guide), ADR-001 (помечен историческим), ADR-002.
- [x] **`docs/HANDOFF.md` → `thoughts/handoff/2026-06-24-handoff.md`** с баннером «устарело» и поправленными путями.
- [x] **План миграции тулчейна** помечен `status: done`, чекбоксы закрыты, зафиксировано, что базой был `dev`, а не `web`.
- [x] **`.gitignore`**: `~$*.docx` (Word-lock), lock-файл удалён из индекса.
- [x] **Git-топология**: `git merge -s ours main` в рабочей ветке → `main` стал предком; `dev` и `main` локально переведены на `1cf790f` (fast-forward).
- [x] **Коммиты**: `4573dd9` (архив курсового пакета), `3a387a3` (перевод живых доков в продуктовую рамку), `1cf790f` (merge-коммит, фиксирующий превосходство продуктового состояния над курсовым `main`).

## План A: релизная стабилизация (выполнено локально)

Ветка `chore/release-stabilization-2026-11`.

### Done

- [x] **CI переписан**: `.github/workflows/ci.yml` вместо `schema-sync.yml`. Триггеры: push в `main`/`dev`, `pull_request`, `workflow_dispatch`. Джобы: `schema-drift`, `shared` (`:shared:jvmTest`), `backend` (`:backend:test` + service-контейнер `postgres:16` + JaCoCo-артефакт), `web` (build/test/lint). Добавлен `concurrency` с отменой устаревших прогонов.
- [x] **Найден и исправлен блокер CI**: `gradle/wrapper/gradle-wrapper.jar` никогда не был в git (`.gitignore`: `*.jar` перекрывал `!gradle-wrapper.jar`, стоявший выше). На свежем клоне `./gradlew` падал. JAR добавлен в индекс, negation перенесена после `*.jar`.
- [x] **docker-compose**: `POSTGRES_*`, `JWT_SECRET`, `UNIVERSITY_AUTH_ENCRYPTION_KEY`, `CORS_ORIGINS` читаются из env с dev-дефолтами (`${VAR:-default}`); добавлен корневой `.env.example`.
- [x] **Документация**: README/ARCHITECTURE/deployment/git-flow обновлены под `ci.yml` и полную матрицу джоб.
- [x] **Локальная верификация (Windows, JDK 25, Bun 1.3.14)**:
  - `:shared:jvmTest` + `:shared:generateJsonSchemas` — BUILD SUCCESSFUL, drift 0
  - `bun run generate:types` — 23 файла, drift 0
  - web: build OK, tests **86/86**, lint чисто
  - backend: **32/32** (8 suites, 0 failures) на живом `postgres:16` из compose
- [x] **Fresh-clone проверка** (локальный клон ветки в temp): `gradlew --version` работает, `bun install --frozen-lockfile` + `bun run build` OK, `:shared:generateJsonSchemas` + `generate:types` → `git status --porcelain` пуст.
- [x] **Коммит**: `ce71cdf` (CI + wrapper JAR + compose env + docs).

### In Progress

- [ ] **Push в origin не выполнен**: Git Credential Manager требует интерактивной аутентификации (`Invalid username or token`, HTTPS). Нужно выполнить вручную:
  ```bash
  git push origin archive/coursework-2026 dev main
  git push origin refs/tags/coursework-defense-2026-06 refs/tags/v1.0.0
  ```
- [ ] **Тег `v1.0.0`** создан локально на `main` (provisional — пересоздать, если CI на первом push покраснеет).

### Blocked

- Push заблокирован отсутствием валидных credentials в неинтерактивной сессии (credential.helper=manager).
- CI не может быть проверен до push (workflow_dispatch/PR тоже требуют origin).

## Key Decisions

- **`git merge -s ours main`**: контент `main` (курсовой README, скриншоты, docx) сознательно не переносится в продукт, но сохраняется в `archive/coursework-2026` и в истории. Это делает `main` предком `dev` → обновление `main` проходит fast-forward, без force-push.
- **Физический перенос, а не только баннеры**: курсовой пакет вынесен в `docs/coursework/`, чтобы он не выглядел частью живой документации; ссылки пересчитаны скриптом, проверка — 0 битых.
- **Живыми оставлены** `02-architecture` (PCMEF описывает реальный backend), ADR-002/003, `03`, `04`, `06`, `07`, `08`, `09`; ADR-001 помечен как исторический контекст.
- **docx и скриншоты** перенесены внутрь `docs/coursework/`, а не удалены — сохранены для отчётности вуза.

## Next Steps

1. **Push** (см. команды выше) — после интерактивной аутентификации.
2. Проверить первый прогон `CI` на GitHub (все 4 джобы); при падении — починить и пересоздать тег `v1.0.0`.
3. Проверить на GitHub, что `main` и `dev` совпадают, ветка `archive/coursework-2026` и теги видны.
4. Опционально: branch protection на `main`/`dev` (require CI).
5. Дальше по стратегии: фича «Университет» (ветка B) или автоматизация/админка (ветка C).

## Critical Context

- Локально: `main` = `dev` = `1cf790f`; `archive/coursework-2026` = `53a6795`; тег `coursework-defense-2026-06` = `53a6795`.
- `origin/main` всё ещё `53a6795`, `origin/dev` — `111355f` (push не прошёл).
- Рабочая ветка `chore/repo-split-2026-11` влита в `dev` (FF).
- Основной worktree проекта: `C:/Users/user/Desktop/shit/dev/coursework-03/ecampus-uniplanner` (там вычекнута `dev`); текущая сессия работала в `C:/Users/user/.local/share/opencode/worktree/0f2714/silent-garden`.

## File Operations

### Created

- `docs/README.md` — карта документации LIVING/ARCHIVED
- `docs/coursework/README.md` — описание архива
- `docs/development/git-flow.md` — модель веток и CI
- `docs/coursework/report/Пояснительная записка.docx` — перенесена
- `docs/coursework/images/git-commit-activity.png`, `git-punch-card.png` — перенесены из `main`
- `thoughts/ledgers/CONTINUITY_ses_044.md` — этот файл

### Moved

- `docs/{00-project-charter,01-requirements,05-implementation,10-final-report}` → `docs/coursework/…`
- `docs/HANDOFF.md` → `thoughts/handoff/2026-06-24-handoff.md`

### Modified

- `README.md`, `ARCHITECTURE.md`, `.gitignore`
- `docs/02-architecture/*`, `docs/06-testing/*`, `docs/07-ui/*`, `docs/08-deployment/*`
- `thoughts/shared/plans/2026-08-06-toolchain-migration-plan.md`
