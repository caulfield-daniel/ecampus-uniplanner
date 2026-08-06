// Тесты react-query хуков сущности user: useMeQuery (enabled по токену),
// useLoginMutation и useRegisterMutation (сохранение токена + инвалидация me).
// userApi и tokenStorage замоканы через vi.mock, хуки рендерятся в
// QueryClientProvider-обёртке.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { RegisterRequest } from '@/shared/types';
import { createQueryClient, queryClient } from '@/shared/api/queryClient';
import * as tokenStorage from '@/shared/lib/tokenStorage';
import { useLoginMutation, useMeQuery, useRegisterMutation, userKeys } from './queries';

// Заменяем API-слой моком: реальные сетевые вызовы не нужны.
vi.mock('../api/userApi', () => ({
  userApi: {
    me: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
  },
}));

// Заменяем tokenStorage моком: проверяем вызовы set без обращения к localStorage.
vi.mock('@/shared/lib/tokenStorage', () => ({
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn(),
  subscribe: vi.fn(),
}));

// Обёртка для renderHook: каждый тест получает свежий QueryClient,
// чтобы кеш и мутации не перетекали между тестами.
// createElement вместо JSX — файл .ts, а не .tsx.
function createWrapper(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client }, children);
  };
}

beforeEach(() => {
  // Сбрасываем шпионы invalidateQueries и вызовы моков между тестами.
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe('useMeQuery', () => {
  it('при token=null запрос отключён: me не вызывается', () => {
    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useMeQuery(null), { wrapper: createWrapper(client) });

    expect(result.current.fetchStatus).toBe('idle');
    expect(userApi.me).not.toHaveBeenCalled();
  });

  it('при наличии токена вызывает me и возвращает профиль', async () => {
    const user = { id: 1, email: 'test@example.com' };
    vi.mocked(userApi.me).mockResolvedValue(user as never);
    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useMeQuery('jwt-token'), { wrapper: createWrapper(client) });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(userApi.me).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(user);
  });
});

describe('useLoginMutation', () => {
  it('onSuccess сохраняет токен из ответа и инвалидирует me', async () => {
    const response = { token: 'jwt-token', user: { id: 1, email: 'test@example.com' } };
    vi.mocked(userApi.login).mockResolvedValue(response as never);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useLoginMutation(), { wrapper: createWrapper(client) });

    result.current.mutate({ email: 'test@example.com', password: 'secret' });

    await waitFor(() => expect(tokenStorage.set).toHaveBeenCalledWith('jwt-token'));
    // react-query v5 передаёт mutationFn второй аргумент — объект контекста
    // { client, meta, mutationKey }, поэтому проверяем его через expect.anything().
    expect(userApi.login).toHaveBeenCalledWith(
      { email: 'test@example.com', password: 'secret' },
      expect.anything(),
    );
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userKeys.me });
  });
});

describe('useRegisterMutation', () => {
  it('после register логинится и сохраняет токен из login', async () => {
    const request: RegisterRequest = {
      email: 'test@example.com',
      password: 'secret',
      fullName: 'Иван Иванов',
      groupName: 'ИС-21',
    };
    vi.mocked(userApi.register).mockResolvedValue({ id: 1, email: 'test@example.com' } as never);
    const loginResponse = { token: 'jwt-token', user: { id: 1, email: 'test@example.com' } };
    vi.mocked(userApi.login).mockResolvedValue(loginResponse as never);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const client = createQueryClient({ retry: 0 });
    const { result } = renderHook(() => useRegisterMutation(), { wrapper: createWrapper(client) });

    result.current.mutate(request);

    await waitFor(() => expect(tokenStorage.set).toHaveBeenCalledWith('jwt-token'));
    expect(userApi.register).toHaveBeenCalledWith(request);
    expect(userApi.login).toHaveBeenCalledWith({ email: request.email, password: request.password });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: userKeys.me });
  });
});
