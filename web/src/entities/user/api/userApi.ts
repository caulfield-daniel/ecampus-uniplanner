import { apiClient } from '@/shared/api/httpClient';
import type { User } from '@/shared/types';

// LoginRequest/RegisterRequest/LoginResponse объявлены здесь локально, т.к.
// не экспортируются из shared KMP-модуля в JS (см. ApiModels.kt) — ранее
// они жили в AuthProvider.tsx, теперь это API-слой сущности user.

// Тело запроса на вход в систему.
export interface LoginRequest {
  email: string;
  password: string;
}

// Тело запроса на регистрацию нового пользователя.
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  groupName: string;
}

// Ответ на успешный вход: JWT-токен и профиль пользователя.
export interface LoginResponse {
  token: string;
  user: User;
}

export const userApi = {
  // Текущий пользователь по Bearer-токену.
  me: () => apiClient.get<User>('/auth/me'),
  // Вход: возвращает JWT-токен и профиль пользователя.
  login: (request: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', request),
  // Регистрация: создаёт аккаунт и возвращает профиль пользователя.
  register: (request: RegisterRequest) => apiClient.post<User>('/auth/register', request),
};
