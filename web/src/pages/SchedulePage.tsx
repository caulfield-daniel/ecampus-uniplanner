import { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import type { Lesson } from '../shared/types';

export function SchedulePage() {
  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<string[]>('/groups')
      .then((loadedGroups) => {
        setGroups(loadedGroups);
        if (loadedGroups.length > 0) {
          setSelectedGroup(loadedGroups[0]);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Не удалось загрузить группы'));
  }, []);

  useEffect(() => {
    if (!selectedGroup) {
      return;
    }
    apiClient
      .get<Lesson[]>(`/schedule?group=${encodeURIComponent(selectedGroup)}`)
      .then(setLessons)
      .catch((err) => setError(err instanceof Error ? err.message : 'Не удалось загрузить расписание'));
  }, [selectedGroup]);

  return (
    <div>
      <h2>Расписание</h2>
      <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} style={{ marginBottom: '0.5rem' }}>
            {lesson.date} ({lesson.weekday}) {lesson.timeStart}–{lesson.timeEnd}: {lesson.discipline} —{' '}
            {lesson.type}
            {lesson.teacher && `, ${lesson.teacher}`}
            {lesson.room && `, ауд. ${lesson.room}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
