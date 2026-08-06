// Тесты внешнего стора токена (tokenStorage).
// ВАЖНО: тесты запускаются в jsdom-окружении, которое будет настроено
// в фазе 6 (vitest.config.ts) — до этого момента их можно только типизировать.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clear, get, set, subscribe } from './tokenStorage';

beforeEach(() => {
  // Изолируем тесты друг от друга.
  window.localStorage.clear();
});

describe('tokenStorage', () => {
  it('get возвращает null, когда токен не установлен', () => {
    expect(get()).toBeNull();
  });

  it('set + get возвращают сохранённое значение', () => {
    set('jwt-token');
    expect(get()).toBe('jwt-token');
  });

  it('clear обнуляет токен', () => {
    set('jwt-token');
    clear();
    expect(get()).toBeNull();
  });

  it('subscribe уведомляет листенера при set', () => {
    const listener = vi.fn();
    const unsubscribe = subscribe(listener);

    set('jwt-token');

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it('unsubscribe перестаёт уведомлять', () => {
    const listener = vi.fn();
    const unsubscribe = subscribe(listener);
    unsubscribe();

    set('jwt-token');

    expect(listener).not.toHaveBeenCalled();
  });

  it('SSR: без window get возвращает null, set/clear — no-op, subscribe — no-op', async () => {
    // Кеш typeof window вычисляется при импорте модуля, поэтому пересоздаём
    // модуль с имитацией серверного окружения.
    vi.resetModules();
    vi.stubGlobal('window', undefined);

    const ssrTokenStorage = await import('./tokenStorage');

    expect(ssrTokenStorage.get()).toBeNull();
    expect(() => ssrTokenStorage.set('secret')).not.toThrow();
    expect(() => ssrTokenStorage.clear()).not.toThrow();

    const unsubscribe = ssrTokenStorage.subscribe(() => {});
    expect(unsubscribe).toBeTypeOf('function');
    expect(() => unsubscribe()).not.toThrow();

    vi.unstubAllGlobals();
  });
});
