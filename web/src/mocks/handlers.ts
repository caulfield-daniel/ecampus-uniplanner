// MSW-хендлеры для интеграционных тестов: перехватывают fetch-запросы
// httpClient к backend API и отвечают данными из in-memory хранилищ.
// Подключаются через setupServer (msw/node) — см. server.ts.
import { http, HttpResponse } from 'msw';
import type { Lesson, Note, Task, User } from '@/shared/types';

// Базовый URL API — повторяет логику httpClient (VITE_API_BASE_URL ?? дефолт),
// чтобы хендлеры матчили ровно те URL, по которым ходит клиент. MSW сопоставляет
// запрос по полному pathname, поэтому без префикса /api/v1 запросы не совпадут.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';

// Эндпоинты — соответствуют backend (api/*.yaml) и entities/*/api/*.ts.
const auth = `${API_BASE_URL}/auth`;
const tasksEndpoint = `${API_BASE_URL}/tasks`;
const notesEndpoint = `${API_BASE_URL}/notes`;
const schedule = `${API_BASE_URL}/schedule`;
const groups = `${API_BASE_URL}/groups`;

// --- Фабрики фикстур ---
// plain-объекты приводятся к типам KMP-классов (as Task): классы из
// shared.d.mts содержат методы copy/equals/toString, поэтому структурная
// проверка объектных литералов не проходит без каста (как в остальных тестах).

// Отбрасывает undefined-значения из overrides: частичное слияние с undefined
// затёрло бы базовые значения фикстуры (например, description при toggle —
// useToggleTaskMutation шлёт description: task.description ?? undefined).
function cleanOverrides<T extends object>(overrides: Partial<T>): Partial<T> {
  return Object.fromEntries(
    Object.entries(overrides).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
}

// Пользователь: id строковый, как в shared/ApiModels.kt.
export function makeUser(overrides: Partial<User> = {}): User {
  const base = {
    id: '1',
    email: 'student@example.com',
    fullName: 'Иван Иванов',
    groupName: 'ИС-21',
  };
  return { ...base, ...cleanOverrides(overrides) } as User;
}

// Задача: дедлайн — ISO-строка в ближайшем будущем.
export function makeTask(overrides: Partial<Task> = {}): Task {
  const base = {
    id: 1,
    title: 'Подготовить отчёт по практике',
    description: null as string | null | undefined,
    deadline: new Date(Date.now() + 100 * 3_600_000).toISOString(),
    priority: 1,
    completed: false,
  };
  return { ...base, ...cleanOverrides(overrides) } as Task;
}

// Заметка.
export function makeNote(overrides: Partial<Note> = {}): Note {
  const base = { id: 1, title: 'Купить канцтовары', content: 'Тетради и ручки' };
  return { ...base, ...cleanOverrides(overrides) } as Note;
}

// Занятие: поля из shared/ApiModels.kt (Lesson).
export function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  const base = {
    id: 1,
    group: 'ИС-21',
    date: '2026-08-02',
    weekday: 'воскресенье',
    discipline: 'Математика',
    type: 'Лекция',
    timeStart: '09:00',
    timeEnd: '10:30',
    teacher: 'Иванов И.И.',
    room: '301',
    subgroup: null,
  };
  return { ...base, ...cleanOverrides(overrides) } as Lesson;
}

// --- In-memory хранилища CRUD-данных ---
// Состояние живёт между запросами внутри одного теста; между тестами
// сбрасывается через resetDb() в beforeEach интеграционных тестов.

function createInitialTasks(): Task[] {
  return [
    makeTask({ id: 1, title: 'Подготовить отчёт по практике' }),
    makeTask({ id: 2, title: 'Сдать лабораторную по БД', description: 'Часть 2', priority: 2, completed: true }),
  ];
}

function createInitialNotes(): Note[] {
  return [
    makeNote({ id: 1, title: 'Купить канцтовары' }),
    makeNote({ id: 2, title: 'Идеи для курсовой', content: 'Расписание + задачи' }),
  ];
}

let tasks: Task[] = createInitialTasks();
let nextTaskId = 3;
let notes: Note[] = createInitialNotes();
let nextNoteId = 3;

// Сбрасывает in-memory состояние к начальному. Вызывайте в beforeEach
// интеграционных тестов, чтобы CRUD-данные не перетекали между тестами.
export function resetDb(): void {
  tasks = createInitialTasks();
  nextTaskId = 3;
  notes = createInitialNotes();
  nextNoteId = 3;
}

// Расписание и группы — статичные данные, CRUD для них не предусмотрен.
const lessons: Lesson[] = [
  makeLesson(),
  makeLesson({
    id: 2,
    group: 'ИС-21',
    date: '2026-08-03',
    weekday: 'понедельник',
    discipline: 'Базы данных',
    type: 'Практика',
    timeStart: '11:00',
    timeEnd: '12:30',
    teacher: 'Петров П.П.',
    room: '405',
  }),
];

const groupNames: string[] = ['ИС-21', 'ИС-22', 'ИС-23'];

// Достаёт query-параметр lessonId (число) или undefined, если он не задан.
function parseLessonId(request: Request): number | undefined {
  const raw = new URL(request.url).searchParams.get('lessonId');
  if (raw === null) return undefined;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? undefined : parsed;
}

// --- Хендлеры ---

