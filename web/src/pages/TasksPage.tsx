import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { TaskRow } from '@/entities/task/ui/TaskRow';
import { TaskForm } from '@/features/task/task-form/TaskForm';
import { useDeleteTaskMutation, useTasksQuery } from '@/entities/task/model/queries';
import type { Task } from '@/shared/types';

export function TasksPage() {
  const { data: tasks } = useTasksQuery();
  const deleteMutation = useDeleteTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

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
            <TaskForm task={editingTask} onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-2">
        {tasks?.map((task) => (
          <div key={task.id} className="flex items-center gap-2">
            <div className="flex-1">
              <TaskRow task={task} onClick={() => openEdit(task)} />
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {tasks?.length === 0 && <p className="text-sm text-muted-foreground">Задач пока нет</p>}
      </div>
    </>
  );
}
