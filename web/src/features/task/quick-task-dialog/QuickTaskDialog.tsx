import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useCreateTaskMutation } from '@/entities/task/model/queries';

// Быстрое создание задачи из хэдера: только название+дедлайн, остальное — дефолты.
export function QuickTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const createMutation = useCreateTaskMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createMutation.mutateAsync({
      title,
      deadline: new Date(deadline).toISOString(),
      priority: 3,
      completed: false,
    });
    setTitle('');
    setDeadline('');
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Быстрая задача
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-1">
            <Label htmlFor="quick-title">Название</Label>
            <Input id="quick-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quick-deadline">Дедлайн</Label>
            <Input
              id="quick-deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Создать</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
