// Тесты LoginForm: рендер формы входа, переключение на регистрацию (появляются
// поля ФИО/Группа), submit на вход/регистрацию с вызовом соответствующей мутации
// и navigate('/') в onSuccess, показ ошибки мутации и блокировка кнопки при
// isPending. Хуки useLoginMutation/useRegisterMutation замоканы через
// vi.mock('@/entities/user'), useNavigate — через vi.mock('react-router-dom'):
// react-query и сеть не нужны.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

// Состояние моков мутаций сущности user: loginMutate/registerMutate — вызываемые
// функции (для проверки аргументов), loginPending/loginError и registerPending/
// registerError — mutable-состояние для тестов isPending/ошибки. Храним всё в
// vi.hoisted, чтобы фабрика vi.mock (которая хоистится выше объявлений) точно
// видела значения, как в TaskForm.test.tsx.
const mocks = vi.hoisted(() => ({
  loginMutate: vi.fn(),
  registerMutate: vi.fn(),
  navigate: vi.fn(),
  loginPending: false,
  loginError: null as Error | null,
  registerPending: false,
  registerError: null as Error | null,
}));

vi.mock('@/entities/user', () => ({
  // Вход: mutate вызывает loginMutate и сразу onSuccess (как react-query после
  // успешного ответа), isPending/error берутся из mutable-состояния теста.
  useLoginMutation: () => ({
    mutate: (args: unknown, opts?: { onSuccess?: () => void }) => {
      mocks.loginMutate(args);
      opts?.onSuccess?.();
    },
    isPending: mocks.loginPending,
    error: mocks.loginError,
  }),
  useRegisterMutation: () => ({
    mutate: (args: unknown, opts?: { onSuccess?: () => void }) => {
      mocks.registerMutate(args);
      opts?.onSuccess?.();
    },
    isPending: mocks.registerPending,
    error: mocks.registerError,
  }),
}));

// useNavigate — единственный импорт LoginForm из react-router-dom.
vi.mock('react-router-dom', () => ({
  useNavigate: () => mocks.navigate,
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.loginPending = false;
  mocks.loginError = null;
  mocks.registerPending = false;
  mocks.registerError = null;
});

afterEach(cleanup);

describe('LoginForm', () => {
  it('рендерит форму входа с полями Email/Пароль и кнопкой «Войти»', () => {
    render(<LoginForm />);

    // Заголовок и поля входа присутствуют, полей регистрации ещё нет.
    expect(screen.getByText('UniPlanner')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Пароль')).toBeTruthy();
    expect(screen.queryByLabelText('ФИО')).toBeNull();
    expect(screen.queryByLabelText('Группа')).toBeNull();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeTruthy();
  });

  it('переключение на регистрацию показывает поля ФИО/Группа и кнопку «Зарегистрироваться»', () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    expect(screen.getByLabelText('ФИО')).toBeTruthy();
    expect(screen.getByLabelText('Группа')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeTruthy();
  });

  it('submit вызывает loginMutation.mutate с { email, password } и navigate("/") в onSuccess', async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'student@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => expect(mocks.loginMutate).toHaveBeenCalledTimes(1));
    expect(mocks.loginMutate).toHaveBeenCalledWith({
      email: 'student@example.com',
      password: 'secret',
    });
    // onSuccess мутации вызывает navigate('/').
    expect(mocks.navigate).toHaveBeenCalledWith('/');
  });

  it('submit вызывает registerMutation.mutate с { email, password, fullName, groupName }', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Регистрация' }));

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new@example.com' } });
    fireEvent.change(screen.getByLabelText('Пароль'), { target: { value: 'secret' } });
    fireEvent.change(screen.getByLabelText('ФИО'), { target: { value: 'Иван Иванов' } });
    fireEvent.change(screen.getByLabelText('Группа'), { target: { value: 'ПИ-21' } });
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));

    await waitFor(() => expect(mocks.registerMutate).toHaveBeenCalledTimes(1));
    expect(mocks.registerMutate).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'secret',
      fullName: 'Иван Иванов',
      groupName: 'ПИ-21',
    });
    expect(mocks.navigate).toHaveBeenCalledWith('/');
  });

  it('при ошибке мутации показывает сообщение об ошибке', () => {
    mocks.loginError = new Error('Неверные данные');

    render(<LoginForm />);

    expect(screen.getByText('Неверные данные')).toBeTruthy();
  });

  it('при isPending кнопка submit заблокирована и показывает «Загрузка...»', () => {
    mocks.loginPending = true;

    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Загрузка...' }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});
