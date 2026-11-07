# Процесс разработки: ветки, релизы, CI

## Модель веток

```
archive/coursework-2026   ← замороженный снимок курсового (защита, июнь 2026)
main                      ← релизы продукта (только merge из dev)
dev                       ← интеграция, сюда идут все фичи
feat/*  fix/*  chore/*    ← рабочие ветки, создаются от dev
```

| Ветка | Назначение | Правила |
|---|---|---|
| `main` | Релизное состояние продукта | Только merge из `dev`; теги `vX.Y.Z`; force-push запрещён |
| `dev` | Интеграционная ветка | Все изменения вливаются сюда через PR; CI обязателен |
| `feat/*`, `fix/*`, `chore/*`, `spike/*` | Рабочие ветки | Создаются от `dev`, живут до merge, после — удаляются |
| `archive/*` | Исторические снимки | Read-only: не мержатся, не переписываются, не удаляются |

## Поток изменений

1. `git switch dev && git pull` → `git switch -c feat/<краткое-имя>`
2. Коммиты в рабочей ветке (один логический шаг — один коммит).
3. PR в `dev` → зелёный CI → merge (squash или merge-коммит, без force).
4. Периодически: PR `dev → main` → тег `vX.Y.Z` → GitHub Release.

## CI

GitHub Actions workflow `.github/workflows/ci.yml` запускается на push в `main`/`dev`, на все pull request и вручную (`workflow_dispatch`). Джобы:

| Джоба | Что проверяет |
|---|---|
| `schema-drift` | `./gradlew :shared:generateJsonSchemas` + `bun run generate:types` → `git diff --exit-code` (дрейф артефактов = fail) |
| `shared` | `./gradlew :shared:jvmTest` — golden-снапшоты JSON Schema и валидаторы |
| `backend` | `./gradlew :backend:test` на service-контейнере `postgres:16` (сервисные тесты + `contextLoads`); JaCoCo-отчёт артефактом |
| `web` | `bun run build`, `bun run test`, `bun run lint` |

Правило: если меняешь модель в `shared/ApiModels.kt` — регенерируй артефакты и коммить их вместе с изменением, иначе `schema-drift` упадёт.

Локальный эквивалент перед PR:

```bash
./gradlew :shared:generateJsonSchemas && (cd web && bun run generate:types) && git diff --exit-code
./gradlew :shared:jvmTest
./gradlew :backend:test          # нужен живой PostgreSQL (docker compose up -d postgres-backend)
cd web && bun run build && bun run test && bun run lint
```

## Архив курсового

- Ветка `archive/coursework-2026` и тег `coursework-defense-2026-06` — неизменяемый снимок состояния на момент защиты.
- Документация курсового пакета живёт в `docs/coursework/` и помечена как архивная.
- Восстановить/посмотреть: `git switch --detach coursework-defense-2026-06` (или `git show coursework-defense-2026-06:<path>`).
