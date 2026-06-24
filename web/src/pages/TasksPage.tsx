import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { TaskRow } from '@/entities/task/ui/TaskRow';
import { TaskForm } from '@/features/task/task-form/TaskForm';
import { useDeleteTaskMutation, useTasksQuery } from '@/entities/task/model/queries';
import { useLessonByIdLookup } from '@/entities/lesson/model/queries';
import { useAuth } from '@/app/providers/AuthProvider';
import type { Task } from '@/shared/types';

const ALL = 'all';
const UNLINKED = 'unlinked';

export function TasksPage() {
  const { user } = useAuth();
  const { data: tasks } = useTasksQuery();
  const lessonById = useLessonByIdLookup(user?.groupName);
  const deleteMutation = useDeleteTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonFilter, setLessonFilter] = useState<string>(ALL);

  // Только занятия, на которые реально ссылаются текущие задачи — иначе список
  // фильтра раздулся бы до всего расписания за полгода.
  const lessonOptions = useMemo(() => {
    const ids = new Set((tasks ?? []).map((t) => t.relatedLessonId).filter((id): id is number => id != null));
    return [...ids]
      .map((id) => lessonById.get(id))
      .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
  }, [tasks, lessonById]);

  const filteredTasks = (tasks ?? []).filter((task) => {
    if (lessonFilter === ALL) return true;
    if (lessonFilter === UNLINKED) return task.relatedLessonId == null;
    return task.relatedLessonId === Number(lessonFilter);
  });

  function openCreate() {
    setEditingTask(undefined);
    setDialogOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Задачи</h1>
        <div className="flex items-center gap-2">
          <Select value={lessonFilter} onValueChange={setLessonFilter}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Все задачи</SelectItem>
              <SelectItem value={UNLINKED}>Без привязки к занятию</SelectItem>
              {lessonOptions.map((lesson) => (
                <SelectItem key={lesson.id} value={String(lesson.id)}>
                  {lesson.discipline} ({new Date(lesson.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" /> Новая задача
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTask ? 'Редактирование задачи' : 'Новая задача'}</DialogTitle>
              </DialogHeader>
              <TaskForm task={editingTask} onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2">
            <div className="flex-1">
              <TaskRow
                task={task}
                lesson={task.relatedLessonId != null ? lessonById.get(task.relatedLessonId) : undefined}
                onClick={() => openEdit(task)}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {filteredTasks.length === 0 && <p className="text-sm text-muted-foreground">Задач пока нет</p>}
      </div>
    </>
  );
}
