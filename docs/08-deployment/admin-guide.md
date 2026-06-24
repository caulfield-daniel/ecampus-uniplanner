# Руководство администратора: развёртывание

## Backend + PostgreSQL (Docker Compose)

```bash
docker compose up -d --build backend
```

Compose-файл (`docker-compose.yml`) поднимает:

| Сервис | Образ | Порт | Назначение |
|---|---|---|---|
| `postgres-backend` | `postgres:16` | 5432 | БД `uniplanner_backend`, healthcheck `pg_isready` |
| `backend` | собран из `backend/Dockerfile` | 8080 | Spring Boot, embedded Tomcat, context-path `/api/v1` |

При старте `backend` ждёт `postgres-backend` (`condition: service_healthy`), затем Flyway автоматически применяет все миграции (`V1`…`V4`).

### Переменные окружения backend

| Переменная | Назначение |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` | Подключение к PostgreSQL |
| `JWT_SECRET` | Секрет для подписи JWT (HS256, минимум 256 бит) |
| `UNIVERSITY_AUTH_ENCRYPTION_KEY` | Ключ AES-GCM для шифрования личной сессии ИС вуза |
| `CORS_ORIGINS` | Разрешённые origin для фронтенда (через запятую) |

В `docker-compose.yml` заданы dev-значения — для продакшена их нужно переопределить через `.env`/секреты оркестратора, не хранить в репозитории.

### Проверка после запуска

```bash
curl http://localhost:8080/api/v1/actuator/health
# {"status":"UP"}
```

Swagger UI: `http://localhost:8080/api/v1/swagger-ui/index.html`.

## Парсер-микросервис

Запускается отдельно (своя БД `uniplanner_parser`, локальный PostgreSQL — порт 5432, отдельный от Docker-контейнера backend'а; см. `parser/.env`). В текущей итерации не включён в общий `docker-compose.yml` backend'а.

```bash
cd parser
./venv/Scripts/python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Ручная синхронизация расписания (до появления админ-панели)

Админ-панель для управления синхронизацией отложена (см. [10-final-report/summary.md](../10-final-report/summary.md)). До её реализации синхронизация выполняется вручную в два шага: сначала парсер сам обновляет своё хранилище живыми данными с сайта вуза, затем backend забирает уже накопленное у парсера в свой кэш `cached_lessons`.

**Шаг 1 — re-scrape живых данных парсером.** Эндпоинт расписания вуза не требует авторизации (подтверждено эмпирически, см. [02-architecture/microservices.md](../02-architecture/microservices.md)) — `run-incremental` использует `NoAuthAuthenticator` и не зависит от `parser/cookies.json`:

```bash
curl -X POST http://localhost:8000/api/v1/parser/run-incremental \
  -H "Content-Type: application/json" \
  -d '{"startDate":"2026-06-24","endDate":"2026-07-21","groups":[]}'
# groups: [] — обновить все уже известные группы; либо список конкретных названий

curl http://localhost:8000/api/v1/parser/status
# {"status":"running"|"success"|"error", "lastUpdate":..., "groupsCount":..., "lessonsCount":...}
```

`run-full` (вместо `run-incremental`) дополнительно переоткрывает институты/специальности/группы — нужен только если появились новые группы, не для обычного обновления расписания. В отличие от `run-incremental`, `run_full_parse` пока использует `CookieFileAuthenticator` (не проверялось, нужна ли там авторизация) — если `status` стал `error` именно на полном парсинге, проблема может быть в протухшей cookie-сессии сервисного аккаунта:
1. Войти на ecampus.ncfu.ru в браузере под сервисным аккаунтом.
2. Экспортировать cookies сессии (например, расширением браузера для экспорта cookies) в формате `[{"name": "...", "value": "..."}, ...]` или плоского словаря `{"name": "value"}`.
3. Сохранить как `parser/cookies.json`, повторить запрос.

**Шаг 2 — забрать данные парсера в кэш backend'а** (нужен JWT — войти в приложение и взять токен):

```bash
curl -X POST "http://localhost:8080/api/v1/parser/sync?group=ИВТ-21-1&from=2026-06-24&to=2026-07-21" \
  -H "Authorization: Bearer <JWT>"
```

Эндпоинт принимает одну группу за вызов. Для синхронизации всех групп сразу — `parser/bulk_sync.py` (проходит циклом по всем группам из `GET /parser/groups`):

```bash
cd parser
BACKEND_JWT=<JWT> ./venv/Scripts/python.exe bulk_sync.py --from 2026-03-02 --to 2026-04-27
```

Проверено на полном прогоне: 866/866 групп синхронизированы без ошибок (после исправления бага из [05-implementation/code-structure.md](../05-implementation/code-structure.md) — повторный sync уже существующих данных требовал `@Transactional`, отсутствовавшего на `ParserSyncServiceImpl.syncGroupSchedule`).

## Фронтенд

Dev-режим:

```bash
cd web
npm install
npm run dev
```

`VITE_API_BASE_URL` (по умолчанию `http://localhost:8080/api/v1`) — адрес backend'а, см. `web/.env`.

Продакшен-сборка:

```bash
npm run build   # tsc -b && vite build → web/dist
```

`web/dist` — статические файлы, разворачиваются любым веб-сервером/CDN; отдельный Dockerfile для фронтенда в текущей итерации не заведён (осознанное упрощение трактории Б, не требуется методичкой).

## Известные ограничения развёртывания

- Нет CI/CD-пайплайна — сборка и проверка выполняются вручную перед защитой (не обязательное требование трактории Б).
- Синхронизация расписания (`POST /parser/sync`) — без cron, вызывается вручную (см. UC-07 в [01-requirements/use-case-specifications.md](../01-requirements/use-case-specifications.md)).
