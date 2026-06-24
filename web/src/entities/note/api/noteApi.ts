import { apiClient } from '@/shared/api/httpClient';
import type { Note } from '@/shared/types';

export interface NoteInputDto {
  title: string;
  content: string;
  relatedLessonId?: number;
}

export const noteApi = {
  list: (lessonId?: number) => apiClient.get<Note[]>(lessonId ? `/notes?lessonId=${lessonId}` : '/notes'),
  create: (input: NoteInputDto) => apiClient.post<Note>('/notes', input),
  update: (id: number, input: NoteInputDto) => apiClient.put<Note>(`/notes/${id}`, input),
  remove: (id: number) => apiClient.delete(`/notes/${id}`),
};
