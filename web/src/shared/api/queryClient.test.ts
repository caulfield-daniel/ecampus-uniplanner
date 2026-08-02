// Тесты фабрики QueryClient (createQueryClient).
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createQueryClient } from './queryClient';

// Заменяем sonner моком: проверяем вызовы toast.error без реального рендера.
vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

beforeEach(() => {
  // Изолируем вызовы toast.error между тестами.
  vi.clearAllMocks();
});

describe('createQueryClient', () => {
  it('возвращает инстанс QueryClient', () => {
    const client = createQueryClient();

    expect(client).toBeInstanceOf(QueryClient);
  });

  it('применяет кастомные staleTime и retry через defaultOptions', () => {
    const client = createQueryClient({ staleTime: 60_000, retry: 3 });

    expect(client.getDefaultOptions().queries?.staleTime).toBe(60_000);
    expect(client.getDefaultOptions().queries?.retry).toBe(3);
  });

  it('onError мутаций вызывает toast.error с текстом ошибки', () => {
    const client = createQueryClient();
    // Достаём обработчик из дефолтов и вызываем вручную — как это делает react-query.
    const onError = client.getDefaultOptions().mutations?.onError as
      | ((error: unknown) => void)
      | undefined;

    expect(typeof onError).toBe('function');

    onError?.(new Error('Сервер недоступен'));
    expect(toast.error).toHaveBeenCalledWith('Сервер недоступен');
  });

  it('onError мутаций показывает фолбэк для не-Error ошибки', () => {
    const client = createQueryClient();
    const onError = client.getDefaultOptions().mutations?.onError as
      | ((error: unknown) => void)
      | undefined;

    onError?.('строка вместо Error');
    expect(toast.error).toHaveBeenCalledWith('Ошибка выполнения операции');
  });
});
