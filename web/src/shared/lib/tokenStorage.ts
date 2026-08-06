// Внешний стор над localStorage для JWT-токена (ключ 'auth_token').
// Сигнатура get() + subscribe() подходит для useSyncExternalStore.
//
// ВАЖНО: ключ 'auth_token' отличается от 'token', который использует текущий
// AuthProvider. Миграция произойдёт в фазе 2 (UserProvider), а этот стор
// всегда читает/пишет именно 'auth_token'.

// Ключ в localStorage, под которым хранится токен.
const STORAGE_KEY = 'auth_token';

// SSR-флаг: кешируем один раз при импорте модуля, чтобы на сервере
// get/set/clear/subscribe были безопасными no-op.
const isBrowser = typeof window !== 'undefined';

// Множество подписчиков: при изменении токена вызываем всех.
const listeners = new Set<() => void>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

// Возвращает текущий токен или null, если он не установлен (или при SSR).
export function get(): string | null {
  if (!isBrowser) {
    return null;
  }
  return window.localStorage.getItem(STORAGE_KEY);
}

// Сохраняет токен и уведомляет всех подписчиков.
export function set(token: string): void {
  if (!isBrowser) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, token);
  notifyListeners();
}

// Удаляет токен и уведомляет всех подписчиков.
export function clear(): void {
  if (!isBrowser) {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
  notifyListeners();
}

// Подписка на изменения токена. Возвращает функцию отписки.
// При SSR возвращает no-op, чтобы хуки не падали при гидрации.
export function subscribe(listener: () => void): () => void {
  if (!isBrowser) {
    return () => {};
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
