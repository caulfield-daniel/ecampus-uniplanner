import { useMemo } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { addDays, getWeekStart, toIsoDate } from '@/shared/lib/date';
import { subjectColor } from '@/shared/lib/subjectColor';
import { useAuth } from '@/entities/user';
import { useTasksQuery } from '@/entities/task/model/queries';
import { useScheduleQuery } from '@/entities/lesson/model/queries';

// Список предметов — рабочий фильтр: клик ведёт на /schedule?subject=...
// (дисциплины берутся из реально загруженного расписания текущей недели, не статика).
export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: tasks } = useTasksQuery();
  const activeTasksCount = tasks?.filter((t) => !t.completed).length ?? 0;

  const weekStart = getWeekStart(new Date());
  const { data: lessons } = useScheduleQuery(user?.groupName, toIsoDate(weekStart), toIsoDate(addDays(weekStart, 6)));
  const subjects = useMemo(() => {
    const set = new Set<string>();
    lessons?.forEach((lesson) => set.add(lesson.discipline));
    return Array.from(set);
  }, [lessons]);

  function selectSubject(subject: string) {
    const next = new URLSearchParams(searchParams);
    next.set('subject', subject);
    navigate(`/schedule?${next.toString()}`);
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="fixed flex h-screen w-64 flex-col overflow-y-auto border-r border-border bg-card p-4">
      <div className="mb-8 flex items-center gap-2 px-2 text-lg font-bold tracking-tight">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
          SH
        </div>
        Student Hub
      </div>

      <nav className="mb-6 space-y-1">
        <SidebarLink to="/" label="Сегодня" />
        <SidebarLink to="/schedule" label="Расписание" />
        <SidebarLink to="/tasks" label="Задачи" badge={activeTasksCount} />
        <SidebarLink to="/notes" label="Заметки" />
      </nav>

      {subjects.length > 0 && (
        <div className="mb-6">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Предметы
          </div>
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => selectSubject(subject)}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-accent"
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: subjectColor(subject) }} />
              {subject}
            </button>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 rounded-md bg-secondary p-3">
        <Avatar>
          <AvatarFallback>{(user?.fullName ?? '?').slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <div className="truncate text-sm font-semibold">{user?.fullName}</div>
          <div className="text-xs text-muted-foreground">{user?.groupName}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, label, badge }: { to: string; label: string; badge?: number }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-secondary text-secondary-foreground' : 'hover:bg-accent',
        )
      }
    >
      <span className="flex-1">{label}</span>
      {!!badge && <Badge variant="destructive">{badge}</Badge>}
    </NavLink>
  );
}
