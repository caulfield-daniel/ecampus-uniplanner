// Тесты контекста текущего пользователя: useAuth вне провайдера бросает ошибку,
// UserProvider с токеном в tokenStorage отдаёт пользователя из useMeQuery,
// logout чистит токен и кеш react-query. useMeQuery и tokenStorage замоканы
// через vi.mock, поэтому react-query и сеть в тестах не нужны.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { queryClient } from '@/shared/api/queryClient';
import * as tokenStorage from '@/shared/lib/tokenStorage';
import { useMeQuery } from './queries';
import { UserProvider, useAuth } from './user-context';

// Заменяем ./queries моком: useMeQuery возвращает фиксированный профиль,
// чтобы контекст не зависел от react-query и сети.
vi.mock('./queries', () => ({
  useMeQuery: vi.fn(),
}));

// Заменяем tokenStorage моком: контролируем токен через get и проверяем
// вызовы clear без обращения к localStorage.
vi.mock('@/shared/lib/tokenStorage', () => ({
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn(),
  subscribe: vi.fn(),
}));

// Обёртка для renderHook: children рендерятся внутри UserProvider.
function wrapper({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  // По умолчанию токена нет: get возвращает null, подписка — no-op,
  // useMeQuery — без данных (запрос отключён при отсутствии токена).
  vi.mocked(tokenStorage.get).mockReturnValue(null);
  vi.mocked(tokenStorage.subscribe).mockReturnValue(() => {});
  vi.mocked(useMeQuery).mockReturnValue({
    data: undefined,
    isPending: false,
  } as never);
});

describe('useAuth', () => {
  it('бросает ошибку вне UserProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth должен использоваться внутри UserProvider',
    );
  });
});

describe('UserProvider', () => {
  it('с токеном в tokenStorage отдаёт пользователя из useMeQuery', () => {
    const user = { id: 1, email: 'test@example.com', fullName: 'Иван Иванов' };
    vi.mocked(tokenStorage.get).mockReturnValue('jwt-token');
    vi.mocked(useMeQuery).mockReturnValue({
      data: user,
      isPending: false,
    } as never);

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(useMeQuery).toHaveBeenCalledWith('jwt-token');
    expect(result.current.user).toEqual(user);
    expect(result.current.token).toBe('jwt-token');
    expect(result.current.loading).toBe(false);
  });

  it('logout вызывает tokenStorage.clear и queryClient.clear', () => {
    const clearSpy = vi.spyOn(queryClient, 'clear');
    vi.mocked(tokenStorage.get).mockReturnValue('jwt-token');
    vi.mocked(useMeQuery).mockReturnValue({
      data: { id: 1, email: 'test@example.com' },
      isPending: false,
    } as never);

    const { result } = renderHook(() => useAuth(), { wrapper });

    result.current.logout();

    expect(tokenStorage.clear).toHaveBeenCalledTimes(1);
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
