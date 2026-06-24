import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { addDays, toIsoDate } from '@/shared/lib/date';
import type { Lesson } from '@/shared/types';
import { scheduleApi } from '../api/scheduleApi';

export function useGroupsQuery() {
  return useQuery({ queryKey: ['groups'], queryFn: scheduleApi.listGroups });
}

export function useScheduleQuery(group: string | undefined, from: string, to: string) {
  return useQuery({
    queryKey: ['schedule', group, from, to],
    queryFn: () => scheduleApi.listLessons(group as string, from, to),
    enabled: Boolean(group),
  });
}

// Широкое окно (год вокруг текущей даты) — достаточно для разрешения lessonId,
// на которые ссылаются задачи/заметки, без отдельного backend-эндпоинта "занятие по id".
export function useLessonByIdLookup(group: string | undefined): Map<number, Lesson> {
  const from = toIsoDate(addDays(new Date(), -180));
  const to = toIsoDate(addDays(new Date(), 180));
  const { data: lessons } = useScheduleQuery(group, from, to);
  return useMemo(() => new Map((lessons ?? []).map((lesson) => [lesson.id, lesson])), [lessons]);
}
