// Хранит JWT (localStorage) и текущего пользователя; LoginRequest/RegisterRequest/LoginResponse
// объявлены здесь локально, т.к. не экспортируются из shared KMP-модуля в JS (см. ApiModels.kt).
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiClient } from '../api/client';
import type { User } from '../shared/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  groupName: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    apiClient
      .get<User>('/auth/me')
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(request: LoginRequest) {
    const response = await apiClient.post<LoginResponse>('/auth/login', request);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  }

  async function register(request: RegisterRequest) {
    await apiClient.post<User>('/auth/register', request);
    await login({ email: request.email, password: request.password });
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return ctx;
}
