// Тонкий fetch-клиент: добавляет Bearer-токен ко всем запросам к backend.
// Создаётся фабрикой createHttpClient (DI): baseUrl и источник токена (getToken)
// можно подменить — по умолчанию токен берётся из tokenStorage.
import * as tokenStorage from '@/shared/lib/tokenStorage';

// Конфигурация клиента: baseUrl обязателен, getToken опционален.
export interface HttpClientConfig {
  // Базовый URL backend API.
  baseUrl: string;
  // Возвращает текущий JWT-токен или null, если пользователь не авторизован.
  getToken?: () => string | null;
}

// Интерфейс HTTP-клиента: сигнатура совпадает с прежним синглтоном 1-в-1,
// чтобы существующие вызовы apiClient.get/post/put/delete не ломались.
export interface HttpClient {
  get: <T,>(path: string) => Promise<T>;
  post: <T,>(path: string, body: unknown) => Promise<T>;
  put: <T,>(path: string, body: unknown) => Promise<T>;
  delete: (path: string) => Promise<void>;
}

// Создаёт HTTP-клиент для заданного baseUrl.
export function createHttpClient({ baseUrl, getToken = () => tokenStorage.get() }: HttpClientConfig): HttpClient {
  async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message ?? `Ошибка запроса: ${response.status}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  return {
    get: <T,>(path: string) => request<T>(path),
    post: <T,>(path: string, body: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T,>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (path: string) => request<void>(path, { method: 'DELETE' }),
  };
}

// Клиент по умолчанию: базовый URL из переменной окружения VITE_API_BASE_URL.
export const apiClient = createHttpClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1',
});
