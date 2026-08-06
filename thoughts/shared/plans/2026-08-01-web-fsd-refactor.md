# Web FSD Refactor — Implementation Plan

**Дата:** 2026-08-01
**Дизайн:** `thoughts/shared/designs/2026-08-01-web-fsd-refactor-design.md`
**Цель:** Чистый FSD: направленность импортов, инкапсуляция HTTP/состояния, DI, багфиксы дат, тесты.

**Проверка после каждой таски:** `cd web && npx tsc --noEmit` (и `npm run test` где есть тесты, `npm run build` на ключевых)

---

## Граф зависимостей

```
Фаза 0 (параллельно): 0.1–0.5
Фаза 1 (параллельно): 1.1–1.7 ← зависит от Фазы 0
Фаза 2 (последовательно): 2.1 → 2.2 → 2.3 → 2.4 ← зависит от Фазы 1
Фаза 3 (параллельно): 3.1–3.8 ← зависит от Фазы 1, 2.1
Фаза 4 (параллельно): 4.1–4.8 ← зависит от Фазы 3
Фаза 5 (параллельно): 5.1–5.6 ← зависит от Фаз 2, 3, 4
Фаза 6 (параллельно): 6.1–6.4 ← зависит от Фаз 1–4
```

---

## Фаза 0: Чистка (5 тасок, параллельно)

### 0.1 Fix `.env` — rename `VITE_API_URL` → `VITE_API_BASE_URL`
- **Файл:** `web/.env` (modify)
- **Детали:** `VITE_API_BASE_URL=http://localhost:8080/api/v1`; `VITE_PARSER_URL` — удалить (не используется)
- **Зависит:** — | **Коммит:** `chore(web): fix env var name to VITE_API_BASE_URL`

### 0.2 Add `@shared/*` alias to `vite.config.ts`
- **Файл:** `web/vite.config.ts` (modify)
- **Детали:** alias: `'@' → ./src`, `'@shared' → ./src/shared`; убрать избыточный `'@/shared/types'`
- **Зависит:** — | **Коммит:** `chore(web): add @shared alias to vite config`

### 0.3 Delete empty barrel files
- **Файлы (delete):** `web/src/shared/constants/index.ts`, `web/src/shared/utils/index.ts`, `web/src/shared/validators/index.ts`
- **Зависит:** — | **Коммит:** `chore(web): remove empty barrel files`

### 0.4 Delete unused `separator.tsx`
- **Файл (delete):** `web/src/shared/ui/separator.tsx`
- **Зависит:** — | **Коммит:** `chore(web): remove unused separator component`

### 0.5 Install deps (sonner, vitest, testing-library, msw, jsdom)
- **Файл:** `web/package.json` (modify)
- **Детали:** deps: `sonner`; devDeps: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `msw`; scripts: `"test": "vitest run"`, `"test:watch": "vitest"`
- **Проверка:** `cd web && npm install && npm run build`
- **Зависит:** — | **Коммит:** `chore(web): add sonner, vitest, testing-library, msw deps`

---

## Фаза 1: Shared-фундамент (7 тасок, параллельно)

### 1.1 Create `tokenStorage.ts` — external store
- **Файлы (create):** `web/src/shared/lib/tokenStorage.ts`, `web/src/shared/lib/tokenStorage.test.ts`
- **Детали:** `get/set/clear/subscribe` над `localStorage['auth_token']`; Set-листенеры + notify; SSR-safe (typeof window check)
- **Тесты:** get null/set/clear/subscribe-notify/unsubscribe/SSR
- **Зависит:** 0.3, 0.5 | **Коммит:** `feat(shared): add tokenStorage with subscribe for useSyncExternalStore`

### 1.2 Refactor `httpClient.ts` — factory
- **Файлы:** `web/src/shared/api/httpClient.ts` (modify), `web/src/shared/api/httpClient.test.ts` (create)
- **Детали:** `createHttpClient({ baseUrl, getToken = () => tokenStorage.get() })` → `{ get, post, put, delete }`; default instance `apiClient` с baseUrl из env; 204 → undefined; ошибка → `Error(body?.message)`
- **Тесты:** кастомный getToken, не-ok throw, 204 undefined, default tokenStorage
- **Зависит:** 0.1, 0.5, 1.1 | **Коммит:** `refactor(shared): httpClient factory with DI`

