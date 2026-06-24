import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { NoteCard } from '@/entities/note/ui/NoteCard';
import { NoteForm } from '@/features/note/note-form/NoteForm';
import { useDeleteNoteMutation, useNotesQuery } from '@/entities/note/model/queries';
import type { Note } from '@/shared/types';

export function NotesPage() {
  const { data: notes } = useNotesQuery();
  const deleteMutation = useDeleteNoteMutation();
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Заметки</h1>
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
      <div className="grid grid-cols-2 gap-3">
        {notes?.map((note) => (
          <div key={note.id} className="flex items-start gap-2">
            <div className="flex-1">
              <NoteCard note={note} onClick={() => openEdit(note)} />
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(note.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {notes?.length === 0 && <p className="text-sm text-muted-foreground">Заметок пока нет</p>}
      </div>
    </>
  );
}
