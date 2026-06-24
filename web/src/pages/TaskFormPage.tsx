import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import type { TaskInputDto } from '../api/requestTypes';
import type { Task } from '../shared/types';

export function TaskFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const existingTask = (location.state as { task?: Task } | null)?.task;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(existingTask?.description ?? '');
  const [deadline, setDeadline] = useState(existingTask?.deadline.slice(0, 16) ?? '');
  const [priority, setPriority] = useState(existingTask?.priority ?? 3);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: TaskInputDto = {
      title,
      description: description || undefined,
      deadline: new Date(deadline).toISOString(),
      priority,
      completed: existingTask?.completed ?? false,
    };
    try {
      if (id) {
        await apiClient.put(`/tasks/${id}`, input);
      } else {
        await apiClient.post('/tasks', input);
      }
      navigate('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить задачу');
    }
  }

  return (
    <div>
      <h2>{id ? 'Редактирование задачи' : 'Новая задача'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 400 }}>
        <input placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>
              Приоритет {p}
            </option>
          ))}
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
