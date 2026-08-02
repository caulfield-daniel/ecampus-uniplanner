// Тесты API-слоя сущности user: проверяем, что userApi ходит по правильным
// маршрутам и передаёт корректные тела запросов. httpClient замокан через vi.mock,
// чтобы не обращаться к сети.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/shared/api/httpClient';
import { userApi } from './userApi';

// Заменяем httpClient моком: реальные вызовы fetch не нужны.
vi.mock('@/shared/api/httpClient', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('userApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('me вызывает GET /auth/me', async () => {
    const user = { id: 1, email: 'test@example.com' };
    vi.mocked(apiClient.get).mockResolvedValue(user as never);

    await userApi.me();

    expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
  });

  it('login вызывает POST /auth/login с телом запроса', async () => {
    const request = { email: 'test@example.com', password: 'secret' };
    const response = { token: 'jwt-token', user: { id: 1, email: 'test@example.com' } };
    vi.mocked(apiClient.post).mockResolvedValue(response as never);

    await userApi.login(request);

    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', request);
  });

  it('register вызывает POST /auth/register с телом запроса', async () => {
    const request = {
      email: 'test@example.com',
      password: 'secret',
      fullName: 'Иван Иванов',
      groupName: 'ИС-21',
    };
    vi.mocked(apiClient.post).mockResolvedValue({ id: 1, email: 'test@example.com' } as never);

    await userApi.register(request);

    expect(apiClient.post).toHaveBeenCalledWith('/auth/register', request);
  });
});
