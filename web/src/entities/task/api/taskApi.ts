import { apiClient } from '@/shared/api/httpClient';
import type { Task, TaskInput } from '@/shared/types';

export const taskApi = {
  list: (lessonId?: number) => apiClient.get<Task[]>(lessonId ? `/tasks?lessonId=${lessonId}` : '/tasks'),
  create: (input: TaskInput) => apiClient.post<Task>('/tasks', input),
  update: (id: number, input: TaskInput) => apiClient.put<Task>(`/tasks/${id}`, input),
  remove: (id: number) => apiClient.delete(`/tasks/${id}`),
};
