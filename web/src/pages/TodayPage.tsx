import { useState } from 'react';
import { TodayDashboard } from '@/widgets/TodayDashboard';
import { LessonDetailSheet } from '@/widgets/LessonDetailSheet';
import type { Lesson } from '@/shared/types';

export function TodayPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <>
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Сегодня</h1>
      <p className="mb-8 text-sm text-muted-foreground capitalize">
        {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
      <TodayDashboard onSelectLesson={setSelectedLesson} />
      <LessonDetailSheet lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
    </>
  );
}
