import { apiClient } from '@/shared/api/httpClient';
import type { Task } from '@/shared/types';

// Plain-интерфейс тела запроса: Kotlin/JS-экспорт TaskInput генерирует класс
// с методами copy/equals/hashCode, который не проходит структурную проверку TS
// для литералов объектов (см. docs/05-implementation/code-structure.md).
export interface TaskInputDto {
  title: string;
  description?: string;
  deadline: string;
  priority: number;
  completed: boolean;
  relatedLessonId?: number;
}

export const taskApi = {
  list: (lessonId?: number) => apiClient.get<Task[]>(lessonId ? `/tasks?lessonId=${lessonId}` : '/tasks'),
  create: (input: TaskInputDto) => apiClient.post<Task>('/tasks', input),
  update: (id: number, input: TaskInputDto) => apiClient.put<Task>(`/tasks/${id}`, input),
  remove: (id: number) => apiClient.delete(`/tasks/${id}`),
};
