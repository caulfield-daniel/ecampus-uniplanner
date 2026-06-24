# Ecampus UniPlanner

**Ecampus UniPlanner** — кроссплатформенный студенческий органайзер. Проект предоставляет единый интерфейс для просмотра расписания (автоматически получаемого с сайта университета), управления задачами, заметками и получения уведомлений.

## Траектория курсового проекта

Курсовой проект защищается по **траектории Б («Веб-ориентированная»)** методички дисциплины «Программная инженерия»: тонкий клиент (React), серверная часть на Spring Boot, REST API, PostgreSQL. Архитектурный паттерн — **PCMEF** (Presentation-Control-Mediator-Entity-Foundation), адаптированный под Kotlin/Spring (см. `docs/03-architecture/pcmef-mapping.md`).

KMP shared-модуль и заготовка Android-клиента — архитектурный запас на будущее (мобильный клиент), не входят в обязательные требования трактории Б и реализуются по остаточному принципу, если хватит времени.

## Архитектура

Проект представляет собой монорепозиторий, содержащий:

- **Gradle-модули**:
  - `shared` — общий Kotlin Multiplatform модуль с моделями данных (экспорт для JVM и JS).
  - `backend` — серверное приложение на Kotlin + Spring Boot, слои PCMEF.
  - `android` — задел под будущий Android-клиент на Jetpack Compose (не реализуется в текущей итерации).

- **Внешние сервисы**:
  - `web` — фронтенд на React + TypeScript + Vite.
  - `parser` — микросервис на Python (FastAPI) для парсинга расписания с информационной системы университета (cookie-авторизация). За основу взят проект телеграм-бота [CampusBOT](https://github.com/alikhan902/CampusBOT). Имеет собственную БД `uniplanner_parser`, отдельную от БД бэкенда.

- **Общие артефакты**:
  - `api/*.yaml` — спецификация OpenAPI для взаимодействия между компонентами (живая документация генерируется springdoc на `/api/v1/swagger-ui.html`).

## Технологический стек

| Компонент           | Технологии                                                                 |
|---------------------|----------------------------------------------------------------------------|
| Shared-модуль       | Kotlin Multiplatform (JVM + JS таргеты), kotlinx.serialization              |
| Бэкенд              | Kotlin, Spring Boot 3, Spring Data JPA, Spring Security, JWT, Flyway, PostgreSQL |
| Веб-клиент          | React, TypeScript, Vite                                                    |
| Android-клиент      | Kotlin, Jetpack Compose (план на будущее, не в текущей итерации)           |
| Парсер              | Python, FastAPI, SQLAlchemy, BeautifulSoup, PostgreSQL (своя БД)            |
| Инфраструктура      | Gradle, Docker / docker-compose (опционально)                              |

## Структура проекта

```bash
ecampus-uniplanner/
├── api/                      # OpenAPI спецификация (контракт)
├── backend/                  # Spring Boot бэкенд (PCMEF-слои)
├── shared/                   # KMP-модуль с моделями
├── docs/                     # Документация курсового проекта (по этапам методички)
├── android/                  # Задел под будущий Android-клиент
├── web/                      # React-клиент
├── parser/                   # Python-сервис парсера (на основе CampusBot)
├── gradle/                   # Gradle wrapper и version catalog
├── build.gradle.kts          # Корневой скрипт сборки
├── settings.gradle.kts       # Настройки проекта
├── gradle.properties         # Свойства Gradle
└── README.md                 # Этот файл
```

## Разработка

- Все модели данных находятся в `shared/src/commonMain/kotlin/ru/uniplanner/shared/`.
- Для добавления новой модели:
  1. Создайте data-класс с аннотациями `@Serializable` и `@JsExport`.
  2. Выполните `./gradlew :shared:buildJsDevAndCopy`.
  3. Импортируйте типы в React: `import type { Model } from './shared/kmp/shared.dev.d.ts'`.
- Backend требует JDK 21. Если в `PATH`/`JAVA_HOME` стоит другая версия Java, передайте `JAVA_HOME` явно при вызове Gradle (например, `$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot'` в PowerShell перед `./gradlew`). В Docker-сборке (`backend/Dockerfile`) JDK 21 уже корректный по умолчанию.

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
