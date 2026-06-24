# Этап 02: Архитектура

## Обзор этапа

Спроектирована архитектура на основе паттерна PCMEF для backend-монолита, с микросервисом-парсером как внешней зависимостью уровня Foundation. Зафиксированы ключевые архитектурные решения в формате ADR.

## Артефакты

| Файл | Описание |
|---|---|
| [pcmef-diagram.md](pcmef-diagram.md) | Трактовка слоёв PCMEF, текущий статус реализации по слоям |
| [microservices.md](microservices.md) | Обоснование выделения парсера в отдельный микросервис, статус живой синхронизации |
| [adr/adr-001-trajectory-and-architecture.md](adr/adr-001-trajectory-and-architecture.md) | Выбор траектории Б и архитектурного стиля |
| [adr/adr-002-parser-microservice.md](adr/adr-002-parser-microservice.md) | Выбор отдельного микросервиса для парсера |
| [adr/adr-003-kmp-shared-module.md](adr/adr-003-kmp-shared-module.md) | Выбор KMP shared-модуля для общих DTO |

## Ключевые архитектурные решения

- Backend — монолит на Kotlin/Spring Boot, строго послойный PCMEF (Control → Mediator → Entity ∪ Foundation), зависимости только сверху вниз, межслойная коммуникация через интерфейсы.
- Парсер — внешняя инфраструктурная зависимость (вызов из Foundation), не отдельный слой PCMEF и не второй UI-клиент.
- Единая модель данных (KMP shared-модуль) для backend и фронтенда.
