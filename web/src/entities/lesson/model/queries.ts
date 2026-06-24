import { useQuery } from '@tanstack/react-query';
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
