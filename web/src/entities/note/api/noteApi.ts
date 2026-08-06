import { apiClient } from '@/shared/api/httpClient';
import type { Note, NoteInput } from '@/shared/types';

export const noteApi = {
  list: (lessonId?: number) => apiClient.get<Note[]>(lessonId ? `/notes?lessonId=${lessonId}` : '/notes'),
  create: (input: NoteInput) => apiClient.post<Note>('/notes', input),
  update: (id: number, input: NoteInput) => apiClient.put<Note>(`/notes/${id}`, input),
  remove: (id: number) => apiClient.delete(`/notes/${id}`),
};
