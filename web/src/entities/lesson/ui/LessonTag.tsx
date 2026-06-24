import { subjectColor } from '@/shared/lib/subjectColor';
import type { Lesson } from '@/shared/types';

interface LessonTagProps {
  lesson: Lesson;
}

// Бейдж привязки задачи/заметки к занятию — показывает дисциплину и дату,
// цвет точки общий с сайдбаром (shared/lib/subjectColor.ts).
export function LessonTag({ lesson }: LessonTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: subjectColor(lesson.discipline) }} />
      {lesson.discipline}
      <span className="text-muted-foreground">
        ·{' '}
        {new Date(lesson.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
      </span>
    </span>
  );
}
