// Тесты LessonDetailSheet: пустой рендер при lesson === null, открытие Sheet
// с заголовком-дисциплиной и счётчиками вкладок, переключение выполнения задачи
// по клику на чекбокс TaskRow. Хуки сущностей task/note замоканы через vi.mock
// (react-query и сеть не нужны); TaskRow/NoteCard остаются реальными. TaskForm/
// NoteForm внутри Sheet используют реальные мутации — компонент оборачивается
// в QueryClientProvider (по образцу TaskList.test.tsx).
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '@/shared/api/queryClient';
import type { Lesson, Note, Task } from '@/shared/types';
import { LessonDetailSheet } from './LessonDetailSheet';

// Моки хуков сущности task: переопределяем только useTasksQuery/useToggleTaskMutation,
// остальные экспорты (TaskRow, taskKeys) остаются реальными через importOriginal.
const taskMocks = vi.hoisted(() => ({
  useTasksQuery: vi.fn(),
  useToggleTaskMutation: vi.fn(),
}));

vi.mock('@/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/task')>();
  return { ...actual, ...taskMocks };
});

// Моки хуков сущности note: переопределяем только useNotesQuery, NoteCard остаётся реальным.
const noteMocks = vi.hoisted(() => ({
  useNotesQuery: vi.fn(),
}));

vi.mock('@/entities/note', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/note')>();
  return { ...actual, ...noteMocks };
});

// Фикстура занятия — plain-объект приводится к типу Lesson (KMP-класс из shared),
// методы Kotlin-класса в тестах не нужны.
function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  const base = {
    id: 1,
    discipline: 'Математический анализ',
    timeStart: '10:00',
    timeEnd: '11:40',
    teacher: 'Иванов И.И.',
    room: '301',
    type: 'Лекция',
  };
  return { ...base, ...overrides } as Lesson;
}

// Фикстура задачи — как в TaskList.test.tsx.
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

// Фикстура заметки — как в NoteList.test.tsx.
function makeNote(overrides: Partial<Note> = {}): Note {
  const base = {
    id: 1,
    title: 'Купить канцтовары',
    content: 'Тетради и ручки',
  };
  return { ...base, ...overrides } as Note;
}

// Обёртка с QueryClientProvider: нужна на случай рендера TaskForm/NoteForm,
// которые вызывают реальные useCreate*/useUpdate* мутации (требуют контекста).
function wrapper({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  vi.clearAllMocks();
  taskMocks.useTasksQuery.mockReturnValue({ data: [], isPending: false } as never);
  taskMocks.useToggleTaskMutation.mockReturnValue({ mutate: vi.fn() } as never);
  noteMocks.useNotesQuery.mockReturnValue({ data: [], isPending: false } as never);
});

afterEach(cleanup);

describe('LessonDetailSheet', () => {
  it('при lesson === null рендерит null (панель не открывается)', () => {
    const { container } = render(<LessonDetailSheet lesson={null} onClose={vi.fn()} />, { wrapper });

    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('при заданном lesson открывает Sheet с заголовком-дисциплиной и счётчиками вкладок', () => {
    const lesson = makeLesson();
    const tasks = [makeTask({ id: 1, title: 'Задача А' }), makeTask({ id: 2, title: 'Задача Б' })];
    const notes = [makeNote({ id: 1, title: 'Заметка А' })];
    taskMocks.useTasksQuery.mockReturnValue({ data: tasks, isPending: false } as never);
    noteMocks.useNotesQuery.mockReturnValue({ data: notes, isPending: false } as never);

    render(<LessonDetailSheet lesson={lesson} onClose={vi.fn()} />, { wrapper });

    // Sheet открыт (радикс-диалог), заголовок — дисциплина занятия.
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByRole('heading', { name: lesson.discipline })).toBeTruthy();
    // Вкладки со счётчиками из мокнутых query-хуков.
    expect(screen.getByRole('tab', { name: 'Задачи (2)' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Заметки (1)' })).toBeTruthy();
    // Активная вкладка «Задачи» показывает список задач.
    expect(screen.getByText('Задача А')).toBeTruthy();
    expect(screen.getByText('Задача Б')).toBeTruthy();

    // Переключаемся на «Заметки» — контент вкладки появляется.
    // Radix Tabs активирует вкладку по mousedown (не click), см. react-tabs.
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Заметки (1)' }));
    expect(screen.getByText('Заметка А')).toBeTruthy();
  });

  it('клик по чекбоксу TaskRow вызывает toggleTaskMutation с задачей', async () => {
    const lesson = makeLesson();
    const task = makeTask({ id: 3, title: 'Задача для переключения' });
    taskMocks.useTasksQuery.mockReturnValue({ data: [task], isPending: false } as never);
    const toggleMutate = vi.fn();
    taskMocks.useToggleTaskMutation.mockReturnValue({ mutate: toggleMutate } as never);

    render(<LessonDetailSheet lesson={lesson} onClose={vi.fn()} />, { wrapper });

    fireEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => expect(toggleMutate).toHaveBeenCalledTimes(1));
    expect(toggleMutate).toHaveBeenCalledWith(task);
  });
});
