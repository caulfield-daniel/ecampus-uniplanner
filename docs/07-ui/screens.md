# Экраны и FSD-архитектура фронтенда

Фронтенд переписан по образцу макета «Student Hub» (предоставлен заказчиком) на Feature-Sliced Design + TanStack Query + shadcn/ui + Tailwind v4.

## Слои (`web/src/`)

| Слой | Содержимое |
|---|---|
| `app/` | `App.tsx` (композиция провайдеров + роутинг), `providers/index.tsx` (`AppProviders`, `ErrorBoundary`), `router.tsx` |
| `pages/` | Тонкие страницы-композиции: `LoginPage`, `TodayPage`, `SchedulePage`, `TasksPage`, `NotesPage` |
| `widgets/` | `Layout` (сайдбар+хэдер+`Outlet`), `Sidebar`, `TodayDashboard`, `LessonDetailSheet` |
| `features/` | `auth/login-form`, `task/task-form`, `task/quick-task-dialog`, `note/note-form`, `schedule/week-switcher` |
| `entities/` | `user` (API, query-хуки, `UserProvider`/`useSyncExternalStore`), `task`, `note`, `lesson` — у каждой свой `api/` (fetch-обёртка), `model/queries.ts` (TanStack Query хуки), `ui/` (карточка/строка, `lesson/ui/LessonTag` — бейдж привязки к занятию) |
| `shared/` | `api/` (httpClient, queryClient), `ui/` (вручную вписанные shadcn-компоненты), `lib/` (`cn`, `date`, `subjectColor`), `types/` (реэкспорт сгенерированных из JSON Schema типов) |

Сознательное упрощение относительно «учебника» FSD: `entities` сами держат свои query-хуки и простые CRUD-мутации; `features` выделяются только там, где есть реальная оркестрация с side-effects (диалоги, формы, переключатель недели). Пользовательская сессия вынесена в `entities/user` (API + query-хуки + `UserProvider`), а `app/providers` только композирует провайдеры.

## Экраны

1. **Today (`/`)** — KPI-карточки (занятий сегодня/активных задач/заметок/выполнено), расписание на сегодня, ближайшие 3 задачи, последние 3 заметки. Всё считается на фронте из уже загруженных запросов — отдельного backend-эндпоинта для дашборда нет.
2. **Schedule (`/schedule`)** — переключатель недели (Пн–Вс, `shared/lib/date.ts`), список занятий по дням, `?subject=` фильтрует по дисциплине (клик на предмет в сайдбаре).
3. **LessonDetailSheet** (виджет, не отдельный роут) — слайд-панель справа по клику на занятие: вкладки «Задачи»/«Заметки», отфильтрованные через `GET /tasks?lessonId=`/`GET /notes?lessonId=`. Вкладки «Файлы» нет (см. [10-final-report/summary.md](../coursework/10-final-report/summary.md)).
4. **Tasks (`/tasks`)** — полный список, создание/редактирование через `Dialog`+`TaskForm`, чекбокс выполнения, цвет дедлайна (urgent/soon — вычисляется на фронте). Каждая привязанная к занятию задача помечена бейджем `LessonTag` (дисциплина + дата); `Select` в хэдере фильтрует список по конкретному занятию или «без привязки».
5. **Notes (`/notes`)** — список + `Dialog`+`NoteForm`, аналогичный бейдж `LessonTag` и фильтр по занятию.
6. **Login (`/login`)** — вход/регистрация, `LoginForm`.

Резолюция `lessonId → Lesson` на страницах «Задачи»/«Заметки» (для бейджа и опций фильтра) сделана через `useLessonByIdLookup` (`entities/lesson/model/queries.ts`) — широкое окно `GET /schedule` (±180 дней от текущей даты) для группы пользователя, без отдельного backend-эндпоинта «занятие по id». Сознательное упрощение в духе уже принятых на этом этапе (вычисление на фронте из уже загруженных данных).

## Почему shadcn-компоненты вписаны вручную

`npx shadcn add` рассчитан на стабильные версии Vite/React; на момент написания UI проект использовал Vite 8 beta (были несовместимости с esbuild) — решили не рисковать совместимостью CLI и просто скопировать стандартный, хорошо известный код shadcn-компонентов (`Button`, `Card`, `Badge`, `Sheet`, `Tabs`, `Checkbox`, `Input`, `Textarea`, `Label`, `Dialog`, `Select`, `Avatar`, `Separator`) в `shared/ui/`. Сейчас проект на стабильном Vite 8.2; возврат к CLI — возможная, но не приоритетная задача.
