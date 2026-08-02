// Тесты TodayDashboard (виджет «обзор» дня): рендер KPI с загруженными данными,
// пустые состояния секций и переключение задачи через useToggleTaskMutation.
// Все хуки из @/entities/{user,task,note,lesson} замоканы через vi.mock
// (react-query, сеть и UserProvider не нужны); TaskRow/NoteCard/LessonCard
// остаются реальными через importOriginal.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать
// или запускать вручную с флагом --environment jsdom.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Lesson, Note, Task, User } from '@/shared/types';
import { TodayDashboard } from './TodayDashboard';

// Моки хуков сущностей: переопределяем только хуки, остальные экспорты
// (TaskRow, NoteCard, LessonCard) остаются реальными через importOriginal.
const mocks = vi.hoisted(() => ({
  useAuth: vi.fn(),
  useTasksQuery: vi.fn(),
  useToggleTaskMutation: vi.fn(),
  useNotesQuery: vi.fn(),
  useScheduleQuery: vi.fn(),
}));

vi.mock('@/entities/user', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/user')>();
  return { ...actual, useAuth: mocks.useAuth };
});

vi.mock('@/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/task')>();
  return { ...actual, useTasksQuery: mocks.useTasksQuery, useToggleTaskMutation: mocks.useToggleTaskMutation };
});

vi.mock('@/entities/note', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/note')>();
  return { ...actual, useNotesQuery: mocks.useNotesQuery };
});

vi.mock('@/entities/lesson', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/lesson')>();
  return { ...actual, useScheduleQuery: mocks.useScheduleQuery };
});

// Фикстуры: plain-объекты приводятся к типам KMP-классов, как в других тестах.
function makeTask(overrides: Partial<Task> = {}): Task {
  const base = {
    id: 1,
    title: 'Подготовить отчёт по практике',
    description: null as string | null | undefined,
    deadline: new Date(Date.now() + 100 * 3_600_000).toISOString(),
    priority: 1,
    completed: false,
  };
  return { ...base, ...overrides } as Task;
}

function makeNote(overrides: Partial<Note> = {}): Note {
  const base = { id: 1, title: 'Купить канцтовары', content: 'Тетради и ручки' };
  return { ...base, ...overrides } as Note;
}

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
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
  return { ...base, ...overrides } as Lesson;
}

// Пользователь с группой: расписание запрашивается по groupName.
function makeUser(overrides: Partial<User> = {}): User {
  const base = { id: '1', email: 'student@example.com', fullName: 'Иван Иванов', groupName: 'ИС-21' };
  return { ...base, ...overrides } as User;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useAuth.mockReturnValue({ user: null } as never);
  mocks.useScheduleQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useTasksQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useNotesQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useToggleTaskMutation.mockReturnValue({ mutate: vi.fn() } as never);
});

afterEach(cleanup);

describe('TodayDashboard', () => {
  it('рендерит KPI и контент секций с загруженными данными', () => {
    mocks.useAuth.mockReturnValue({ user: makeUser() } as never);
    mocks.useScheduleQuery.mockReturnValue({ data: [makeLesson()], isPending: false } as never);
    mocks.useTasksQuery.mockReturnValue({
      data: [
        makeTask({ id: 1, title: 'Задача А', completed: false }),
        makeTask({ id: 2, title: 'Задача Б', completed: false }),
        makeTask({ id: 3, title: 'Задача В', completed: true }),
        makeTask({ id: 4, title: 'Задача Г', completed: true }),
        makeTask({ id: 5, title: 'Задача Д', completed: true }),
      ],
      isPending: false,
    } as never);
    mocks.useNotesQuery.mockReturnValue({
      data: [
        makeNote({ id: 1, title: 'Заметка А' }),
        makeNote({ id: 2, title: 'Заметка Б' }),
        makeNote({ id: 3, title: 'Заметка В' }),
        makeNote({ id: 4, title: 'Заметка Г' }),
      ],
      isPending: false,
    } as never);

    render(<TodayDashboard onSelectLesson={vi.fn()} />);

    // KPI-карточки: заголовки и значения, посчитанные из загруженных данных
    // (1 занятие, 2 активных задачи, 3 выполненных, 4 заметки).
    expect(screen.getByText('Занятий сегодня')).toBeTruthy();
    expect(screen.getByText('Активных задач')).toBeTruthy();
    expect(screen.getByText('Заметок')).toBeTruthy();
    expect(screen.getByText('Выполнено задач')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('4')).toBeTruthy();

    // Контент секций рендерится через реальные LessonCard/TaskRow/NoteCard.
    expect(screen.getByText('Математика')).toBeTruthy();
    expect(screen.getByText('Задача А')).toBeTruthy();
    expect(screen.getByText('Задача Б')).toBeTruthy();
    expect(screen.getByText('Заметка Г')).toBeTruthy();
  });

  it('при пустых данных показывает пустые состояния секций', () => {
    render(<TodayDashboard onSelectLesson={vi.fn()} />);

    expect(screen.getByText('Сегодня занятий нет')).toBeTruthy();
    expect(screen.getByText('Нет активных задач')).toBeTruthy();
    expect(screen.getByText('Заметок пока нет')).toBeTruthy();
  });

  it('клик по чекбоксу задачи вызывает toggleMutation.mutate', async () => {
    const task = makeTask({ id: 7, title: 'Переключаемая задача' });
    const toggleMutate = vi.fn();
    mocks.useAuth.mockReturnValue({ user: makeUser() } as never);
    mocks.useTasksQuery.mockReturnValue({ data: [task], isPending: false } as never);
    mocks.useToggleTaskMutation.mockReturnValue({ mutate: toggleMutate } as never);

    render(<TodayDashboard onSelectLesson={vi.fn()} />);

    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => expect(toggleMutate).toHaveBeenCalledTimes(1));
    expect(toggleMutate).toHaveBeenCalledWith(task);
  });
});