### 1.3 Refactor `queryClient.ts` — factory + global error toast
- **Файлы:** `web/src/shared/api/queryClient.ts` (modify), `web/src/shared/api/queryClient.test.ts` (create)
- **Детали:** `createQueryClient({ staleTime = 30_000, retry = 1 })`; mutations: `retry: 0`, `onError: (e) => toast.error(e.message ?? 'Ошибка выполнения операции')`; export default `queryClient`
- **Зависит:** 0.5 | **Коммит:** `refactor(shared): queryClient factory with global mutation error toast`

### 1.4 Fix `date.ts` — timezone-safe
- **Файлы:** `web/src/shared/lib/date.ts` (modify), `web/src/shared/lib/date.test.ts` (create)
- **Детали:**
  - `toIsoDate` — вручную из локальных компонентов (не `toISOString`!)
  - `toLocalInputValue(date)` → `YYYY-MM-DDTHH:mm` (локальное)
  - `fromLocalInputValue(value)` → Date (локальный парсинг)
  - `formatWeekday(dateIso)` — парсить `YYYY-MM-DD` как локальную дату (split + new Date(y, m-1, d))
- **Тесты:** getWeekStart (среда→пн, вс→пред. пн), toIsoDate (23:00 local → та же дата), round-trip datetime-local
- **Зависит:** 0.5 | **Коммит:** `fix(shared): date.ts timezone-safe helpers`

### 1.5 Create `alert-dialog.tsx` (shadcn pattern)
- **Файлы (create):** `web/src/shared/ui/alert-dialog.tsx`
- **Детали:** Radix `@radix-ui/react-alert-dialog` + cva-стили; экспорт: Root/Trigger/Portal/Overlay/Content/Header/Footer/Title/Description/Action/Cancel (стили по образцу dialog.tsx)
- **Зависит:** 0.5 | **Коммит:** `feat(shared): add AlertDialog component`

### 1.6 Create `empty-state.tsx`
- **Файлы (create):** `web/src/shared/ui/empty-state.tsx`
- **Детали:** `EmptyState({ title, description?, action?, className? })` — центрированная заглушка
- **Зависит:** 0.5 | **Коммит:** `feat(shared): add EmptyState component`

### 1.7 Update `main.tsx` — Toaster
- **Файлы:** `web/src/main.tsx` (modify)
- **Детали:** добавить `<Toaster position="top-right" />` из sonner (+ импорт стилей sonner)
- **Зависит:** 0.5 | **Коммит:** `chore(web): add sonner Toaster`

---

## Фаза 2: entities/user (4 таски, ПОСЛЕДОВАТЕЛЬНО)

### 2.1 Create `userApi.ts`
- **Файлы (create):** `web/src/entities/user/api/userApi.ts`, `web/src/entities/user/api/userApi.test.ts`
- **Детали:** типы `LoginRequest{email,password}`, `RegisterRequest{email,password,fullName,groupName}`, `LoginResponse{token,user}`; `userApi = { me: GET /auth/me, login: POST /auth/login, register: POST /auth/register }`
- **Зависит:** 1.2 | **Коммит:** `feat(entities/user): add userApi`

### 2.2 Create `model/queries.ts`
- **Файлы (create):** `web/src/entities/user/model/queries.ts`, `.test.ts`
- **Детали:** `userKeys = { me: ['user','me'] }`; `useMeQuery(token)` — `enabled: Boolean(token)`, staleTime 5min; `useLoginMutation` — onSuccess: `tokenStorage.set(token)` + invalidate me; `useRegisterMutation` — register → login → set token
- **Зависит:** 2.1 | **Коммит:** `feat(entities/user): add queries`

### 2.3 Create `model/user-context.tsx`
- **Файлы (create):** `web/src/entities/user/model/user-context.tsx`, `.test.tsx`
- **Детали:** `UserProvider`: `token = useSyncExternalStore(tokenStorage.subscribe, tokenStorage.get)`; `useMeQuery(token)`; `logout() = tokenStorage.clear() + queryClient.clear()`; контекст `{ user, token, loading, logout }`; `useAuth()` бросает вне провайдера
- **Зависит:** 2.2, 1.1, 1.3 | **Коммит:** `feat(entities/user): add UserProvider with useSyncExternalStore`

