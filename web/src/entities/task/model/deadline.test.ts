// Тесты чистой функции deadlineUrgency: срочность дедлайна задачи
// относительно текущего момента. Системное время фиксируется через
// fake timers (vi.useFakeTimers + vi.setSystemTime), чтобы тесты не
// зависели от реального времени запуска.
// ВАЖНО: тесты запускаются в vitest-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deadlineUrgency } from './deadline';

// Фиксированная точка отсчёта: системное время не дрейфует между тестами.
const NOW = new Date('2026-01-01T00:00:00Z');

// Дедлайн, отстоящий от NOW на заданное число часов.
function inHours(hours: number): string {
  return new Date(NOW.getTime() + hours * 3_600_000).toISOString();
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('deadlineUrgency', () => {
  it('completed=true возвращает normal, даже если срок уже прошёл', () => {
    expect(deadlineUrgency(inHours(-5), true)).toBe('normal');
  });

  it('дедлайн через 10 часов → urgent', () => {
    expect(deadlineUrgency(inHours(10), false)).toBe('urgent');
  });

  it('дедлайн через 48 часов → soon', () => {
    expect(deadlineUrgency(inHours(48), false)).toBe('soon');
  });

  it('дедлайн через 100 часов → normal', () => {
    expect(deadlineUrgency(inHours(100), false)).toBe('normal');
  });

  it('просроченный дедлайн → urgent (разница < 0 < 24)', () => {
    expect(deadlineUrgency(inHours(-5), false)).toBe('urgent');
  });
});
