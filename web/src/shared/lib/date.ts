// Неделя — Пн–Вс (расписание вуза традиционно по неделям).
export function getWeekStart(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay(); // 0 = вс
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

// Форматирует дату как YYYY-MM-DD из ЛОКАЛЬНЫХ компонентов.
// НЕ используем toISOString(): он выдаёт дату в UTC, и в таймзонах
// с отрицательным смещением «уезжает» на следующий день, ломая «Сегодня».
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Значение для input type="datetime-local" — YYYY-MM-DDTHH:mm из локальных
// компонентов (браузер отображает его без конвертации таймзоны).
export function toLocalInputValue(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${toIsoDate(date)}T${hh}:${mm}`;
}

// Парсит YYYY-MM-DDTHH:mm как ЛОКАЛЬНУЮ дату-время (new Date(строка)
// трактовал бы её как UTC). Если время не указано — берём 00:00.
export function fromLocalInputValue(value: string): Date {
  const [datePart, timePart = '00:00'] = value.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatWeekLabel(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6);
  const fmt = (d: Date) => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  return `${fmt(weekStart)} – ${fmt(weekEnd)}`;
}

// Парсит YYYY-MM-DD как ЛОКАЛЬНУЮ дату: new Date(dateIso) трактовал бы её
// как UTC, и в отрицательных таймзонах показывал день недели от предыдущего дня.
export function formatWeekday(dateIso: string): string {
  const [y, m, d] = dateIso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('ru-RU', { weekday: 'long' });
}
