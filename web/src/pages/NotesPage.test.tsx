// Тест NotesPage: страница — тонкая обёртка над фичей note-list (весь
// CRUD-цикл заметок переехал в NoteList, см. таску 4.3). NoteList замокан
// через vi.mock, чтобы не тянуть react-query и сеть — проверяем только,
// что NotesPage его отрисовывает.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { NotesPage } from './NotesPage';
import { NoteList } from '@/features/note/note-list';

vi.mock('@/features/note/note-list', () => ({
  NoteList: vi.fn(() => <div data-testid="note-list" />),
}));

afterEach(cleanup);

describe('NotesPage', () => {
  it('рендерит NoteList', () => {
    render(<NotesPage />);

    expect(screen.getByTestId('note-list')).toBeTruthy();
    expect(NoteList).toHaveBeenCalledTimes(1);
  });
});
