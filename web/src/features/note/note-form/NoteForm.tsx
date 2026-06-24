import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Label } from '@/shared/ui/label';
import type { Note } from '@/shared/types';
import type { NoteInputDto } from '@/entities/note/api/noteApi';
import { useCreateNoteMutation, useUpdateNoteMutation } from '@/entities/note/model/queries';

interface NoteFormProps {
  note?: Note;
  lessonId?: number;
  onSuccess?: () => void;
}

export function NoteForm({ note, lessonId, onSuccess }: NoteFormProps) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const [error, setError] = useState<string | null>(null);
  const createMutation = useCreateNoteMutation();
  const updateMutation = useUpdateNoteMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const input: NoteInputDto = { title, content, relatedLessonId: lessonId ?? note?.relatedLessonId };
    try {
      if (note) {
        await updateMutation.mutateAsync({ id: note.id, input });
      } else {
        await createMutation.mutateAsync(input);
      }
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить заметку');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="space-y-1">
        <Label htmlFor="note-title">Заголовок</Label>
        <Input id="note-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <Label htmlFor="note-content">Текст</Label>
        <Textarea id="note-content" value={content} onChange={(e) => setContent(e.target.value)} required rows={5} />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit">Сохранить</Button>
    </form>
  );
}
