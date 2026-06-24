import { apiClient } from '@/shared/api/httpClient';
import type { Lesson } from '@/shared/types';

export const scheduleApi = {
  listGroups: () => apiClient.get<string[]>('/groups'),
  listLessons: (group: string, from: string, to: string) =>
    apiClient.get<Lesson[]>(`/schedule?group=${encodeURIComponent(group)}&from=${from}&to=${to}`),
};
