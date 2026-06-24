# Экраны и FSD-архитектура фронтенда

Фронтенд переписан по образцу макета «Student Hub» (предоставлен заказчиком) на Feature-Sliced Design + TanStack Query + shadcn/ui + Tailwind v4.

## Слои (`web/src/`)

| Слой | Содержимое |
|---|---|
| `app/` | `App.tsx` (композиция `QueryClientProvider`+`AuthProvider`+роутинг), `providers/AuthProvider.tsx`, `router.tsx` |
| `pages/` | Тонкие страницы-композиции: `LoginPage`, `TodayPage`, `SchedulePage`, `TasksPage`, `NotesPage` |
| `widgets/` | `Layout` (сайдбар+хэдер+`Outlet`), `Sidebar`, `TodayDashboard`, `LessonDetailSheet` |
| `features/` | `auth/login-form`, `task/task-form`, `task/quick-task-dialog`, `note/note-form`, `schedule/week-switcher` |
| `entities/` | `task`, `note`, `lesson` — у каждой свой `api/` (fetch-обёртка), `model/queries.ts` (TanStack Query хуки), `ui/` (карточка/строка) |
| `shared/` | `api/` (httpClient, queryClient), `ui/` (вручную вписанные shadcn-компоненты — CLI не использовался из-за Vite 8 beta), `lib/` (`cn`, `date`, `subjectColor`), `kmp/` (мост к KMP DTO) |

Сознательное упрощение относительно «учебника» FSD: `entities` сами держат свои query-хуки и простые CRUD-мутации; `features` выделяются только там, где есть реальная оркестрация с side-effects (диалоги, формы, переключатель недели). Auth не вынесен в `entities/user` — это сквозной провайдер уровня `app`, а не доменная сущность с CRUD.

## Экраны

1. **Today (`/`)** — KPI-карточки (занятий сегодня/активных задач/заметок/выполнено), расписание на сегодня, ближайшие 3 задачи, последние 3 заметки. Всё считается на фронте из уже загруженных запросов — отдельного backend-эндпоинта для дашборда нет.
2. **Schedule (`/schedule`)** — переключатель недели (Пн–Вс, `shared/lib/date.ts`), список занятий по дням, `?subject=` фильтрует по дисциплине (клик на предмет в сайдбаре).
3. **LessonDetailSheet** (виджет, не отдельный роут) — слайд-панель справа по клику на занятие: вкладки «Задачи»/«Заметки», отфильтрованные через `GET /tasks?lessonId=`/`GET /notes?lessonId=`. Вкладки «Файлы» нет (см. `docs/08-final/summary.md`).
4. **Tasks (`/tasks`)** — полный список, создание/редактирование через `Dialog`+`TaskForm`, чекбокс выполнения, цвет дедлайна (urgent/soon — вычисляется на фронте).
5. **Notes (`/notes`)** — список + `Dialog`+`NoteForm`.
6. **Login (`/login`)** — вход/регистрация, `LoginForm`.

## Почему shadcn-компоненты вписаны вручную

`npx shadcn add` рассчитан на стабильные версии Vite/React; в проекте используется Vite 8 beta (уже были несовместимости с esbuild ранее в разработке) — решено не рисковать совместимостью CLI и просто скопировать стандартный, хорошо известный код shadcn-компонентов (`Button`, `Card`, `Badge`, `Sheet`, `Tabs`, `Checkbox`, `Input`, `Textarea`, `Label`, `Dialog`, `Select`, `Avatar`, `Separator`) в `shared/ui/`.
