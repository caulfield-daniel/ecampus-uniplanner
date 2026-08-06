// Тесты timezone-safe утилит работы с датами (date).
// ВАЖНО: тесты запускаются в jsdom-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { describe, expect, it } from 'vitest';
import {
  formatWeekday,
  fromLocalInputValue,
  getWeekStart,
  toIsoDate,
  toLocalInputValue,
} from './date';

describe('getWeekStart', () => {
  it('среда → понедельник той же недели', () => {
    // 21 января 2026 — среда.
    const weekStart = getWeekStart(new Date(2026, 0, 21));
    expect(weekStart.getDay()).toBe(1); // понедельник
    expect(weekStart.getFullYear()).toBe(2026);
    expect(weekStart.getMonth()).toBe(0);
    expect(weekStart.getDate()).toBe(19);
  });

  it('воскресенье → понедельник предыдущей недели', () => {
    // 25 января 2026 — воскресенье, понедельник той недели — 19 января.
    const weekStart = getWeekStart(new Date(2026, 0, 25));
    expect(weekStart.getDay()).toBe(1);
    expect(weekStart.getFullYear()).toBe(2026);
    expect(weekStart.getMonth()).toBe(0);
    expect(weekStart.getDate()).toBe(19);
  });
});

describe('toIsoDate', () => {
  it('не уезжает в UTC: локальное 23:00 → та же дата', () => {
    // Старый вариант через toISOString() в таймзонах с отрицательным
    // смещением возвращал следующий день — проверяем, что дата локальная.
    expect(toIsoDate(new Date(2026, 0, 20, 23, 0))).toBe('2026-01-20');
  });
});

describe('toLocalInputValue / fromLocalInputValue', () => {
  it('round-trip сохраняет локальную дату-время', () => {
    const d = new Date(2026, 0, 20, 23, 45);
    const restored = fromLocalInputValue(toLocalInputValue(d));
    expect(restored.getFullYear()).toBe(2026);
    expect(restored.getMonth()).toBe(0);
    expect(restored.getDate()).toBe(20);
    expect(restored.getHours()).toBe(23);
    expect(restored.getMinutes()).toBe(45);
  });

  it('toLocalInputValue возвращает формат YYYY-MM-DDTHH:mm', () => {
    expect(toLocalInputValue(new Date(2026, 0, 5, 9, 5))).toBe('2026-01-05T09:05');
  });

  it('fromLocalInputValue без времени трактует время как 00:00', () => {
    const d = fromLocalInputValue('2026-01-20');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(0);
    expect(d.getDate()).toBe(20);
    expect(d.getHours()).toBe(0);
    expect(d.getMinutes()).toBe(0);
  });
});

describe('formatWeekday', () => {
  it('парсит YYYY-MM-DD как локальную дату и возвращает строку', () => {
    expect(() => formatWeekday('2026-01-20')).not.toThrow();
    const result = formatWeekday('2026-01-20');
    expect(result).toBeTypeOf('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toMatch(/NaN|Invalid/);
  });
});
