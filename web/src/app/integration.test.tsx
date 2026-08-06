// Интеграционный смоук-тест (реальный MSW, без vi.mock на userApi/tokenStorage):
// проверяем полный путь LoginForm → мутация login/register → tokenStorage →
// useMeQuery (/auth/me) → useAuth. Вместо MemoryRouter-мока используем реальный
// MemoryRouter, queryClient — синглтон из @/shared/api/queryClient (чистим кеш
// между тестами, чтобы данные не перетекали).
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { AppProviders } from './providers';
import { LoginForm } from '@/features/auth/login-form';
import { useAuth } from '@/entities/user';
import { resetDb, server } from '@/mocks';
import { queryClient } from '@/shared/api/queryClient';

// Lifecycle MSW: сервер поднимаем до всех тестов файла, закрываем после.
// Между тестами сбрасываем in-memory БД хендлеров, localStorage и кеш
// react-query (queryClient — синглтон, иначе кеш перетекал бы между тестами).
beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => {
  resetDb();
  localStorage.clear();
  queryClient.clear();
});
// vitest настроен с globals: false — авто-cleanup RTL не работает,
// чистим DOM явно (как в остальных тестах проекта).
afterEach(cleanup);

// Маленький потребитель контекста: рендерит email текущего пользователя
// (или заглушку, пока профиль не подтянулся через useMeQuery).
function UserProbe() {
  const { user } = useAuth();
  return <div>{user ? user.email : 'нет пользователя'}</div>;
}

describe('auth integration', () => {
  it('login flow: ввод → submit → токен записан в tokenStorage', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AppProviders>,
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    // onSuccess мутации login сохраняет токен из ответа MSW в localStorage.
    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).toBe('test-token');
    });
  });

  it('после логина useMeQuery подтягивает профиль в useAuth', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LoginForm />
          <UserProbe />
        </MemoryRouter>
      </AppProviders>,
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    // После записи токена useMeQuery выполняет GET /auth/me с Bearer-токеном;
    // MSW-хендлер возвращает makeUser() с email по умолчанию 'student@example.com'.
    await waitFor(() => {
      expect(screen.getByText('student@example.com')).toBeTruthy();
    });
    // Токен тоже на месте — профиль подтянулся именно после логина.
    expect(localStorage.getItem('auth_token')).toBe('test-token');
  });

  it('register flow: переключение на регистрацию, 4 поля, submit → токен', async () => {
    render(
      <AppProviders>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </AppProviders>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'secret' } });
    fireEvent.change(screen.getByLabelText('ФИО'), { target: { value: 'Иван Иванов' } });
    fireEvent.change(screen.getByLabelText('Группа'), { target: { value: 'ПИ-21' } });
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    // register создаёт аккаунт, затем логинится тем же email/password —
    // токен из ответа login попадает в tokenStorage.
    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).toBe('test-token');
    });
  });
});
