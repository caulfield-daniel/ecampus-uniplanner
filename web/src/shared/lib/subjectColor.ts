const PALETTE = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#ef4444', '#84cc16'];

// Стабильный цвет для дисциплины (точка в сайдбаре) — без backend-справочника цветов.
export function subjectColor(discipline: string): string {
  let hash = 0;
  for (let i = 0; i < discipline.length; i++) {
    hash = (hash << 5) - hash + discipline.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
