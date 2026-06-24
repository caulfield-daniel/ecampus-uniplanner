import { QueryClient } from '@tanstack/react-query';

// Единый кэш серверных данных (tasks/notes/lessons/auth) — заменяет ручные
// useEffect+fetch в страницах, инвалидация после мутаций — см. entities/*/model.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});
