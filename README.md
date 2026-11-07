# Ecampus UniPlanner

**Ecampus UniPlanner** — кроссплатформенный студенческий органайзер: единый интерфейс для расписания (автоматически получаемого с сайта университета), задач, заметок и уведомлений.

## Статус проекта

Проект вырос из курсового по дисциплине «Программная инженерия» (защищён в июне 2026) и развивается как самостоятельный продукт. Требования методички и траектории Б больше не являются ограничениями развития.

- **Актуальная документация:** [docs/README.md](docs/README.md) — карта разделов со статусами LIVING / ARCHIVED.
- **Курсовой пакет:** [docs/coursework/](docs/coursework/README.md) — архив, не обновляется.
- **Снимок защищённого состояния:** тег `coursework-defense-2026-06`, ветка `archive/coursework-2026`.
- **Процесс разработки:** [docs/development/git-flow.md](docs/development/git-flow.md).

## Архитектура

Монорепозиторий:

- **Gradle-модули**:
  - `shared` — Kotlin Multiplatform модуль с моделями данных и генератором JSON Schema; единственный источник истины для DTO.
  - `backend` — серверное приложение на Kotlin + Spring Boot, слои PCMEF.
  - `android` — задел под будущий Android-клиент на Jetpack Compose (каталога пока нет; план).
- **Внешние сервисы**:
  - `web` — фронтенд на React + TypeScript + Vite (архитектура FSD).
  - `parser` — микросервис на Python (FastAPI) для парсинга расписания с информационной системы университета (cookie-авторизация). За основу взят проект телеграм-бота [CampusBOT](https://github.com/alikhan902/CampusBOT). Имеет собственную БД `uniplanner_parser`, отдельную от БД бэкенда.
- **Общие артефакты**:
  - `api/*.yaml` — спецификация OpenAPI для взаимодействия между компонентами (живая документация генерируется springdoc на `/api/v1/swagger-ui.html`).
  - `api/schemas/*.json` — JSON Schema, генерируемые из shared-моделей (единый источник типов для web).

Подробнее — [ARCHITECTURE.md](ARCHITECTURE.md).

## Технологический стек

| Компонент           | Технологии                                                                 |
|---------------------|----------------------------------------------------------------------------|
| Shared-модуль       | Kotlin 2.4.10 Multiplatform (JVM 25), kotlinx-serialization 1.11.0, BuildConfig 6.0.10 |
| Бэкенд              | Kotlin, Spring Boot 3, Spring Data JPA, Spring Security, JWT, Flyway, PostgreSQL (target JDK 21) |
| Веб-клиент          | React 19.2, TypeScript 5.9, Vite 8.2, Bun 1.3.14, FSD                    |
| Android-клиент      | Kotlin, Jetpack Compose (план; каталога пока нет)                          |
| Парсер              | Python, FastAPI, SQLAlchemy, BeautifulSoup, PostgreSQL (своя БД)            |
| Инфраструктура      | Gradle 9.6.1, Docker / docker-compose (опционально), GitHub Actions (CI)          |

## Структура проекта

```bash
ecampus-uniplanner/
├── api/                      # OpenAPI спецификация + JSON Schema (api/schemas)
├── backend/                  # Spring Boot бэкенд (PCMEF-слои), исходники на Kotlin
├── shared/                   # KMP-модуль с моделями + генератор JSON Schema
├── docs/                     # Документация (см. docs/README.md)
│   ├── 02-architecture/ … 09-user-guide/   # LIVING
│   ├── coursework/           # ARCHIVED — пакет курсового проекта
│   └── development/          # Процесс разработки (ветки, релизы, CI)
├── web/                      # React-клиент (FSD)
├── parser/                   # Python-сервис парсера (на основе CampusBot)
├── gradle/                   # Gradle wrapper и version catalog
├── build.gradle.kts          # Корневой скрипт сборки
├── settings.gradle.kts       # Настройки проекта
├── gradle.properties         # Свойства Gradle
└── README.md                 # Этот файл
```

## Документация

Навигация — [docs/README.md](docs/README.md). Кратко:

| Раздел | Содержимое |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Архитектура, принципы, структура, data flow |
| [CODE_STYLE.md](CODE_STYLE.md) | Стиль кода и соглашения |
| [docs/02-architecture/](docs/02-architecture/README.md) | PCMEF, микросервис-парсер, ADR |
| [docs/03-database/](docs/03-database/README.md) | ER-диаграмма, миграции |
| [docs/04-detailed-design/](docs/04-detailed-design/README.md) | Диаграмма классов, REST API |
| [docs/06-testing/](docs/06-testing/README.md) | Стратегия тестирования |
| [docs/07-ui/](docs/07-ui/README.md) | FSD и экраны |
| [docs/08-deployment/](docs/08-deployment/README.md) | Развёртывание |
| [docs/09-user-guide/](docs/09-user-guide/README.md) | Руководство пользователя |
| [docs/development/](docs/development/git-flow.md) | Ветки, релизы, CI |
| [docs/coursework/](docs/coursework/README.md) | Архив курсового проекта |

## Разработка

### Модели данных (shared → web)

- Все модели данных находятся в `shared/src/commonMain/kotlin/ru/uniplanner/shared/`.
- Для добавления новой модели:
  1. Создайте data-класс с аннотацией `@Serializable` в `shared/src/commonMain/kotlin/...` и добавьте его в список сериализаторов в `GenerateJsonSchemasMain.kt`.
  2. Выполните `./gradlew :shared:generateJsonSchemas` (JSON Schema в `api/schemas/`) и `./gradlew :shared:jvmTest` (golden-снапшот-тесты `JsonSchemaGeneratorTest`).
  3. В web: `bun run generate:types` — сгенерирует `web/src/shared/types/generated/*.d.ts`; импортируйте: `import type { Model } from '@/shared/types'`.

### Backend

Исходники — `backend/src/main/kotlin/ru/uniplanner/backend/` (PCMEF-слои), модуль подключён в `settings.gradle.kts`. Сборка/тесты: `./gradlew :backend:build`, `./gradlew :backend:test`.

Backend компилируется под JDK 21 (`sourceCompatibility`/`jvmTarget`), для gradle-задач shared/JVM нужен JDK 25 (JVM_25). Если в `PATH`/`JAVA_HOME` стоит другая версия Java, передайте `JAVA_HOME` явно при вызове Gradle (например, `$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot'` в PowerShell перед `./gradlew`). В Docker-сборке (`backend/Dockerfile`) JDK 21 уже корректный по умолчанию.

### Web

```bash
cd web
bun install
bun run dev      # Vite dev server, :5173
bun run test     # vitest
bun run lint
bun run build
```

### Parser

```bash
cd parser
python -m venv venv && venv/Scripts/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload   # :8000, docs at /docs
```

## CI (drift-guard)

GitHub Actions workflow `.github/workflows/schema-sync.yml` на push в `main`/`dev` и pull request:

1. `./gradlew :shared:generateJsonSchemas` — регенерация `api/schemas/*.json` из `shared`.
2. `cd web && bun install --frozen-lockfile && bun run generate:types` — регенерация TS-типов web.
3. `git diff --exit-code` — **дрифт-гард**: если регенерация меняет закоммиченные артефакты, задача падает.
4. `bun run build && bun run test && bun run lint` — проверка сборки и тестов.

## Ветки и релизы

`main` — релизы, `dev` — интеграция, рабочие ветки — `feat/*`, `fix/*`, `chore/*`; `archive/*` — замороженные снимки. Полные правила — [docs/development/git-flow.md](docs/development/git-flow.md).
