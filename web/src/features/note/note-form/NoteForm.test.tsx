// Тесты NoteForm: пустая форма, submit на создание (мутация с NoteInputDto,
// где relatedLessonId берётся из prop lessonId) и на обновление ({ id, input }),
// а также показ сообщения об ошибке. Хуки useCreateNoteMutation/
// useUpdateNoteMutation замоканы через vi.mock('@/entities/note') — react-query
// и сеть не нужны.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Note } from '@/shared/types';
import { NoteForm } from './NoteForm';

// Моки мутаций сущности note: переопределяем только два хука, остальные экспорты
// (noteApi, NoteCard и т.д.) остаются реальными через importOriginal.
const mocks = vi.hoisted(() => ({
  useCreateNoteMutation: vi.fn(),
  useUpdateNoteMutation: vi.fn(),
}));

vi.mock('@/entities/note', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/note')>();
  return { ...actual, ...mocks };
});

// Фикстура заметки — plain-объект приводится к типу Note, как в NoteList.test.tsx.
function makeNote(overrides: Partial<Note> = {}): Note {
  const base = {
    id: 1,
    title: 'Купить канцтовары',
    content: 'Тетради и ручки',
  };
  return { ...base, ...overrides } as Note;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useCreateNoteMutation.mockReturnValue({ mutateAsync: vi.fn() } as never);
  mocks.useUpdateNoteMutation.mockReturnValue({ mutateAsync: vi.fn() } as never);
});

afterEach(cleanup);

describe('NoteForm', () => {
  it('без заметки рендерит пустую форму с полями «Заголовок» и «Текст»', () => {
    render(<NoteForm />);

    // Заголовок поля присутствует, инпуты пустые.
    expect(screen.getByText('Заголовок')).toBeTruthy();
    const titleInput = screen.getByLabelText('Заголовок') as HTMLInputElement;
    const contentInput = screen.getByLabelText('Текст') as HTMLTextAreaElement;
    expect(titleInput.value).toBe('');
    expect(contentInput.value).toBe('');
  });

  it('submit вызывает createMutation с NoteInputDto { title, content, relatedLessonId: lessonId }', async () => {
    const createMutateAsync = vi.fn().mockResolvedValue(undefined);
    mocks.useCreateNoteMutation.mockReturnValue({ mutateAsync: createMutateAsync } as never);

    render(<NoteForm lessonId={5} />);

    fireEvent.change(screen.getByLabelText('Заголовок'), { target: { value: 'Новая заметка' } });
    fireEvent.change(screen.getByLabelText('Текст'), { target: { value: 'Текст заметки' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(createMutateAsync).toHaveBeenCalledTimes(1));
    const input = createMutateAsync.mock.calls[0][0];
    expect(input.title).toBe('Новая заметка');
    expect(input.content).toBe('Текст заметки');
    // relatedLessonId подставляется из prop lessonId.
    expect(input.relatedLessonId).toBe(5);
  });

  it('submit вызывает updateMutation с { id, input }', async () => {
    const note = makeNote({ id: 7, title: 'Старая заметка', content: 'Старый текст' });
    const updateMutateAsync = vi.fn().mockResolvedValue(undefined);
    mocks.useUpdateNoteMutation.mockReturnValue({ mutateAsync: updateMutateAsync } as never);

    render(<NoteForm note={note} />);

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(updateMutateAsync).toHaveBeenCalledTimes(1));
    const [arg] = updateMutateAsync.mock.calls[0];
    expect(arg.id).toBe(7);
    // Pre-filled значения заметки отправляются как есть.
    expect(arg.input.title).toBe('Старая заметка');
    expect(arg.input.content).toBe('Старый текст');
  });

  it('при ошибке мутации показывает сообщение', async () => {
    const createMutateAsync = vi.fn().mockRejectedValue(new Error('Сервер недоступен'));
    mocks.useCreateNoteMutation.mockReturnValue({ mutateAsync: createMutateAsync } as never);

    render(<NoteForm />);

    fireEvent.change(screen.getByLabelText('Заголовок'), { target: { value: 'Заметка' } });
    fireEvent.change(screen.getByLabelText('Текст'), { target: { value: 'Текст' } });
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить' }));

    await waitFor(() => expect(screen.getByText('Сервер недоступен')).toBeTruthy());
  });
});
