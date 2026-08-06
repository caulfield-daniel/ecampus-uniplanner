// Контекст текущего пользователя: заменяет AuthProvider (миграция фазы 2).
// Токен читается из tokenStorage через useSyncExternalStore (внешний стор
// над localStorage), профиль — через useMeQuery из ./queries (запрос /auth/me).
// login/register в контекст не входят: LoginForm использует мутации напрямую.
import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { queryClient } from '@/shared/api/queryClient';
import * as tokenStorage from '@/shared/lib/tokenStorage';
import type { User } from '@/shared/types';
import { useMeQuery } from './queries';

// Значение контекста: текущий пользователь, JWT-токен, флаг загрузки и logout.
export interface UserContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => void;
}

// Контекст без значения по умолчанию: useAuth бросает ошибку вне провайдера.
const UserContext = createContext<UserContextValue | null>(null);

// Провайдер: токен подписан на tokenStorage через useSyncExternalStore
// (subscribe возвращает функцию отписки, getSnapshot — string | null; null
// возвращается стабильно, пока токена нет), профиль тянется через useMeQuery.
export function UserProvider({ children }: { children: ReactNode }) {
  const token = useSyncExternalStore(tokenStorage.subscribe, tokenStorage.get);
  const meQuery = useMeQuery(token);
  const user = meQuery.data ?? null;
  const loading = meQuery.isPending;

  // Выход: чистим токен (уведомит подписчиков useSyncExternalStore) и кеш
  // react-query, чтобы данные прошлого пользователя не остались в памяти.
  function logout() {
    tokenStorage.clear();
    queryClient.clear();
  }

  return (
    <UserContext.Provider value={{ user, token, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Доступ к контексту: возвращает { user, token, loading, logout }.
// react-refresh: хук и провайдер в одном файле — стандартный паттерн контекста,
// выносить хук в отдельный файл без пользы (он не компонент).
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри UserProvider');
  }
  return ctx;
}
