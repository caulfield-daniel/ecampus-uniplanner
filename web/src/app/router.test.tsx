// Тесты AppRouter: поведение ProtectedRoute и маршрутов. Роутер рендерится
// с реальным BrowserRouter (из router.tsx), useAuth замокан через barrel
// @/entities/user, Layout и все страницы — заглушками, чтобы тест не тянул
// фичи и сеть. Каждый тест стартует с URL "/" (history сбрасывается в
// beforeEach, чтобы редирект из теста 1 не переносился в следующие тесты).
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '@/entities/user';
import { AppRouter } from './router';

// Мок barrel'а @/entities/user: useAuth возвращает { user, token, loading, logout }
// — нужное состояние задаётся в каждом тесте через mockReturnValue.
vi.mock('@/entities/user', () => ({
  useAuth: vi.fn(),
}));

// Мок Layout: заглушка с <Outlet/>, чтобы вложенные маршруты (страницы)
// рендерились — так проверяем и сам Layout, и вложенный роутинг.
vi.mock('@/widgets/Layout', async () => {
  const { Outlet } = await import('react-router-dom');
  return {
    Layout: () => (
      <div>
        Layout mock
        <Outlet />
      </div>
    ),
  };
});

// Моки страниц: заглушки вместо реальных страниц (там фичи, react-query, сеть).
vi.mock('@/pages/LoginPage', () => ({
  LoginPage: () => <div>LoginPage mock</div>,
}));
vi.mock('@/pages/TodayPage', () => ({
  TodayPage: () => <div>TodayPage mock</div>,
}));
vi.mock('@/pages/SchedulePage', () => ({
  SchedulePage: () => <div>SchedulePage mock</div>,
}));
vi.mock('@/pages/TasksPage', () => ({
  TasksPage: () => <div>TasksPage mock</div>,
}));
vi.mock('@/pages/NotesPage', () => ({
  NotesPage: () => <div>NotesPage mock</div>,
}));

// Состояние useAuth по умолчанию: без токена, без загрузки. Тесты, которым
// нужно другое состояние, переопределяют его внутри себя.
beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState(null, '', '/');
  vi.mocked(useAuth).mockReturnValue({
    user: null,
    token: null,
    loading: false,
    logout: () => {},
  });
});

afterEach(cleanup);

describe('AppRouter', () => {
  it('без токена редиректит на /login', async () => {
    render(<AppRouter />);

    await waitFor(() => expect(screen.getByText('LoginPage mock')).toBeTruthy());
  });

  it('с токеном рендерит Layout и вложенную страницу', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      token: 'jwt',
      loading: false,
      logout: () => {},
    });

    render(<AppRouter />);

    expect(screen.getByText('Layout mock')).toBeTruthy();
    await waitFor(() => expect(screen.getByText('TodayPage mock')).toBeTruthy());
  });

  it('во время loading показывает «Загрузка...»', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      token: null,
      loading: true,
      logout: () => {},
    });

    render(<AppRouter />);

    expect(screen.getByText('Загрузка...')).toBeTruthy();
    // Пока грузится — ни редиректа на /login, ни Layout.
    expect(screen.queryByText('LoginPage mock')).toBeNull();
    expect(screen.queryByText('Layout mock')).toBeNull();
  });
});
