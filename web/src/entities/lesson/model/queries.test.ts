// Тесты react-query хуков расписания: useScheduleQuery (queryKey из group/from/to,
// отключение запроса при undefined group) и useGroupsQuery (queryKey ['groups']).
// scheduleApi замокан через vi.mock, хуки рендерятся в QueryClientProvider-обёртке
// со свежим createQueryClient({retry: 0}).
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { scheduleApi } from '../api/scheduleApi';
import { createQueryClient } from '@/shared/api/queryClient';
import { useGroupsQuery, useScheduleQuery } from './queries';

// Заменяем API-слой моком: реальные сетевые вызовы не нужны.
vi.mock('../api/scheduleApi', () => ({
  scheduleApi: {
    listGroups: vi.fn(),
    listLessons: vi.fn(),
  },
}));

// Обёртка для renderHook: каждый тест получает свежий QueryClient,
// чтобы кеш не перетекал между тестами.
// createElement вместо JSX — файл .ts, а не .tsx.
function createWrapper(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client }, children);
  };
}

beforeEach(() => {
  // Сбрасываем шпионы и вызовы моков между тестами.
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe('useScheduleQuery', () => {
  it('строит queryKey из group/from/to и запрашивает расписание', async () => {
    const group = 'ИС-21';
    const from = '2026-08-31';
    const to = '2026-09-06';
    const lessons = [{ id: 1 }];
    vi.mocked(scheduleApi.listLessons).mockResolvedValue(lessons as never);

    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useScheduleQuery(group, from, to), {
      wrapper: createWrapper(client),
    });

    // Ключ запроса регистрируется в кеше как ['schedule', group, from, to].
    expect(client.getQueryCache().findAll()[0].queryKey).toEqual(['schedule', group, from, to]);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(scheduleApi.listLessons).toHaveBeenCalledWith(group, from, to);
    expect(result.current.data).toEqual(lessons);
  });

  it('при undefined group запрос отключён: listLessons не вызывается', () => {
    const from = '2026-08-31';
    const to = '2026-09-06';
    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useScheduleQuery(undefined, from, to), {
      wrapper: createWrapper(client),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(scheduleApi.listLessons).not.toHaveBeenCalled();
    // Ключ всё равно попадает в кеш, но группа подставляется как undefined.
    expect(client.getQueryCache().findAll()[0].queryKey).toEqual(['schedule', undefined, from, to]);
  });
});

describe('useGroupsQuery', () => {
  it('использует queryKey ["groups"] и запрашивает список групп', async () => {
    const groups = ['ИС-21', 'ИС-22'];
    vi.mocked(scheduleApi.listGroups).mockResolvedValue(groups);

    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useGroupsQuery(), {
      wrapper: createWrapper(client),
    });

    expect(client.getQueryCache().findAll()[0].queryKey).toEqual(['groups']);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(scheduleApi.listGroups).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(groups);
  });
});
