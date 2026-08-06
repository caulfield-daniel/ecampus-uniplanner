import { apiClient } from '@/shared/api/httpClient';
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '@/shared/types';

export const userApi = {
  // Текущий пользователь по Bearer-токену.
  me: () => apiClient.get<User>('/auth/me'),
  // Вход: возвращает JWT-токен и профиль пользователя.
  login: (request: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', request),
  // Регистрация: создаёт аккаунт и возвращает профиль пользователя.
  register: (request: RegisterRequest) => apiClient.post<User>('/auth/register', request),
};
