# Ecampus UniPlanner

**Ecampus UniPlanner** — кроссплатформенный студенческий органайзер. Проект предоставляет единый интерфейс для просмотра расписания (автоматически получаемого с сайта университета), управления задачами, заметками и получения уведомлений.

## Траектория курсового проекта

Курсовой проект защищается по **траектории Б («Веб-ориентированная»)** методички дисциплины «Программная инженерия»: тонкий клиент (React), серверная часть на Spring Boot, REST API, PostgreSQL. Архитектурный паттерн — **PCMEF** (Presentation-Control-Mediator-Entity-Foundation), адаптированный под Kotlin/Spring (см. `docs/02-architecture/pcmef-diagram.md`).

KMP shared-модуль и заготовка Android-клиента — архитектурный запас на будущее (мобильный клиент), не входят в обязательные требования трактории Б и реализуются по остаточному принципу, если хватит времени.

## Архитектура

Проект представляет собой монорепозиторий, содержащий:

- **Gradle-модули**:
  - `shared` — общий Kotlin Multiplatform модуль с моделями данных (экспорт для JVM).
  - `backend` — серверное приложение на Kotlin + Spring Boot, слои PCMEF.
  - `android` — задел под будущий Android-клиент на Jetpack Compose (не реализуется в текущей итерации).

- **Внешние сервисы**:
  - `web` — фронтенд на React + TypeScript + Vite (архитектура FSD).
  - `parser` — микросервис на Python (FastAPI) для парсинга расписания с информационной системы университета (cookie-авторизация). За основу взят проект телеграм-бота [CampusBOT](https://github.com/alikhan902/CampusBOT). Имеет собственную БД `uniplanner_parser`, отдельную от БД бэкенда.

- **Общие артефакты**:
  - `api/*.yaml` — спецификация OpenAPI для взаимодействия между компонентами (живая документация генерируется springdoc на `/api/v1/swagger-ui.html`).
  - `api/schemas/*.json` — JSON Schema, генерируемые из shared-моделей (единый источник типов для web).

## Технологический стек

| Компонент           | Технологии                                                                 |
|---------------------|----------------------------------------------------------------------------|
| Shared-модуль       | Kotlin 2.4.10 Multiplatform (JVM 25), kotlinx-serialization 1.11.0, BuildConfig 6.0.10 |
| Бэкенд              | Kotlin, Spring Boot 3, Spring Data JPA, Spring Security, JWT, Flyway, PostgreSQL (JDK 21) |
| Веб-клиент          | React 19.2, TypeScript 5.9, Vite 8.2, Bun 1.3.14, FSD                    |
| Android-клиент      | Kotlin, Jetpack Compose (план на будущее, не в текущей итерации)           |
| Парсер              | Python, FastAPI, SQLAlchemy, BeautifulSoup, PostgreSQL (своя БД)            |
| Инфраструктура      | Gradle 9.6.1, Docker / docker-compose (опционально), GitHub Actions (CI)          |

## Структура проекта

```bash
ecampus-uniplanner/
├── api/                      # OpenAPI спецификация + JSON Schema (api/schemas)
├── backend/                  # Spring Boot бэкенд (PCMEF-слои)
├── shared/                   # KMP-модуль с моделями
├── docs/                     # Документация курсового проекта (по этапам методички)
├── android/                  # Задел под будущий Android-клиент
├── web/                      # React-клиент (FSD)
├── parser/                   # Python-сервис парсера (на основе CampusBot)
├── gradle/                   # Gradle wrapper и version catalog
├── build.gradle.kts          # Корневой скрипт сборки
├── settings.gradle.kts       # Настройки проекта
├── gradle.properties         # Свойства Gradle
└── README.md                 # Этот файл
```

## Документация по этапам

```
docs/
├── 00-project-charter/   # Паспорт проекта, глоссарий, стейкхолдеры
├── 01-requirements/      # Доменная модель, Use Case, трассировка требований
├── 02-architecture/      # PCMEF, выделение микросервиса-парсера, ADR
├── 03-database/          # ER-диаграмма, миграции, ограничения целостности
├── 04-detailed-design/   # Диаграмма классов, REST API, диаграммы последовательности
├── 05-implementation/    # Структура кода backend, найденные и исправленные баги
├── 06-testing/           # Стратегия тестирования, покрытие
├── 07-ui/                # FSD-архитектура фронтенда, описание экранов
├── 08-deployment/        # Развёртывание (Docker Compose), переменные окружения
├── 09-user-guide/        # Руководство пользователя
├── 10-final-report/      # Итоги проекта, осознанные упрощения
└── HANDOFF.md            # Заметка для продолжения работы в чате (не часть отчёта)
```

Каждый этап содержит свой `README.md` с обзором и списком артефактов — начать стоит с [docs/00-project-charter/README.md](docs/00-project-charter/README.md).

## Разработка

### Модели данных (shared → web)

- Все модели данных находятся в `shared/src/commonMain/kotlin/ru/uniplanner/shared/`.
- Для добавления новой модели:
  1. Создайте data-класс с аннотацией `@Serializable` в `shared/src/commonMain/kotlin/...` и добавьте его в список сериализаторов в `GenerateJsonSchemasMain.kt`.
  2. Выполните `./gradlew :shared:generateJsonSchemas` (JSON Schema в `api/schemas/`) и `./gradlew :shared:jvmTest` (golden-снапшот-тесты `JsonSchemaGeneratorTest`).
  3. В web: `bun run generate:types` — сгенерирует `web/src/shared/types/generated/*.d.ts`; импортируйте: `import type { Model } from '@/shared/types'`.

### Backend

Backend требует JDK 21 (скомпилированный Spring Boot jar без исходников). Для gradle-задач shared/JVM нужен JDK 25 (JVM_25). Если в `PATH`/`JAVA_HOME` стоит другая версия Java, передайте `JAVA_HOME` явно при вызове Gradle (например, `$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot'` в PowerShell перед `./gradlew`). В Docker-сборке (`backend/Dockerfile`) JDK 21 уже корректный по умолчанию.

## CI (drift-guard)

GitHub Actions workflow `.github/workflows/schema-sync.yml` на каждый push в `main` и pull request:

1. `./gradlew :shared:generateJsonSchemas` — регенерация `api/schemas/*.json` из `shared`.
2. `cd web && bun install --frozen-lockfile && bun run generate:types` — регенерация TS-типов web.
3. `git diff --exit-code` — **дрифт-гард**: если регенерация меняет закоммиченные артефакты, задача падает.
4. `bun run build && bun run test && bun run lint` — проверка сборки и тестов.

## Статистика разработки

_Раздел заполняется перед сдачей проекта финальными скриншотами GitHub Insights._

### Метрики Git
- Всего коммитов: TODO
- Период: TODO
- Средняя частота: TODO

### График активности
![Активность коммитов](docs/images/git-commit-activity.png)

### Тепловая карта
![Распределение по времени](docs/images/git-punch-card.png)