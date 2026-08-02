// Глобальный setup-файл для vitest (подключается через setupFiles в vitest.config.ts).
// Выполняется один раз перед каждым тестовым файлом и подготавливает jsdom-окружение.
import { vi } from 'vitest';
// ВАЖНО: используем '/vitest' вход — он вызывает expect.extend() через expect из vitest.
// Обычный '@testing-library/jest-dom' расширяет ГЛОБАЛЬНЫЙ expect, которого нет
// при globals: false (падает с ReferenceError: expect is not defined).
import '@testing-library/jest-dom/vitest';

// Глобальный mock sonner: queryClient onError вызывает toast.error — без мока
// в jsdom-окружении тесты падали бы. queryClient.test.ts мокает sonner сам
// (переопределение локального мока не конфликтует с глобальным — vitest
// позволяет до-мокать модуль в конкретном тесте).
vi.mock('sonner', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

// matchMedia требуется Radix-компонентам (Select, Dialog и др.) — в jsdom его нет.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };

// ResizeObserver тоже нужен некоторым Radix-компонентам — заглушка на всякий случай.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = window.ResizeObserver || ResizeObserverMock;
