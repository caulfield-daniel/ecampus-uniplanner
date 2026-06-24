# Этап 05: Реализация

## Обзор этапа

Backend реализован на Kotlin + Spring Boot строго по слоям PCMEF. Зафиксирована структура пакетов, решения по тестам и нюансы интеграции KMP shared-модуля, включая найденный и исправленный баг рассинхрона версий.

## Артефакты

| Файл | Описание |
|---|---|
| [code-structure.md](code-structure.md) | Пакеты backend → слои PCMEF, решения по тестам, интеграция shared-модуля, разбор бага kotlinx-serialization |

## Ключевые технические решения

- Валидация DTO вызывается явно через `ModelValidators` из shared-модуля (не `jakarta.validation`-аннотации) — чтобы не сломать KMP/JS-экспорт.
- Версия `kotlinx-serialization-core`/`-json` явно зафиксирована в `backend/build.gradle.kts` через `dependencyManagement`, так как Spring Dependency Management понижает её через собственный BOM — иначе сериализация DTO падает с `AbstractMethodError` при реальном HTTP-запросе.
- Известная нестабильность Kotlin/JS `.d.mts`-генерации обходится локальной TS-аугментацией типов на фронте, не блокирует разработку.
