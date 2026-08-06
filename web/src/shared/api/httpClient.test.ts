// Тесты фабрики HTTP-клиента (createHttpClient).
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as tokenStorage from '@/shared/lib/tokenStorage';
import { apiClient, createHttpClient } from './httpClient';

// Заменяем tokenStorage моком: default-инстанс apiClient берёт токен из него.
vi.mock('@/shared/lib/tokenStorage', () => ({
  get: vi.fn(),
  set: vi.fn(),
  clear: vi.fn(),
  subscribe: vi.fn(),
}));

describe('createHttpClient', () => {
  const baseUrl = 'http://localhost:8080/api/v1';

  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('передаёт кастомный getToken в Authorization-заголовок', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    const client = createHttpClient({ baseUrl, getToken: () => 'custom-token' });
    await client.get('/profile');

    expect(fetchMock).toHaveBeenCalledWith(
      `${baseUrl}/profile`,
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer custom-token',
        }),
      }),
    );
  });

  it('при не-ok ответе бросает Error с message из body', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Неверный токен' }),
    });

    const client = createHttpClient({ baseUrl, getToken: () => null });
    await expect(client.get('/profile')).rejects.toThrow('Неверный токен');
  });

  it('при статусе 204 возвращает undefined', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => {
        throw new Error('json не должен вызываться при 204');
      },
    });

    const client = createHttpClient({ baseUrl, getToken: () => null });
    const result = await client.delete('/tasks/1');

    expect(result).toBeUndefined();
  });

  it('default-инстанс берёт токен из tokenStorage', async () => {
    vi.mocked(tokenStorage.get).mockReturnValue('stored-token');
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await apiClient.get('/profile');

    expect(tokenStorage.get).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/profile'),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer stored-token' }),
      }),
    );
  });
});