### 2.4 Public API + AppProviders + ErrorBoundary + удаление AuthProvider
- **Файлы (create):** `web/src/entities/user/index.ts`, `web/src/app/providers/index.tsx` (AppProviders: QueryClientProvider → ErrorBoundary → UserProvider), `web/src/app/ErrorBoundary.tsx` (класс, `getDerivedStateFromError`, reload-кнопка, русский текст)
- **Файлы (modify):** `web/src/app/App.tsx` (→ AppProviders), `web/src/main.tsx`
- **Файлы (delete):** `web/src/app/providers/AuthProvider.tsx`
- **Проверка:** `tsc --noEmit && npm run build`
- **Зависит:** 2.3, 1.7 | **Коммит:** `refactor(app): AppProviders, ErrorBoundary, wire entities/user, delete AuthProvider`

---

## Фаза 3: Сущности (8 тасок, параллельно)

### 3.1 Create `model/deadline.ts`
- **Файлы (create):** `web/src/entities/task/model/deadline.ts`, `.test.ts`
- **Детали:** `type DeadlineUrgency = 'urgent'|'soon'|'normal'`; `deadlineUrgency(deadline, completed)` — перенос из TaskRow (completed→normal, <24h→urgent, <72h→soon)
- **Тесты:** fake timers, completed, <24, <72, >=72, past
- **Зависит:** 1.1, 1.4 | **Коммит:** `feat(entities/task): add deadlineUrgency`

### 3.2 Refactor `TaskRow.tsx` — презентационный
- **Файлы:** `web/src/entities/task/ui/TaskRow.tsx` (modify), `.test.tsx` (create)
- **Детали:** props `{ task, onToggle: (task) => void, onClick? }`; убрать `useToggleTaskMutation` и `deadlineUrgency` (импорт из `../model/deadline`)
- **Тесты:** рендер, onToggle, onClick, completed-стиль, urgent-цвет
- **Зависит:** 3.1 | **Коммит:** `refactor(entities/task): TaskRow presentational`

### 3.3 Create `entities/task/index.ts`
- **Детали:** re-export: taskApi+TaskInputDto, taskKeys+5 хуков, deadlineUrgency+DeadlineUrgency, TaskRow
- **Зависит:** 3.1, 3.2 | **Коммит:** `feat(entities/task): public API`

### 3.4 Create `entities/note/index.ts`
- **Детали:** re-export: noteApi+NoteInputDto, noteKeys+4 хука, NoteCard
- **Зависит:** — | **Коммит:** `feat(entities/note): public API`

### 3.5 Refactor `entities/lesson/model/queries.ts`
- **Файлы:** `web/src/entities/lesson/model/queries.ts` (modify), `.test.ts` (create)
- **Детали:** `scheduleKeys = { all, list(group, from, to), groups }`; `useScheduleQuery(group, from, to)` c `enabled: Boolean(group)`; `useGroupsQuery` — ОСТАВИТЬ (публичный API), но ключи через scheduleKeys
- **Зависит:** 1.1 | **Коммит:** `refactor(entities/lesson): scheduleKeys, enabled fix`

### 3.6 Create `entities/lesson/index.ts`
- **Детали:** re-export: scheduleApi, scheduleKeys+2 хука, LessonCard
- **Зависит:** 3.5 | **Коммит:** `feat(entities/lesson): public API`

### 3.7 Verify `entities/user/index.ts` (создан в 2.4)
- **Зависит:** 2.4 | **Коммит:** verify only

### 3.8 Verify `entities/task/model/queries.ts` импорты
- **Детали:** убедиться, что всё через `@/shared/api/httpClient` (уже так); изменений нет
- **Зависит:** 1.2 | **Коммит:** verify only

---

## Фаза 4: Фичи (8 тасок, параллельно)

