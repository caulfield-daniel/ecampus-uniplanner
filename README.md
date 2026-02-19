# Ecampus UniPlanner

**Ecampus UniPlanner** — кроссплатформенный студенческий органайзер. Проект предоставляет единый интерфейс для просмотра расписания (автоматически получаемого с сайта университета), управления задачами, заметками и получения уведомлений.

## Архитектура

Проект представляет собой монорепозиторий, содержащий:

- **Gradle-модули**:
  - `shared` — общий Kotlin Multiplatform модуль с моделями данных (экспорт для JVM и JS).
  - `backend` — серверное приложение на Kotlin + Ktor.
  - `android` — Android-клиент на Jetpack Compose (в разработке).

- **Внешние сервисы**:
  - `web` — фронтенд на React + TypeScript + Vite.
  - `parser` — микросервис на Python (FastAPI) для парсинга данных с информационной системы университета. За основу взят проект телеграм-бота [CampusBOT](https://github.com/alikhan902/CampusBOT).

- **Общие артефакты**:
  - `api/openapi.yaml` — спецификация OpenAPI для взаимодействия между компонентами.

## Предполагаемый технологический стек

| Компонент           | Технологии                                                                 |
|---------------------|----------------------------------------------------------------------------|
| Shared-модуль       | Kotlin Multiplatform, kotlinx.serialization,                               |
| Бэкенд              | Kotlin, Ktor, Supabase (PostgreSQL), JWT                                   |
| Веб-клиент          | React, TypeScript, Vite, shadcn/ui                                         |
| Android-клиент      | Kotlin, Jetpack Compose, Material 3, Room                                  |
| Парсер              | Python, Django / FastAPI, существующий код парсера                         |
| Инфраструктура      | Gradle, GitHub Actions, Docker (опционально)                               |

## Структура проекта

```bash
ecampus-uniplanner/
├── api/                      # OpenAPI спецификация
├── backend/                  # Ktor-бэкенд
├── shared/                   # KMP-модуль с моделями
├── android/                  # Android-клиент (будет реализован)
├── web/                      # React-клиент (будет реализован)
├── parser/                   # Python-сервис парсера (будет реализован на основе CampusBot)
├── gradle/                   # Gradle wrapper и version catalog
├── build.gradle.kts          # Корневой скрипт сборки
├── settings.gradle.kts       # Настройки проекта
├── gradle.properties          # Свойства Gradle
└── README.md                 # Этот файл
```

## Разработка

- Все модели данных находятся в `shared/src/commonMain/kotlin/...`.
- Для добавления новой модели:
  1. Создайте data-класс с аннотациями `@Serializable` и `@JsExport`.
  2. Выполните `./gradlew :shared:buildJsDevAndCopy`.
  3. Импортируйте типы в React: `import type { Model } from './shared/shared.dev.d.ts'`.
