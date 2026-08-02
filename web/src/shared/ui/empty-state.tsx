import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface EmptyStateProps {
  /** Главный текст заглушки */
  title: string;
  /** Подзаголовок под главным текстом */
  description?: string;
  /** Опциональное действие (например кнопка «Создать») */
  action?: React.ReactNode;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Центрированная заглушка для пустых списков и секций:
 * заголовок, опциональный подзаголовок и опциональное действие.
 */
function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className,
      )}
    >
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
