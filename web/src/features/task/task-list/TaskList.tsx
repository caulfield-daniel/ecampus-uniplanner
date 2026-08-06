import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { EmptyState } from '@/shared/ui/empty-state';
import { TaskRow, useDeleteTaskMutation, useTasksQuery, useToggleTaskMutation } from '@/entities/task';
import { TaskForm } from '@/features/task/task-form/TaskForm';
import type { Task } from '@/shared/types';

// Полный CRUD-цикл задач: список (useTasksQuery), создание/редактирование через
// Dialog+TaskForm, переключение выполнения (onToggle) и удаление с подтверждением
// через AlertDialog (ADR-5). Страницы остаются тонкими — вся логика здесь.
// lessonId прокидывается в useTasksQuery и TaskForm для использования внутри
// LessonDetailSheet; на TasksPage пропускается.
interface TaskListProps {
  lessonId?: number;
}

export function TaskList({ lessonId }: TaskListProps) {
  const { data: tasks, isPending } = useTasksQuery(lessonId);
  const toggleMutation = useToggleTaskMutation();
  const deleteMutation = useDeleteTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Открытие диалога создания: сбрасываем редактируемую задачу.
  function openCreate() {
    setEditingTask(undefined);
    setDialogOpen(true);
  }

  // Открытие диалога редактирования: запоминаем задачу для TaskForm.
  function openEdit(task: Task) {
    setEditingTask(task);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Задачи</h1>
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
            <TaskForm task={editingTask} lessonId={lessonId} onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {isPending ? (
          <p className="text-sm text-muted-foreground">Загрузка...</p>
        ) : tasks?.length === 0 ? (
          <EmptyState
            title="Задач пока нет"
            description="Создайте первую задачу"
            action={
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" /> Создать задачу
              </Button>
            }
          />
        ) : (
          tasks?.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              <div className="flex-1">
                <TaskRow
                  task={task}
                  onToggle={(t) => toggleMutation.mutate(t)}
                  onClick={() => openEdit(task)}
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Удалить задачу">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Задача «{task.title}» будет удалена безвозвратно.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteMutation.mutate(task.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        )}
      </div>
    </>
  );
}
