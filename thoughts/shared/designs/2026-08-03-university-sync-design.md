---
date: 2026-08-03
topic: "Синхронизация с ИС Университета (ecampus.ncfu.ru)"
status: draft
---

# Дизайн: Синхронизация с ИС Университета

## Problem Statement

Пользователь приложения — студент СКФУ. Сейчас приложение не связано с ИС университета (`ecampus.ncfu.ru`): расписание доступно по публичному справочнику групп, но нет личного контура. Нужна фича: пользователь заходит в отдельное меню «Университет», вводит учётные данные ИС (логин/пароль + капча), приложение подключает его учётную запись и синхронизирует личные данные.

**V1-скоуп:** подключение учётной записи, автоопределение группы, синхронизация расписания. Оценки/посещаемость — плейсхолдеры «скоро» (парсер дорабатывается отдельно).

## Текущее состояние (брейншторм-аудит)

### Реализовано и работает

- **Web:** auth (register/login/me), CRUD задач/заметок, расписание по группе с переключателем недель; FSD-рефакторинг завершён (85 тестов, build/lint/tsc зелёные)
- **Парсер (FastAPI :8000):** скрейпинг расписания и справочников (институты → специальности → группы → занятия) в свою БД `uniplanner_parser`; фоновые `run-full`/`run-incremental`, `status`; аутентификация — общий файл `cookies.json`
- **Backend (Spring Boot :8080):** JWT-auth, CRUD, кэш расписания `CachedLessonEntity`, справочник групп; **уже скомпилирован контур личного входа в ИС** (`/university-auth/captcha|login|status|link`, шифрованное хранение cookies в `UniversityCredentialEntity.encryptedSessionBlob`)
- **Shared (KMP):** модели `CaptchaChallengeResponse`, `UniversityLoginRequest`, `UniversityLinkStatus` уже существуют

### Запроектировано, но не работает (разрывы контрактов)

Сквозной цепочки «личный вход в ИС» нет: backend ожидает от парсера эндпоинты, которых в парсере нет.

| Backend ожидает | В парсере | Статус |
|---|---|---|
| `POST /auth/captcha` | — | 🔴 отсутствует |
| `POST /auth/login` | — | 🔴 отсутствует |
| `GET /parser/lessons` | — | 🔴 отсутствует |
| `GET /parser/groups` | — (данные в БД есть) | 🔴 отсутствует |
| `GET /parser/institutes|specialties` | — | 🔴 отсутствует |
| `POST /parser/sync` (спека) | `POST /run-incremental` | 🟡 рассинхрон имён |
| `api/*.yaml`: `/university-auth/*`, `/parser/lessons` | не описаны | 🔴 спека неполная |

### Текущие проблемы и баги

1. 🔴 **`parser/cookies.json` закоммичен в git** — живая сессия ecampus.ncfu.ru в репозитории. Убрать из git, добавить в `.gitignore`, ротировать сессию
2. 🟡 `useTasksQuery`/`useNotesQuery` без `enabled` — при `lesson === null` уходит запрос без фильтра (хвост FSD-рефакторинга)
3. 🟡 `UniversityLoginRequest` в shared без `@JsExport` (не попадёт в JS-декларации); `ParserSyncResponse` не существует в shared — добавить в единый источник (см. «Единый источник типов»)
4. 🟡 Модель аутентификации парсера (общий cookies.json) конфликтует с per-user моделью backend (шифрованные cookies каждого пользователя) — требует решения (см. Open Questions)

### Полировка vs новое

**Полировка (приоритет):** вычистить `cookies.json`; свести контракты backend↔parser; дополнить `api/*.yaml`; `enabled`-фикс queries; зеркалировать university-модели в web.

**Новое (помимо синхронизации):** задачи из расписания («домашнее задание» по занятию); оценки/посещаемость (после расширения парсера); уведомления о ближайших занятиях/дедлайнах; редактирование профиля.

## Constraints

- Web ходит **только в backend** (`:8080/api/v1`); парсер (`:8000`) — внутренний сервис
- FSD-слои: entities/features/widgets/pages; импорты строго через public API
- UI-тексты на русском; shadcn/ui; TanStack Query; sonner toasts
- Пароль ИС никогда не хранится на web; в backend — только шифрованные cookies сессии
- Дизайн web-части опирается на **существующий контракт backend** (не меняется); парсер дорабатывается отдельным этапом
- **Единый источник типов — KMP shared.** Никаких TS-дублей моделей в web: web получает типы из сгенерированных Kotlin/JS-деклараций (`shared.d.mts`) через цепочку `@/shared/types → @shared/kmp`. Правки типов вносятся только в `shared/ApiModels.kt` (+ `api/*.yaml` как контракт), затем `./gradlew :shared:copyJsToWebDev`

## Approach

