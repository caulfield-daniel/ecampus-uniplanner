# Документация Ecampus UniPlanner

Проект вырос из курсового по дисциплине «Программная инженерия»: курсовой был защищён в июне 2026, после чего проект развивается как самостоятельный продукт. Требования методички и траектории Б больше не являются ограничениями.

## Приоритет источников истины

1. **Код** — единственный источник истины о поведении системы.
2. **`ARCHITECTURE.md`** (корень репозитория) — актуальная архитектура и принципы.
3. **`docs/` (LIVING)** — поддерживаемая документация по компонентам.
4. **`docs/coursework/` (ARCHIVED)** — исторический пакет курсового проекта. Не обновляется, не является источником истины. Сохранён для истории и отчётности.

Если живой документ противоречит коду — прав код, документ нужно исправить.

## Карта документации

### LIVING — поддерживается

| Раздел | Содержимое |
|---|---|
| [../README.md](../README.md) | Обзор проекта, стек, быстрый старт |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Архитектура, принципы, структура, data flow |
| [../CODE_STYLE.md](../CODE_STYLE.md) | Стиль кода и соглашения |
| [02-architecture/](02-architecture/README.md) | PCMEF, микросервис-парсер, ADR |
| [03-database/](03-database/README.md) | ER-диаграмма, миграции, ограничения целостности |
| [04-detailed-design/](04-detailed-design/README.md) | Диаграмма классов, REST API, последовательности |
| [06-testing/](06-testing/README.md) | Стратегия тестирования и покрытие |
| [07-ui/](07-ui/README.md) | FSD-архитектура фронтенда, экраны |
| [08-deployment/](08-deployment/README.md) | Развёртывание, переменные окружения |
| [09-user-guide/](09-user-guide/README.md) | Руководство пользователя |
| [development/](development/git-flow.md) | Процесс разработки: ветки, релизы, CI |

### ARCHIVED — курсовой пакет (защищён в июне 2026)

| Раздел | Содержимое |
|---|---|
| [coursework/00-project-charter/](coursework/00-project-charter/README.md) | Паспорт, глоссарий, стейкхолдеры |
| [coursework/01-requirements/](coursework/01-requirements/README.md) | Доменная модель, Use Case, трассировка требований |
| [coursework/05-implementation/](coursework/05-implementation/README.md) | Структура кода backend на момент защиты, найденные баги |
| [coursework/10-final-report/](coursework/10-final-report/README.md) | Итоги проекта и осознанные упрощения |
| [coursework/report/](coursework/report/) | Пояснительная записка (docx) |
| [coursework/images/](coursework/images/) | Скриншоты GitHub Insights для отчёта |

Замороженный git-снимок защищённого состояния: ветка `archive/coursework-2026`, тег `coursework-defense-2026-06`.

## С чего начать

- Новый разработчик: [../README.md](../README.md) → [../ARCHITECTURE.md](../ARCHITECTURE.md) → [development/git-flow.md](development/git-flow.md).
- Работа с API: [04-detailed-design/api-design.md](04-detailed-design/api-design.md) + `api/*.yaml`.
- Понять, как менять модели данных: раздел «Модели данных (shared → web)» в [../README.md](../README.md).
