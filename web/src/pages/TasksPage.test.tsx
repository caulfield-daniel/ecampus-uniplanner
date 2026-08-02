// Тесты TasksPage: страница — тонкая обёртка над TaskList. Весь CRUD-цикл задач
// (список, Dialog+TaskForm, удаление через AlertDialog) живёт в
// features/task/task-list (таска 4.1), поэтому здесь достаточно убедиться,
// что TaskList отрисован. Фича замокана, чтобы тест не тянул react-query и сеть.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { TasksPage } from './TasksPage';

// Мок фичи task-list: подменяем TaskList заглушкой и проверяем, что страница
// её рендерит, не обращаясь к реальным хукам.
vi.mock('@/features/task/task-list', () => ({
  TaskList: () => <div>TaskList mock</div>,
}));

afterEach(cleanup);

describe('TasksPage', () => {
  it('рендерит TaskList', () => {
    render(<TasksPage />);

    expect(screen.getByText('TaskList mock')).toBeTruthy();
  });
});
