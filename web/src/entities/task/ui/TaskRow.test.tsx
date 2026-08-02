// Тесты презентационного TaskRow: рендер задачи, колбэки onToggle/onClick
// и стилевые классы (line-through для completed, text-destructive для urgent).
// deadlineUrgency — чистая функция из ../model/deadline, мокать её не нужно.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { Task } from '@/shared/types';
import { TaskRow } from './TaskRow';

// Фикстура задачи: plain-объект приводится к типу Task (KMP-класс из shared),
// методы copy/equals Kotlin-класса в тестах не нужны.
function makeTask(overrides: Partial<Task> = {}): Task {
  const base = {
    id: 1,
    title: 'Подготовить отчёт по практике',
    description: null as string | null | undefined,
    deadline: new Date(Date.now() + 100 * 3_600_000).toISOString(), // > 72 ч — normal
    priority: 1,
    completed: false,
  };
  return { ...base, ...overrides } as Task;
}

// Строка дедлайна, которую рендерит TaskRow, — считаем тем же способом,
// чтобы тест не зависел от локали и таймзоны окружения.
function deadlineText(task: Task): string {
  return new Date(task.deadline).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

afterEach(cleanup);

describe('TaskRow', () => {
  it('рендерит заголовок и строку дедлайна', () => {
    const task = makeTask();
    const expectedDeadline = deadlineText(task);

    render(<TaskRow task={task} onToggle={vi.fn()} />);

    expect(screen.getByText(task.title)).toBeTruthy();
    expect(screen.getByText(expectedDeadline)).toBeTruthy();
  });

  it('клик по чекбоксу вызывает onToggle с задачей', () => {
    const task = makeTask();
    const onToggle = vi.fn();

    render(<TaskRow task={task} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(task);
  });

  it('клик по тексту задачи вызывает onClick', () => {
    const task = makeTask();
    const onClick = vi.fn();

    render(<TaskRow task={task} onToggle={vi.fn()} onClick={onClick} />);

    fireEvent.click(screen.getByText(task.title));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('completed-задача получает line-through на заголовке', () => {
    const task = makeTask({ completed: true });

    render(<TaskRow task={task} onToggle={vi.fn()} />);

    const title = screen.getByText(task.title);
    expect(title.className).toContain('line-through');
  });

  it('urgent-дедлайн получает text-destructive на строке даты', () => {
    const urgentDeadline = new Date(Date.now() + 2 * 3_600_000).toISOString(); // < 24 ч — urgent
    const task = makeTask({ deadline: urgentDeadline });
    const expectedDeadline = deadlineText(task);

    render(<TaskRow task={task} onToggle={vi.fn()} />);

    const deadline = screen.getByText(expectedDeadline);
    expect(deadline.className).toContain('text-destructive');
  });
});
