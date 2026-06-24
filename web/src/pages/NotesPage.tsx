import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import type { NoteInputDto } from '../api/requestTypes';
import type { Note } from '../shared/types';

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function loadNotes() {
    apiClient
      .get<Note[]>('/notes')
      .then(setNotes)
      .catch((err) => setError(err instanceof Error ? err.message : 'Не удалось загрузить заметки'));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  function startEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setContent('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: NoteInputDto = { title, content };
    try {
      if (editingId) {
        await apiClient.put(`/notes/${editingId}`, input);
      } else {
        await apiClient.post('/notes', input);
      }
      resetForm();
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить заметку');
    }
  }

  async function deleteNote(id: number) {
    await apiClient.delete(`/notes/${id}`);
    loadNotes();
  }

  return (
    <div>
      <h2>Заметки</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
        <input placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Текст" value={content} onChange={(e) => setContent(e.target.value)} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">{editingId ? 'Сохранить' : 'Добавить'}</button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Отмена
            </button>
          )}
        </div>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{note.title}</strong>: {note.content}
            <button onClick={() => startEdit(note)} style={{ marginLeft: '0.5rem' }}>
              Изменить
            </button>
            <button onClick={() => deleteNote(note.id)} style={{ marginLeft: '0.5rem' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
