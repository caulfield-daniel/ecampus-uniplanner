import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import type { Task } from '@/shared/types';
import type { TaskInputDto } from '@/entities/task/api/taskApi';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/entities/task/model/queries';

interface TaskFormProps {
  task?: Task;
  lessonId?: number;
  onSuccess?: () => void;
}

// Полная форма задачи: используется и на TasksPage, и внутри LessonDetailSheet
// (там lessonId предзаполняется и скрыт от пользователя).
export function TaskForm({ task, lessonId, onSuccess }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [deadline, setDeadline] = useState(task?.deadline.slice(0, 16) ?? '');
  const [priority, setPriority] = useState(String(task?.priority ?? 3));
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateTaskMutation();
  const updateMutation = useUpdateTaskMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: TaskInputDto = {
      title,
      description: description || undefined,
      deadline: new Date(deadline).toISOString(),
      priority: Number(priority),
      completed: task?.completed ?? false,
      relatedLessonId: lessonId ?? task?.relatedLessonId,
    };
    try {
      if (task) {
        await updateMutation.mutateAsync({ id: task.id, input });
      } else {
        await createMutation.mutateAsync(input);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить задачу');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="space-y-1">
        <Label htmlFor="task-title">Название</Label>
        <Input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="task-description">Описание</Label>
        <Textarea id="task-description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="task-deadline">Дедлайн</Label>
        <Input
          id="task-deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Приоритет</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((p) => (
              <SelectItem key={p} value={String(p)}>
                Приоритет {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit">Сохранить</Button>
    </form>
  );
}