0. **Этап 0 (единый источник типов):** в `api/*.yaml` добавить схемы `UniversityLoginRequest` и `ParserSyncResponse`; в `shared/ApiModels.kt` добавить `@JsExport` к `UniversityLoginRequest`, создать `ParserSyncResponse`; пересобрать `./gradlew :shared:copyJsToWebDev`. TS-дублей в web не создавать — типы приезжают через `@/shared/types → @shared/kmp → dto/shared.d.mts`.
1. **Этап A (парсер, отдельная работа):** реализовать `/auth/captcha`, `/auth/login`, `/parser/lessons`, `/parser/groups` (+ опц. profile для автоопределения группы); вычистить `cookies.json` из git
2. **Этап B (web, этот дизайн):** типы (из shared после этапа 0) → `entities/university` → `features/university/*` → `widgets/university` → `pages/university` → роутер/sidebar → тесты на mock контракта backend
3. **Этап C:** сквозная интеграция, когда парсер готов

## Architecture

```
Web ──/university-auth/captcha|login|status|link──▶ Backend (Spring :8080)
Web ──/parser/sync?group&from&to───────────────▶ Backend
Backend ──/auth/captcha, /auth/login────────────▶ Parser (FastAPI :8000) ──▶ ecampus.ncfu.ru
Backend ──/parser/lessons, /parser/groups───────▶ Parser
Backend: cookies пользователя → шифрование → UniversityCredentialEntity
```

## Components (FSD)

```
entities/university/
  api/universityApi.ts        getCaptcha, login, getStatus, unlink
                              (типы — import type из @/shared/types, без локальных дублей)
  model/queries.ts            universityKeys, useUniversityStatusQuery,
                              useUniversityCaptchaMutation, useUniversityLoginMutation,
                              useUniversityUnlinkMutation, useParserSyncMutation
  index.ts

features/university/
  university-login/           UniversityConnectDialog (шаги: креды → капча)
  university-sync/            UniversitySyncPanel (статус + синхронизировать + отключить)
  university-data/            UniversityDataList (расписание, группа, плейсхолдеры)

widgets/university/
  UniversitySection/          собирает карточки, держит состояние диалога

pages/university/             UniversityPage (тонкая обёртка)
app/router                    маршрут /university
widgets/Layout (Sidebar)      пункт меню «Университет»
```

## User Flow

### Подключение

1. Sidebar → «Университет» → `/university`
2. Карточка «Учётная запись ИС» → «Подключить» → диалог
3. Шаг 1: логин + пароль
4. Шаг 2: автоматически подгружается капча (base64) + поле ответа + «Обновить капчу»
5. Submit → `POST /university-auth/login` → toast «Учётная запись подключена» → перечитывание статуса
6. Автостарт первой синхронизации (если группа известна)

### Синхронизация

- «Синхронизировать» → `POST /parser/sync?group&from&to` (текущая неделя) → toast «Синхронизировано N занятий» → инвалидация query расписания
- Расписание показывается существующим SchedulePage; группа авто-подставляется из ИС (или выбирается вручную)

### Отключение

- «Отключить» → confirm → `DELETE /university-auth/link` → статус сброшен; закэшированное публичное расписание остаётся

## UI-состояния карточки «Учётная запись ИС»

- **Не подключено:** описание + «Подключить»
- **Подключено, валидна:** маскированный логин, «Последняя проверка: …», «Синхронизировать», «Отключить»
- **Подключено, сессия истекла** (`isValid: false`): баннер «Сессия ИС истекла» + «Переподключить»
- **Парсер недоступен:** ошибка с retry; интерфейс не падает

## Error Handling

| Кейс | Поведение |
|---|---|
| Неверная капча | точечная ошибка, капча автообновляется, логин/пароль сохраняются |
| Капча истекла (TTL attemptId) | возврат на шаг 1, toast «Капча истекла, повторите» |
| Неверные учётные данные | общее сообщение, без утечки деталей |
| Сессия ИС протухла при синхронизации | toast + перевод статуса в «требуется переподключение» |
| Backend/parser недоступны | error-state с retry, без падения |
| Повторное подключение | confirm «Заменить текущую учётную запись?» (upsert) |

## Testing Strategy

- Unit: типы и валидация моделей (зеркало ModelValidators из shared)
- Component: `UniversityConnectDialog` (шаги, ошибки капчи, обновление капчи), `UniversitySyncPanel` (состояния карточки), MSW-хендлеры на `/university-auth/*` и `/parser/sync`
- Integration: флоу «подключение → статус → синхронизация → отключение» на mock контракта backend

## Open Questions

1. **Автоопределение группы:** нужен ли profile-эндпоинт в парсере, или v1 — ручной выбор группы из справочника?
2. **Личное vs публичное расписание:** отличается ли персональное расписание студента от публичного по группе? Если да — нужен путь синхронизации через личные cookies
3. **Задачи из расписания** — сразу в v1 или отдельной фичей?
