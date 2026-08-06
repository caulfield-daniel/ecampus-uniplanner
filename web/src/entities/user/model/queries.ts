// React-query хуки сущности user: текущий пользователь (useMeQuery) и мутации
// входа/регистрации (useLoginMutation/useRegisterMutation). Токен хранится в
// tokenStorage, а профиль подтягивается через useMeQuery — в onSuccess мутаций
// юзер не сеттится напрямую, вместо этого инвалидируется кеш me.
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/api/queryClient';
import * as tokenStorage from '@/shared/lib/tokenStorage';
import { userApi } from '../api/userApi';
import type { LoginResponse, RegisterRequest } from '@/shared/types';

// Ключ кеша текущего пользователя: инвалидируется после логина/регистрации,
// чтобы useMeQuery перезапросил профиль с новым токеном.
export const userKeys = {
  me: ['user', 'me'] as const,
};

// Текущий пользователь по Bearer-токену. Пока токена нет — запрос отключён
// (enabled=false). staleTime 5 минут: профиль меняется редко, незачем
// дёргать /auth/me при каждом перерендере.
export function useMeQuery(token: string | null) {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: () => userApi.me(),
    enabled: Boolean(token),
    staleTime: 5 * 60_000,
  });
}

// Вход: сохраняет JWT в tokenStorage и инвалидирует me — профиль подтянется
// через useMeQuery при следующем рендере.
export function useLoginMutation() {
  return useMutation({
    mutationFn: userApi.login,
    onSuccess: (response: LoginResponse) => {
      tokenStorage.set(response.token);
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
}

// Регистрация: backend возвращает User (не токен), поэтому после register
// сразу логинимся тем же email/password (как в AuthProvider) и сохраняем токен.
// Инвалидация me в onSuccess — профиль перезапросится через useMeQuery.
export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (request: RegisterRequest) => {
      await userApi.register(request);
      const loginResponse = await userApi.login({ email: request.email, password: request.password });
      tokenStorage.set(loginResponse.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
}
