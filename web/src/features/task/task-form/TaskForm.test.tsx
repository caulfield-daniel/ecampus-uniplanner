// Тесты TaskForm: пустая форма, pre-fill при редактировании (deadline в ЛОКАЛЬНОМ
// времени, а не UTC-срез), submit на создание/обновление и показ сообщения об
// ошибке. Хуки useCreateTaskMutation/useUpdateTaskMutation замоканы через
// vi.mock('@/entities/task') — react-query и сеть не нужны.
// Проверка pre-fill не привязана к таймзоне машины: сравниваем roundtrip
// fromLocalInputValue(value) с исходным UTC-инстансом task.deadline — это защищает
// от регрессии к старому багу slice(0, 16) (UTC-срез в не-UTC таймзоне не прошёл бы).
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Task } from '@/shared/types';
import { fromLocalInputValue } from '@/shared/lib/date';
import { TaskForm } from './TaskForm';

// Моки мутаций сущности task: переопределяем только два хука, остальные экспорты
// (taskApi, TaskRow и т.д.) остаются реальными через importOriginal.
const mocks = vi.hoisted(() => ({
  useCreateTaskMutation: vi.fn(),
  useUpdateTaskMutation: vi.fn(),
}));

vi.mock('@/entities/task', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/task')>();
  return { ...actual, ...mocks };
});

// Фикстура задачи — plain-объект приводится к типу Task, как в TaskList.test.tsx.
function makeTask(overrides: Partial<Task> = {}): Task {
  const base = {
    id: 1,
    title: 'Подготовить отчёт по практике',
    description: null as string | null | undefined,
    deadline: '2026-01-20T14:30:00.000Z',
    priority: 1,
    completed: false,
  };
  return { ...base, ...overrides } as Task;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useCreateTaskMutation.mockReturnValue({ mutateAsync: vi.fn() } as never);
  mocks.useUpdateTaskMutation.mockReturnValue({ mutateAsync: vi.fn() } as never);
});

afterEach(cleanup);

describe('TaskForm', () => {
  it('без задачи рендерит пустую форму с заголовком «Название»', () => {
    render(<TaskForm />);

    // Заголовок поля присутствует, инпуты пустые.
    expect(screen.getByText('Название')).toBeTruthy();
    const titleInput = screen.getByLabelText('Название') as HTMLInputElement;
    const deadlineInput = screen.getByLabelText('Дедлайн') as HTMLInputElement;
    expect(titleInput.value).toBe('');
    expect(deadlineInput.value).toBe('');
  });

  it('при редактировании deadline показывается в локальном времени (не UTC-срез)', () => {
    const task = makeTask({ deadline: '2026-01-20T14:30:00.000Z' });
    render(<TaskForm task={task} />);

    const deadlineInput = screen.getByLabelText('Дедлайн') as HTMLInputElement;
    // Инпут заполнен...
    expect(deadlineInput.value).not.toBe('');
    // ...и парсится обратно в тот же момент времени (roundtrip) — работает в любой
    // таймзоне; старый баг (slice(0,16) UTC-среза) такой roundtrip не дал бы.
    expect(new Date(fromLocalInputValue(deadlineInput.value)).getTime()).toBe(
      new Date(task.deadline).getTime(),
    );
  });

  it('submit вызывает createMutation с input, где deadline — ISO-строка', async () => {
    const createMutateAsync = vi.fn().mockResolvedValue(undefined);
    mocks.useCreateTaskMutation.mockReturnValue({ mutateAsync: createMutateAsync } as never);

    render(<TaskForm />);

    fireEvent.change(screen.getByLabelText('Название'), { target: { value: 'Новая задача' } });
    fireEvent.change(screen.getByLabelText('Дедлайн'), { target: { value: '2026-02-01T10:00' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(createMutateAsync).toHaveBeenCalledTimes(1));
    const input = createMutateAsync.mock.calls[0][0];
    expect(input.title).toBe('Новая задача');
    // Дедлайн отправляется как ISO-строка (локальное значение конвертировано в UTC).
    expect(typeof input.deadline).toBe('string');
    expect(input.deadline.endsWith('Z')).toBe(true);
  });

  it('submit вызывает updateMutation с { id, input }', async () => {
    const task = makeTask({ id: 7, title: 'Старая задача' });
    const updateMutateAsync = vi.fn().mockResolvedValue(undefined);
    mocks.useUpdateTaskMutation.mockReturnValue({ mutateAsync: updateMutateAsync } as never);

    render(<TaskForm task={task} />);

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(updateMutateAsync).toHaveBeenCalledTimes(1));
    const [arg] = updateMutateAsync.mock.calls[0];
    expect(arg.id).toBe(7);
    expect(arg.input.title).toBe('Старая задача');
    // Pre-filled deadline конвертируется обратно в UTC ISO при submit.
    expect(typeof arg.input.deadline).toBe('string');
    expect(arg.input.deadline.endsWith('Z')).toBe(true);
  });

  it('при ошибке мутации показывает сообщение', async () => {
    const createMutateAsync = vi.fn().mockRejectedValue(new Error('Сервер недоступен'));
    mocks.useCreateTaskMutation.mockReturnValue({ mutateAsync: createMutateAsync } as never);

    render(<TaskForm />);

    fireEvent.change(screen.getByLabelText('Название'), { target: { value: 'Задача' } });
    fireEvent.change(screen.getByLabelText('Дедлайн'), { target: { value: '2026-02-01T10:00' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(screen.getByText('Сервер недоступен')).toBeTruthy());
  });
});