### 4.1 Create `features/task/task-list/TaskList.tsx`
- **Файлы (create):** `web/src/features/task/task-list/TaskList.tsx`, `.test.tsx`
- **Детали:** инкапсулирует: useTasksQuery + create/update/delete/toggle мутации; Dialog (create/edit через TaskForm); AlertDialog подтверждения удаления; EmptyState; TaskRow с `onToggle={toggleMutation.mutate}`
- **Тесты:** рендер списка, empty state, open create, open edit, delete confirm
- **Зависит:** 3.3, 3.4, 1.5, 1.6 | **Коммит:** `feat(features/task): add TaskList`

### 4.2 Create `features/task/task-list/index.ts`
- **Детали:** `export { TaskList }`
- **Зависит:** 4.1 | **Коммит:** `feat(features/task): task-list public API`

### 4.3 Create `features/note/note-list/NoteList.tsx`
- **Файлы (create):** `web/src/features/note/note-list/NoteList.tsx`, `.test.tsx`
- **Детали:** по аналогии с TaskList (NoteCard, NoteForm, grid-cols-2)
- **Зависит:** 3.4, 1.5, 1.6 | **Коммит:** `feat(features/note): add NoteList`

### 4.4 Create `features/note/note-list/index.ts`
- **Зависит:** 4.3 | **Коммит:** `feat(features/note): note-list public API`

### 4.5 Refactor `features/task/task-form/TaskForm.tsx`
- **Файлы:** `web/src/features/task/task-form/TaskForm.tsx` (modify), `.test.tsx` (create)
- **Детали:** deadline-стейт через `toLocalInputValue(new Date(task.deadline))` при edit; на submit `fromLocalInputValue(deadline).toISOString()`; импорты из `@/entities/task` (TaskInputDto, мутации)
- **Тесты:** пустая форма, pre-fill edit (ожидается `2026-01-20T14:30`), create-submit, update-submit, error
- **Зависит:** 1.4, 3.3 | **Коммит:** `refactor(features/task): TaskForm local datetime`

### 4.6 Verify/refactor `features/note/note-form/NoteForm.tsx`
- **Файлы:** `web/src/features/note/note-form/NoteForm.tsx` (modify imports), `.test.tsx` (create)
- **Детали:** импорты через `@/entities/note`; функциональных изменений нет
- **Зависит:** 3.4 | **Коммит:** `refactor(features/note): verify NoteForm imports`

### 4.7 Refactor `features/auth/login-form/LoginForm.tsx`
- **Файлы:** `web/src/features/auth/login-form/LoginForm.tsx` (modify), `.test.tsx` (create)
- **Детали:** вместо прямых apiClient-вызовов — `useLoginMutation`/`useRegisterMutation` из `@/entities/user`; после успеха `navigate('/')`; disabled при isPending
- **Тесты:** рендер, switch register, login submit, register submit, error
- **Зависит:** 2.4 | **Коммит:** `refactor(features/auth): LoginForm uses entities/user`

### 4.8 Public API для оставшихся фич
- **Файлы (create):** index.ts в task-form, quick-task-dialog, note-form, week-switcher, login-form (каждый: `export { X } from './X'`)
- **Зависит:** 4.5, 4.6, 4.7 | **Коммит:** `feat(features): public API for all slices`

---

## Фаза 5: Виджеты/страницы (6 тасок, параллельно)

### 5.1 Refactor `widgets/Sidebar.tsx`
- **Файлы:** `web/src/widgets/Sidebar.tsx` (modify), `.test.tsx` (create)
- **Детали:** `useAuth` из `@/entities/user`; `useTasksQuery`/`useScheduleQuery` из entities public API; useScheduleQuery c `enabled` (groupName может быть undefined); logout → navigate('/login')
- **Зависит:** 2.4, 3.3, 3.6 | **Коммит:** `refactor(widgets): Sidebar uses entities/user`

### 5.2 Refactor `widgets/TodayDashboard.tsx`
- **Файлы:** `web/src/widgets/TodayDashboard.tsx` (modify), `.test.tsx` (create)
- **Детали:** useAuth/useTasksQuery/useNotesQuery/useScheduleQuery из entities; `toIsoDate(new Date())` — теперь локальная дата (багфикс «Сегодня»); KpiCard остаётся
- **Зависит:** 2.4, 3.3, 3.4, 3.6 | **Коммит:** `refactor(widgets): TodayDashboard uses entities`

