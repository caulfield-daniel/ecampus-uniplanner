import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { NoteCard } from '@/entities/note/ui/NoteCard';
import { NoteForm } from '@/features/note/note-form/NoteForm';
import { useDeleteNoteMutation, useNotesQuery } from '@/entities/note/model/queries';
import { useLessonByIdLookup } from '@/entities/lesson/model/queries';
import { useAuth } from '@/app/providers/AuthProvider';
import type { Note } from '@/shared/types';

const ALL = 'all';
const UNLINKED = 'unlinked';

export function NotesPage() {
  const { user } = useAuth();
  const { data: notes } = useNotesQuery();
  const lessonById = useLessonByIdLookup(user?.groupName);
  const deleteMutation = useDeleteNoteMutation();
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonFilter, setLessonFilter] = useState<string>(ALL);

  const lessonOptions = useMemo(() => {
    const ids = new Set((notes ?? []).map((n) => n.relatedLessonId).filter((id): id is number => id != null));
    return [...ids]
      .map((id) => lessonById.get(id))
      .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
  }, [notes, lessonById]);

  const filteredNotes = (notes ?? []).filter((note) => {
    if (lessonFilter === ALL) return true;
    if (lessonFilter === UNLINKED) return note.relatedLessonId == null;
    return note.relatedLessonId === Number(lessonFilter);
  });

  function openCreate() {
    setEditingNote(undefined);
    setDialogOpen(true);
  }

  function openEdit(note: Note) {
    setEditingNote(note);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Заметки</h1>
        <div className="flex items-center gap-2">
          <Select value={lessonFilter} onValueChange={setLessonFilter}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Все заметки</SelectItem>
              <SelectItem value={UNLINKED}>Без привязки к занятию</SelectItem>
              {lessonOptions.map((lesson) => (
                <SelectItem key={lesson.id} value={String(lesson.id)}>
                  {lesson.discipline} ({new Date(lesson.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" /> Новая заметка
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingNote ? 'Редактирование заметки' : 'Новая заметка'}</DialogTitle>
              </DialogHeader>
              <NoteForm note={editingNote} onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filteredNotes.map((note) => (
          <div key={note.id} className="flex items-start gap-2">
            <div className="flex-1">
              <NoteCard
                note={note}
                lesson={note.relatedLessonId != null ? lessonById.get(note.relatedLessonId) : undefined}
                onClick={() => openEdit(note)}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(note.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {filteredNotes.length === 0 && <p className="text-sm text-muted-foreground">Заметок пока нет</p>}
      </div>
    </>
  );
}
