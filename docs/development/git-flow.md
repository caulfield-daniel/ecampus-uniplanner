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

`.github/workflows/schema-sync.yml` запускается на push в `main`/`dev` и на все pull request:

1. `./gradlew :shared:generateJsonSchemas` — регенерация `api/schemas/*.json`.
2. `bun run generate:types` — регенерация TS-типов web.
3. `git diff --exit-code` — drift-guard: регенерация не должна менять закоммиченные артефакты.
4. `bun run build && bun run test && bun run lint`.

Правило: если меняешь модель в `shared/ApiModels.kt` — регенерируй артефакты и коммить их вместе с изменением, иначе drift-guard упадёт.

## Архив курсового

- Ветка `archive/coursework-2026` и тег `coursework-defense-2026-06` — неизменяемый снимок состояния на момент защиты.
- Документация курсового пакета живёт в `docs/coursework/` и помечена как архивная.
- Восстановить/посмотреть: `git switch --detach coursework-defense-2026-06` (или `git show coursework-defense-2026-06:<path>`).
