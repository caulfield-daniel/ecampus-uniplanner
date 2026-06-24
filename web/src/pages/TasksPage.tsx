import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import type { TaskInputDto } from '../api/requestTypes';
import type { Task } from '../shared/types';

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  function loadTasks() {
    apiClient
      .get<Task[]>('/tasks')
      .then(setTasks)
      .catch((err) => setError(err instanceof Error ? err.message : 'Не удалось загрузить задачи'));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function toggleCompleted(task: Task) {
    const input: TaskInputDto = {
      title: task.title,
      description: task.description ?? undefined,
      deadline: task.deadline,
      priority: task.priority,
      completed: !task.completed,
    };
    await apiClient.put<Task>(`/tasks/${task.id}`, input);
    loadTasks();
  }

  async function deleteTask(id: number) {
    await apiClient.delete(`/tasks/${id}`);
    loadTasks();
  }

  return (
    <div>
      <h2>Задачи</h2>
      <Link to="/tasks/new">+ Новая задача</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '0.5rem' }}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task)} />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '0.5rem' }}>
              {task.title} — приоритет {task.priority}, до {new Date(task.deadline).toLocaleString()}
            </span>
            <Link to={`/tasks/${task.id}/edit`} state={{ task }} style={{ marginLeft: '0.5rem' }}>
              Изменить
            </Link>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '0.5rem' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
