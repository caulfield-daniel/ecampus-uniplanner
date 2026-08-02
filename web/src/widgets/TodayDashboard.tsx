import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/shared/ui/card';
import { toIsoDate } from '@/shared/lib/date';
import { useAuth } from '@/entities/user';
import { useTasksQuery, useToggleTaskMutation, TaskRow } from '@/entities/task';
import { useNotesQuery, NoteCard } from '@/entities/note';
import { useScheduleQuery, LessonCard } from '@/entities/lesson';
import type { Lesson } from '@/shared/types';

interface TodayDashboardProps {
  onSelectLesson: (lesson: Lesson) => void;
}

// KPI + расписание на сегодня + ближайшие задачи + последние заметки — всё
// считается на фронте из уже загруженных запросов, без отдельного backend-эндпоинта.
export function TodayDashboard({ onSelectLesson }: TodayDashboardProps) {
  const { user } = useAuth();
  const today = toIsoDate(new Date());
  // Переключение выполнения задачи: раньше мутация вызывалась внутри TaskRow,
  // теперь TaskRow презентационный (onToggle обязателен) — пробрасываем мутацию
  // из публичного API сущности task, поведение галочки сохраняется.
  const toggleMutation = useToggleTaskMutation();

  const { data: lessons } = useScheduleQuery(user?.groupName, today, today);
  const { data: tasks } = useTasksQuery();
  const { data: notes } = useNotesQuery();

  const activeTasks = useMemo(
    () =>
      (tasks ?? [])
        .filter((task) => !task.completed)
        .sort((a, b) => a.deadline.localeCompare(b.deadline))
        .slice(0, 3),
    [tasks],
  );
  const completedCount = (tasks ?? []).filter((task) => task.completed).length;
  const recentNotes = (notes ?? []).slice(-3).reverse();

  return (
    <div>
      <div className="mb-8 grid grid-cols-4 gap-6">
        <KpiCard title="Занятий сегодня" value={lessons?.length ?? 0} />
        <KpiCard title="Активных задач" value={(tasks ?? []).filter((t) => !t.completed).length} />
        <KpiCard title="Заметок" value={notes?.length ?? 0} />
        <KpiCard title="Выполнено задач" value={completedCount} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <Card>
          <h3 className="mb-4 text-base font-semibold">📅 Расписание на сегодня</h3>
          <div className="space-y-3">
            {(lessons ?? []).map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onClick={() => onSelectLesson(lesson)} />
            ))}
            {lessons?.length === 0 && <p className="text-sm text-muted-foreground">Сегодня занятий нет</p>}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-base font-semibold">📋 Ближайшие задачи</h3>
            <div className="space-y-2">
              {activeTasks.map((task) => (
                <TaskRow key={task.id} task={task} onToggle={(task) => toggleMutation.mutate(task)} />
              ))}
              {activeTasks.length === 0 && <p className="text-sm text-muted-foreground">Нет активных задач</p>}
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 text-base font-semibold">📝 Последние заметки</h3>
            <div className="space-y-2">
              {recentNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
              {recentNotes.length === 0 && <p className="text-sm text-muted-foreground">Заметок пока нет</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
    </Card>
  );
}
