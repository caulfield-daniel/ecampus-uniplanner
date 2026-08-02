// Уровень срочности дедлайна: urgent — меньше суток, soon — меньше трёх суток, normal — остальное.
export type DeadlineUrgency = 'urgent' | 'soon' | 'normal';

// Срочность считается от текущего момента: completed → normal (задача закрыта,
// дедлайн больше не давит); менее 24 часов → urgent; менее 72 часов → soon.
export function deadlineUrgency(deadline: string, completed: boolean): DeadlineUrgency {
  if (completed) return 'normal';
  const diffHours = (new Date(deadline).getTime() - Date.now()) / 3_600_000;
  if (diffHours < 24) return 'urgent';
  if (diffHours < 72) return 'soon';
  return 'normal';
}
