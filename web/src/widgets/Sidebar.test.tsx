// Тесты Sidebar (навигация приложения): рендер заголовка/ссылок/пользователя,
// badge с числом активных задач, список предметов из расписания недели и выход
// (logout + navigate('/login')).
// Хуки useAuth/useTasksQuery/useScheduleQuery замоканы через vi.mock по тем же
// путям, что импортирует Sidebar: useTasksQuery/useScheduleQuery — ГЛУБОКИЕ
// импорты из model/queries (не баррели), useAuth — из барреля @/entities/user.
// react-router-dom тоже замокан: NavLink/useNavigate/useSearchParams заменены
// заглушками, Router не нужен.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import type { Lesson, Task, User } from '@/shared/types';
import { Sidebar } from './Sidebar';

// Моки хуков сущностей и роутера: единый объект через vi.hoisted, чтобы
// фабрики vi.mock (поднимаются выше импортов) могли на него ссылаться.
const mocks = vi.hoisted(() => ({
  useAuth: vi.fn(),
  useTasksQuery: vi.fn(),
  useScheduleQuery: vi.fn(),
  navigate: vi.fn(),
  setSearchParams: vi.fn(),
}));

// useAuth — из барреля @/entities/user: остальные экспорты оставляем реальными.
vi.mock('@/entities/user', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/user')>();
  return { ...actual, useAuth: mocks.useAuth };
});

// ВАЖНО: Sidebar импортирует useTasksQuery из глубокого пути
// '@/entities/task/model/queries' (не из барреля @/entities/task) — мокаем именно его.
vi.mock('@/entities/task/model/queries', () => ({
  useTasksQuery: mocks.useTasksQuery,
}));

// useScheduleQuery — тоже глубокий импорт '@/entities/lesson/model/queries'.
vi.mock('@/entities/lesson/model/queries', () => ({
  useScheduleQuery: mocks.useScheduleQuery,
}));

// react-router-dom: NavLink — упрощённая ссылка (className может быть функцией
// от { isActive }), useNavigate/useSearchParams — заглушки.
vi.mock('react-router-dom', () => ({
  NavLink: ({
    to,
    className,
    children,
  }: {
    to: string;
    className?: string | ((state: { isActive: boolean }) => string);
    children?: ReactNode;
  }) => {
    const cls = typeof className === 'function' ? className({ isActive: false }) : className;
    return (
      <a href={to} className={cls}>
        {children}
      </a>
    );
  },
  useNavigate: () => mocks.navigate,
  useSearchParams: () => [new URLSearchParams(), mocks.setSearchParams],
}));

// Фикстуры: plain-объекты приводятся к типам KMP-классов, как в других тестах.
function makeTask(overrides: Partial<Task> = {}): Task {
  const base = {
    id: 1,
    title: 'Подготовить отчёт по практике',
    description: null as string | null | undefined,
    deadline: new Date(Date.now() + 100 * 3_600_000).toISOString(),
    priority: 1,
    completed: false,
  };
  return { ...base, ...overrides } as Task;
}

function makeLesson(overrides: Partial<Lesson> = {}): Lesson {
  const base = {
    id: 1,
    group: 'ИС-21',
    date: '2026-08-02',
    weekday: 'воскресенье',
    discipline: 'Математика',
    type: 'Лекция',
    timeStart: '09:00',
    timeEnd: '10:30',
    teacher: 'Иванов И.И.',
    room: '301',
    subgroup: null,
  };
  return { ...base, ...overrides } as Lesson;
}

// Пользователь с группой: расписание запрашивается по groupName.
function makeUser(overrides: Partial<User> = {}): User {
  const base = { id: '1', email: 'student@example.com', fullName: 'Иван Иванов', groupName: 'ИС-21' };
  return { ...base, ...overrides } as User;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.useAuth.mockReturnValue({ user: null, logout: vi.fn() } as never);
  mocks.useTasksQuery.mockReturnValue({ data: [], isPending: false } as never);
  mocks.useScheduleQuery.mockReturnValue({ data: [], isPending: false } as never);
});

afterEach(cleanup);

describe('Sidebar', () => {
  it('рендерит заголовок «UniPlanner», ссылки навигации и пользователя из useAuth', () => {
    mocks.useAuth.mockReturnValue({ user: makeUser(), logout: vi.fn() } as never);

    render(<Sidebar />);

    expect(screen.getByText('UniPlanner')).toBeTruthy();
    expect(screen.getByText('Сегодня')).toBeTruthy();
    expect(screen.getByText('Расписание')).toBeTruthy();
    expect(screen.getByText('Задачи')).toBeTruthy();
    expect(screen.getByText('Заметки')).toBeTruthy();
    expect(screen.getByText('Иван Иванов')).toBeTruthy();
    expect(screen.getByText('ИС-21')).toBeTruthy();
  });

  it('показывает badge «Задачи» с числом активных задач из useTasksQuery', () => {
    mocks.useAuth.mockReturnValue({ user: makeUser(), logout: vi.fn() } as never);
    mocks.useTasksQuery.mockReturnValue({
      // 1 выполненная + 1 активная → активных задач 1 → badge «1».
      data: [makeTask({ id: 1, completed: true }), makeTask({ id: 2, completed: false })],
      isPending: false,
    } as never);

    render(<Sidebar />);

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('рендерит список предметов из расписания недели (без дублей)', () => {
    mocks.useAuth.mockReturnValue({ user: makeUser(), logout: vi.fn() } as never);
    mocks.useScheduleQuery.mockReturnValue({
      data: [
        makeLesson({ id: 1, discipline: 'Математика' }),
        makeLesson({ id: 2, discipline: 'Математика' }),
        makeLesson({ id: 3, discipline: 'Физика' }),
      ],
      isPending: false,
    } as never);

    render(<Sidebar />);

    expect(screen.getByText('Предметы')).toBeTruthy();
    // Дубликаты дисциплин схлопываются через Set.
    expect(screen.getAllByText('Математика')).toHaveLength(1);
    expect(screen.getByText('Физика')).toBeTruthy();
    // Запрос расписания уходит с группой текущего пользователя за текущую неделю.
    expect(mocks.useScheduleQuery).toHaveBeenCalledWith('ИС-21', expect.any(String), expect.any(String));
  });

  it('клик «Выйти» вызывает logout и переход на /login', () => {
    const logoutSpy = vi.fn();
    mocks.useAuth.mockReturnValue({ user: makeUser(), logout: logoutSpy } as never);

    render(<Sidebar />);

    fireEvent.click(screen.getByRole('button', { name: 'Выйти' }));

    expect(logoutSpy).toHaveBeenCalledTimes(1);
    expect(mocks.navigate).toHaveBeenCalledWith('/login');
  });
});
