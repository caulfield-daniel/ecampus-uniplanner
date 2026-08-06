import { Checkbox } from '@/shared/ui/checkbox';
import { cn } from '@/shared/lib/utils';
import type { Task } from '@/shared/types';
import { deadlineUrgency } from '../model/deadline';

// Презентационный компонент: без запросов и мутаций. Переключение выполнения
// (onToggle) и переход к редактированию (onClick) — ответственность владельца списка.
interface TaskRowProps {
  task: Task;
  onToggle: (task: Task) => void;
  onClick?: () => void;
}

export function TaskRow({ task, onToggle, onClick }: TaskRowProps) {
  const urgency = deadlineUrgency(task.deadline, task.completed);

  return (
    <div className="flex items-start gap-3 rounded-md border border-border p-3 transition-colors hover:bg-accent">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task)}
        onClick={(e) => e.stopPropagation()}
        className="mt-0.5"
      />
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <div className={cn('text-sm font-medium', task.completed && 'text-muted-foreground line-through')}>
          {task.title}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={cn(
              'font-medium',
              urgency === 'urgent' && 'text-destructive',
              urgency === 'soon' && 'text-yellow-600',
            )}
          >
            {new Date(task.deadline).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
