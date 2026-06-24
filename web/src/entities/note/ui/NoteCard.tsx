import type { Note } from '@/shared/types';

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md border border-border p-3 transition-colors hover:bg-accent hover:border-primary"
    >
      <div className="text-sm font-semibold">{note.title}</div>
      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{note.content}</div>
    </div>
  );
}
