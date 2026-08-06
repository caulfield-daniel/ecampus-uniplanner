// Фабрика QueryClient: единые дефолты для запросов и мутаций.
// queries — кеш на 30 секунд с одним ретраем; mutations — без ретраев
// (пользователь сам повторяет действие) и с глобальным toast-уведомлением
// об ошибке (сообщение из Error или фолбэк-текст).
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Конфигурация фабрики: staleTime — время актуальности кеша запросов,
// retry — количество ретраев запросов при ошибке.
export interface QueryClientFactoryConfig {
  // Время (мс), в течение которого данные считаются свежими (по умолчанию 30 с).
  staleTime?: number;
  // Количество ретраев запросов при ошибке (по умолчанию 1).
  retry?: number;
}

// Создаёт QueryClient с дефолтами проекта. Позволяет переопределить
// staleTime/retry для тестов или изолированных экранов.
export function createQueryClient({
  staleTime = 30_000,
  retry = 1,
}: QueryClientFactoryConfig = {}): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime,
        retry,
      },
      mutations: {
        retry: 0,
        onError: (error: unknown) => {
          toast.error(error instanceof Error ? error.message : 'Ошибка выполнения операции');
        },
      },
    },
  });
}

// Единый кэш серверных данных (tasks/notes/lessons/auth) — заменяет ручные
// useEffect+fetch в страницах, инвалидация после мутаций — см. entities/*/model.
export const queryClient = createQueryClient();
