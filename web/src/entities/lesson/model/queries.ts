// React-query хуки расписания: список групп (useGroupsQuery) и занятия группы
// (useScheduleQuery). Ключи кеша собраны в scheduleKeys — единый источник
// правды для запросов и будущей инвалидации.
import { useQuery } from '@tanstack/react-query';
import { scheduleApi } from '../api/scheduleApi';

// Ключи кеша расписания: all — корень (для массовой инвалидации),
// groups — список групп, list — занятия группы за период [from, to].
export const scheduleKeys = {
  all: ['schedule'] as const,
  groups: ['groups'] as const,
  list: (group: string, from: string, to: string) => ['schedule', group, from, to] as const,
};

// Список групп для селектора расписания.
export function useGroupsQuery() {
  return useQuery({ queryKey: scheduleKeys.groups, queryFn: scheduleApi.listGroups });
}

// Занятия группы за период [from, to]. Пока группа не выбрана
// (group=undefined) — запрос отключён (enabled=false).
export function useScheduleQuery(group: string | undefined, from: string, to: string) {
  return useQuery({
    queryKey: scheduleKeys.list(group as string, from, to),
    queryFn: () => scheduleApi.listLessons(group as string, from, to),
    enabled: Boolean(group),
  });
}
