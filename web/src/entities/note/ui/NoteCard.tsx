import type { Lesson, Note } from '@/shared/types';
import { LessonTag } from '@/entities/lesson/ui/LessonTag';

interface NoteCardProps {
  note: Note;
  lesson?: Lesson;
  onClick?: () => void;
}

export function NoteCard({ note, lesson, onClick }: NoteCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md border border-border p-3 transition-colors hover:bg-accent hover:border-primary"
    >
      <div className="text-sm font-semibold">{note.title}</div>
      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{note.content}</div>
      {lesson && (
        <div className="mt-2">
          <LessonTag lesson={lesson} />
        </div>
      )}
    </div>
  );
}
