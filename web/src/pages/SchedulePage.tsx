import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WeekSwitcher } from '@/features/schedule/week-switcher/WeekSwitcher';
import { LessonCard } from '@/entities/lesson/ui/LessonCard';
import { LessonDetailSheet } from '@/widgets/LessonDetailSheet';
import { useAuth } from '@/entities/user';
import { useScheduleQuery } from '@/entities/lesson/model/queries';
import { addDays, formatWeekday, getWeekStart, toIsoDate } from '@/shared/lib/date';
import type { Lesson } from '@/shared/types';

export function SchedulePage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get('subject');
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const from = toIsoDate(weekStart);
  const to = toIsoDate(addDays(weekStart, 6));
  const { data: lessons, isLoading } = useScheduleQuery(user?.groupName, from, to);

  const filtered = subjectFilter ? (lessons ?? []).filter((l) => l.discipline === subjectFilter) : lessons ?? [];
  const byDay = filtered.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    (acc[lesson.date] ??= []).push(lesson);
    return acc;
  }, {});

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Расписание</h1>
        <WeekSwitcher weekStart={weekStart} onChange={setWeekStart} />
      </div>
      {subjectFilter && <p className="mb-4 text-sm text-muted-foreground">Фильтр по предмету: {subjectFilter}</p>}
      {isLoading && <p className="text-sm text-muted-foreground">Загрузка...</p>}
      <div className="space-y-6">
        {Object.entries(byDay).map(([date, dayLessons]) => (
          <div key={date}>
            <h3 className="mb-3 text-sm font-semibold capitalize text-muted-foreground">
              {formatWeekday(date)}, {new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
            </h3>
            <div className="space-y-2">
              {dayLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} onClick={() => setSelectedLesson(lesson)} />
              ))}
            </div>
          </div>
        ))}
        {Object.keys(byDay).length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">На этой неделе занятий нет</p>
        )}
      </div>
      <LessonDetailSheet lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
    </>
  );
}