export const handlers = [
  // GET /auth/me: профиль возвращается только при наличии Authorization-заголовка,
  // иначе 401 с ErrorResponse-телом (httpClient читает body.message).
  http.get(`${auth}/me`, ({ request }) => {
    if (!request.headers.get('Authorization')) {
      return HttpResponse.json({ code: 401, message: 'Не авторизован' }, { status: 401 });
    }
    return HttpResponse.json(makeUser());
  }),

  // POST /auth/login: возвращает JWT-токен и профиль; email берём из тела запроса.
  http.post(`${auth}/login`, async ({ request }) => {
    const body = (await request.json()) as { email?: string };
    return HttpResponse.json({ token: 'test-token', user: makeUser({ email: body.email }) });
  }),

  // POST /auth/register: создаёт профиль из тела запроса.
  http.post(`${auth}/register`, async ({ request }) => {
    const body = (await request.json()) as { email?: string; fullName?: string; groupName?: string };
    return HttpResponse.json(
      makeUser({ email: body.email, fullName: body.fullName, groupName: body.groupName }),
    );
  }),

  // GET /tasks: список задач; при ?lessonId= фильтруем по relatedLessonId.
  http.get(tasksEndpoint, ({ request }) => {
    const lessonId = parseLessonId(request);
    const result =
      lessonId === undefined ? tasks : tasks.filter((task) => task.relatedLessonId === lessonId);
    return HttpResponse.json(result);
  }),

  // POST /tasks: создаёт задачу (id из тела или счётчика) и добавляет в хранилище.
  http.post(tasksEndpoint, async ({ request }) => {
    const body = (await request.json()) as {
      id?: number;
      title?: string;
      description?: string | null;
      deadline?: string;
      priority?: number;
      completed?: boolean;
      relatedLessonId?: number;
    };
    const task = makeTask({
      id: body.id ?? nextTaskId++,
      title: body.title ?? 'Новая задача',
      description: body.description,
      deadline: body.deadline ?? new Date().toISOString(),
      priority: body.priority ?? 1,
      completed: body.completed ?? false,
      ...(body.relatedLessonId !== undefined ? { relatedLessonId: body.relatedLessonId } : {}),
    });
    tasks.push(task);
    return HttpResponse.json(task, { status: 201 });
  }),

  // PUT /tasks/:id: обновляет задачу (undefined-поля из тела игнорируются).
  http.put(`${tasksEndpoint}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return HttpResponse.json({ code: 404, message: 'Задача не найдена' }, { status: 404 });
    }
    const body = (await request.json()) as Partial<Task>;
    // Каст: cleanOverrides делает поля опциональными, но tasks[index] уже
    // содержит все обязательные поля — итоговый объект корректен.
    tasks[index] = { ...tasks[index], ...cleanOverrides(body) } as Task;
    return HttpResponse.json(tasks[index]);
  }),

  // DELETE /tasks/:id: удаляет задачу, всегда отвечает 204.
  http.delete(`${tasksEndpoint}/:id`, ({ params }) => {
    const id = Number(params.id);
    tasks = tasks.filter((task) => task.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /notes: список заметок; при ?lessonId= фильтруем по relatedLessonId.
  http.get(notesEndpoint, ({ request }) => {
    const lessonId = parseLessonId(request);
    const result =
      lessonId === undefined ? notes : notes.filter((note) => note.relatedLessonId === lessonId);
    return HttpResponse.json(result);
  }),

  // POST /notes: создаёт заметку (id из тела или счётчика) и добавляет в хранилище.
  http.post(notesEndpoint, async ({ request }) => {
    const body = (await request.json()) as {
      id?: number;
      title?: string;
      content?: string;
      relatedLessonId?: number;
    };
    const note = makeNote({
      id: body.id ?? nextNoteId++,
      title: body.title ?? 'Новая заметка',
      content: body.content ?? '',
      ...(body.relatedLessonId !== undefined ? { relatedLessonId: body.relatedLessonId } : {}),
    });
    notes.push(note);
    return HttpResponse.json(note, { status: 201 });
  }),

  // PUT /notes/:id: обновляет заметку (undefined-поля из тела игнорируются).
  http.put(`${notesEndpoint}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      return HttpResponse.json({ code: 404, message: 'Заметка не найдена' }, { status: 404 });
    }
    const body = (await request.json()) as Partial<Note>;
    // Каст: cleanOverrides делает поля опциональными, но notes[index] уже
    // содержит все обязательные поля — итоговый объект корректен.
    notes[index] = { ...notes[index], ...cleanOverrides(body) } as Note;
    return HttpResponse.json(notes[index]);
  }),

  // DELETE /notes/:id: удаляет заметку, всегда отвечает 204.
  http.delete(`${notesEndpoint}/:id`, ({ params }) => {
    const id = Number(params.id);
    notes = notes.filter((note) => note.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /schedule: расписание; фильтры group/from/to из query-параметров
  // (сравнение ISO-дат строками корректно для формата YYYY-MM-DD).
  http.get(schedule, ({ request }) => {
    const url = new URL(request.url);
    const group = url.searchParams.get('group');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    return HttpResponse.json(
      lessons.filter((lesson) => {
        if (group !== null && lesson.group !== group) return false;
        if (from !== null && lesson.date < from) return false;
        if (to !== null && lesson.date > to) return false;
        return true;
      }),
    );
  }),

  // GET /groups: список названий учебных групп.
  http.get(groups, () => HttpResponse.json(groupNames)),
];