### 5.3 Refactor `widgets/LessonDetailSheet.tsx`
- **Файлы:** `web/src/widgets/LessonDetailSheet.tsx` (modify), `.test.tsx` (create)
- **Детали:** импорты через entities/features public API; `useTasksQuery(lesson?.id)` / `useNotesQuery(lesson?.id)` — enabled-фикс на уровне queries (3.5/1.4), здесь только импорты
- **Зависит:** 3.3, 3.4, 3.5 | **Коммит:** `refactor(widgets): LessonDetailSheet imports`

### 5.4 Refactor `pages/TasksPage.tsx` — тонкая
- **Файлы:** `web/src/pages/TasksPage.tsx` (modify), `.test.tsx` (create)
- **Детали:** `return <TaskList />` из `@/features/task/task-list`
- **Зависит:** 4.2 | **Коммит:** `refactor(pages): TasksPage thin`

### 5.5 Refactor `pages/NotesPage.tsx` — тонкая
- **Файлы:** `web/src/pages/NotesPage.tsx` (modify), `.test.tsx` (create)
- **Детали:** `return <NoteList />` из `@/features/note/note-list`
- **Зависит:** 4.4 | **Коммит:** `refactor(pages): NotesPage thin`

### 5.6 Refactor `app/router.tsx`
- **Файлы:** `web/src/app/router.tsx` (modify), `.test.tsx` (create)
- **Детали:** `useAuth` из `@/entities/user`; ProtectedRoute (loading → «Загрузка...», !token → Navigate /login)
- **Зависит:** 2.4 | **Коммит:** `refactor(app): router uses entities/user`

---

## Фаза 6: Тестовая инфраструктура (4 таски, параллельно)

### 6.1 Create `vitest.config.ts` + `vitest.setup.ts`
- **Файлы (create):** `web/vitest.config.ts`, `web/vitest.setup.ts`
- **Детали:** config: environment jsdom, setupFiles, include `src/**/*.test.{ts,tsx}`, globals, те же alias что vite; setup: `@testing-library/jest-dom`, mock sonner (toast), mock matchMedia, mock ResizeObserver
- **Зависит:** 0.5 | **Коммит:** `test(web): vitest config and setup`

### 6.2 Create MSW-хендлеры
- **Файлы (create):** `web/src/mocks/handlers.ts`, `web/src/mocks/server.ts`
- **Детали:** handlers: `/auth/me`, `/auth/login`, `/auth/register`, `/tasks`, `/tasks/:id`, `/notes`, `/notes/:id`, `/schedule`, `/groups`; server через `setupServer(...handlers)`
- **Зависит:** 6.1 | **Коммит:** `test(web): MSW handlers for API mocks`

### 6.3 Прогнать все unit-тесты фаз 1–5
- **Детали:** убедиться, что `npm run test` зелёный целиком; поправить моки при необходимости
- **Зависит:** 6.1, 6.2, все таски фаз 1–5 | **Коммит:** `test(web): fix test suite`

### 6.4 Интеграционный смоук: AppProviders + LoginForm через MSW
- **Файлы (create):** `web/src/app/integration.test.tsx`
- **Детали:** рендер AppProviders + MemoryRouter, реальный MSW: login flow (ввод → submit → токен в tokenStorage → user в контексте)
- **Зависит:** 6.2, 2.4, 4.7 | **Коммит:** `test(web): auth integration test`

---

## Финальная проверка

- `cd web && npm run test` — все тесты зелёные
- `cd web && npm run build` — сборка без ошибок
- `cd web && npm run lint` — eslint чистый
- Проверить отсутствие импортов из `app/providers` в слоях ниже app: `grep -r "app/providers" web/src --include="*.tsx" --include="*.ts" | grep -v "app/"`

## Примечания

- При переезде auth (фаза 2) правки импортов `@/app/providers/AuthProvider` → `@/entities/user` разом в: Sidebar, TodayDashboard, LoginForm, router
- ВАЖНО: после фазы 2 приложение временно сломанным не оставлять — таски 5.x чинят импорты
- Полные кода-сниппеты тасок содержатся в выводе планировщика (tool-output ses_0420c70c5ffeMarYM3aPeau5BW) — при необходимости извлечь
