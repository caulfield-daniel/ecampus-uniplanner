// Тесты NoteList: рендер списка заметок, пустое состояние (EmptyState), открытие
// диалога создания/редактирования через кнопку «Новая заметка» и удаление через
// AlertDialog с подтверждением (ADR-5 — без подтверждения мутация не вызывается).
// Все хуки из @/entities/note замоканы через vi.mock (react-query и сеть не
// нужны); NoteCard остаётся реальным. NoteForm внутри диалога использует реальные
// мутации из @/entities/note/model/queries, поэтому компонент оборачивается
// в QueryClientProvider.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать
// или запускать вручную с флагом --environment jsdom.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { queryClient } from '@/shared/api/queryClient';
import type { Note } from '@/shared/types';
import { NoteList } from './NoteList';

// Моки хуков сущности note: переопределяем только хуки, остальные экспорты
// (NoteCard, noteKeys) остаются реальными через importOriginal.
const mocks = vi.hoisted(() => ({
  useNotesQuery: vi.fn(),
  useDeleteNoteMutation: vi.fn(),
}));

vi.mock('@/entities/note', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/note')>();
  return { ...actual, ...mocks };
});

// Фикстура заметки — plain-объект приводится к типу Note, как в TaskList.test.tsx.
function makeNote(overrides: Partial<Note> = {}): Note {
  const base = {
    id: 1,
    title: 'Купить канцтовары',
    content: 'Тетради и ручки',
  };
  return { ...base, ...overrides } as Note;
}

// Обёртка с QueryClientProvider: нужна NoteForm, который внутри диалога вызывает
// реальные useCreateNoteMutation/useUpdateNoteMutation (они требуют контекста).
function wrapper({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useNotesQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useDeleteNoteMutation.mockReturnValue({ mutate: vi.fn() } as never);
});

afterEach(cleanup);

describe('NoteList', () => {
  it('рендерит заголовок и список заметок', () => {
    const notes = [makeNote({ id: 1, title: 'Заметка А' }), makeNote({ id: 2, title: 'Заметка Б' })];
    mocks.useNotesQuery.mockReturnValue({ data: notes, isPending: false } as never);

    render(<NoteList />, { wrapper });

    expect(screen.getByRole('heading', { name: 'Заметки' })).toBeTruthy();
    expect(screen.getByText('Заметка А')).toBeTruthy();
    expect(screen.getByText('Заметка Б')).toBeTruthy();
    expect(screen.getByRole('button', { name: /новая заметка/i })).toBeTruthy();
  });

  it('при пустом списке показывает EmptyState с действием создания', () => {
    render(<NoteList />, { wrapper });

    expect(screen.getByText('Заметок пока нет')).toBeTruthy();
    expect(screen.getByText('Создайте первую заметку')).toBeTruthy();
    expect(screen.getByRole('button', { name: /создать заметку/i })).toBeTruthy();
  });

  it('кнопка «Новая заметка» открывает диалог с NoteForm', async () => {
    render(<NoteList />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: /новая заметка/i }));

    // Диалог открыт: заголовок «Новая заметка» и поля формы.
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Новая заметка' })).toBeTruthy());
    expect(screen.getByLabelText('Заголовок')).toBeTruthy();
    expect(screen.getByLabelText('Текст')).toBeTruthy();
  });

  it('удаление требует подтверждения в AlertDialog и вызывает deleteMutation', async () => {
    const note = makeNote({ id: 42, title: 'Удаляемая заметка' });
    mocks.useNotesQuery.mockReturnValue({ data: [note], isPending: false } as never);
    const deleteMutate = vi.fn();
    mocks.useDeleteNoteMutation.mockReturnValue({ mutate: deleteMutate } as never);

    render(<NoteList />, { wrapper });

    // Клик по иконке Trash2 открывает диалог подтверждения.
    fireEvent.click(screen.getByRole('button', { name: 'Удалить заметку' }));

    await waitFor(() => expect(screen.getByText('Удалить заметку?')).toBeTruthy());
    expect(screen.getByText(/будет удалена безвозвратно/)).toBeTruthy();
    // До подтверждения мутация не вызывается.
    expect(deleteMutate).not.toHaveBeenCalled();

    // Подтверждение в AlertDialog вызывает deleteMutation.mutate(note.id).
    fireEvent.click(screen.getByRole('button', { name: 'Удалить' }));

    await waitFor(() => expect(deleteMutate).toHaveBeenCalledTimes(1));
    expect(deleteMutate).toHaveBeenCalledWith(42);
  });
});
