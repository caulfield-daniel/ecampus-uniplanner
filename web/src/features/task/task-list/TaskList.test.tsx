// Тесты TaskList: рендер списка задач, пустое состояние (EmptyState), открытие
// диалога создания/редактирования через кнопку «Новая задача» и удаление через
// AlertDialog с подтверждением (ADR-5 — без подтверждения мутация не вызывается).
// Все хуки из @/entities/task замоканы через vi.mock (react-query и сеть не
// нужны); TaskRow остаётся реальным. TaskForm внутри диалога использует реальные
// мутации из @/entities/task/model/queries, поэтому компонент оборачивается
// в QueryClientProvider.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать
// или запускать вручную с флагом --environment jsdom.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '@/shared/api/queryClient';
import type { Task } from '@/shared/types';
import { TaskList } from './TaskList';

// Моки хуков сущности task: переопределяем только хуки, остальные экспорты
// (TaskRow, taskKeys) остаются реальными через importOriginal.
const mocks = vi.hoisted(() => ({
  useTasksQuery: vi.fn(),
  useToggleTaskMutation: vi.fn(),
  useDeleteTaskMutation: vi.fn(),
}));

vi.mock('@/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/task')>();
  return { ...actual, ...mocks };
});

// Фикстура задачи — plain-объект приводится к типу Task, как в TaskRow.test.tsx.
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

// Обёртка с QueryClientProvider: нужна TaskForm, который внутри диалога вызывает
// реальные useCreateTaskMutation/useUpdateTaskMutation (они требуют контекста).
function wrapper({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useTasksQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useToggleTaskMutation.mockReturnValue({ mutate: vi.fn() } as never);
  mocks.useDeleteTaskMutation.mockReturnValue({ mutate: vi.fn() } as never);
});

afterEach(cleanup);

describe('TaskList', () => {
  it('рендерит заголовок и список задач', () => {
    const tasks = [makeTask({ id: 1, title: 'Задача А' }), makeTask({ id: 2, title: 'Задача Б' })];
    mocks.useTasksQuery.mockReturnValue({ data: tasks, isPending: false } as never);

    render(<TaskList />, { wrapper });

    expect(screen.getByRole('heading', { name: 'Задачи' })).toBeTruthy();
    expect(screen.getByText('Задача А')).toBeTruthy();
    expect(screen.getByText('Задача Б')).toBeTruthy();
    expect(screen.getByRole('button', { name: /новая задача/i })).toBeTruthy();
  });

  it('при пустом списке показывает EmptyState с действием создания', () => {
    render(<TaskList />, { wrapper });

    expect(screen.getByText('Задач пока нет')).toBeTruthy();
    expect(screen.getByText('Создайте первую задачу')).toBeTruthy();
    expect(screen.getByRole('button', { name: /создать задачу/i })).toBeTruthy();
  });

  it('кнопка «Новая задача» открывает диалог с TaskForm', async () => {
    render(<TaskList />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /новая задача/i }));

    // Диалог открыт: заголовок «Новая задача» и поля формы.
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Новая задача' })).toBeTruthy());
    expect(screen.getByLabelText('Название')).toBeTruthy();
    expect(screen.getByLabelText('Дедлайн')).toBeTruthy();
  });

  it('удаление требует подтверждения в AlertDialog и вызывает deleteMutation', async () => {
    const task = makeTask({ id: 42, title: 'Удаляемая задача' });
    mocks.useTasksQuery.mockReturnValue({ data: [task], isPending: false } as never);
    const deleteMutate = vi.fn();
    mocks.useDeleteTaskMutation.mockReturnValue({ mutate: deleteMutate } as never);

    render(<TaskList />, { wrapper });

    // Клик по иконке Trash2 открывает диалог подтверждения.
    fireEvent.click(screen.getByRole('button', { name: 'Удалить задачу' }));

    await waitFor(() => expect(screen.getByText('Удалить задачу?')).toBeTruthy());
    expect(screen.getByText(/будет удалена безвозвратно/)).toBeTruthy();
    // До подтверждения мутация не вызывается.
    expect(deleteMutate).not.toHaveBeenCalled();

    // Подтверждение в AlertDialog вызывает deleteMutation.mutate(task.id).
    fireEvent.click(screen.getByRole('button', { name: 'Удалить' }));

    await waitFor(() => expect(deleteMutate).toHaveBeenCalledTimes(1));
    expect(deleteMutate).toHaveBeenCalledWith(42);
  });
});
