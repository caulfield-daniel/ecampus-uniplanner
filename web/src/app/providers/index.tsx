// AppProviders: композиция глобальных провайдеров приложения (слой app).
// Порядок важен: QueryClientProvider даёт react-query хукам кеш и глобальный
// toast ошибок мутаций, ErrorBoundary ловит ошибки рендера всего поддерева,
// UserProvider — контекст текущего пользователя (заменил AuthProvider).
import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/queryClient';
import { UserProvider } from '@/entities/user';
import { ErrorBoundary } from '../ErrorBoundary';

// Оборачивает children всеми глобальными провайдерами приложения.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <UserProvider>{children}</UserProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
