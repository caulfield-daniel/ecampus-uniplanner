import type { Lesson } from '@/shared/types';

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer gap-4 rounded-md border border-border p-4 transition-colors hover:border-primary hover:bg-accent"
    >
      <div className="min-w-20 text-xs font-semibold text-muted-foreground">
        {lesson.timeStart}–{lesson.timeEnd}
      </div>
      <div className="flex-1">
        <div className="text-base font-semibold">{lesson.discipline}</div>
        <div className="mt-1 text-xs text-muted-foreground">
          {lesson.teacher && `${lesson.teacher} • `}
          {lesson.room && `Ауд. ${lesson.room} • `}
          {lesson.type}
        </div>
      </div>
    </div>
  );
}
