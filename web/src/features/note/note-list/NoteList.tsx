import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { EmptyState } from '@/shared/ui/empty-state';
import { NoteCard, useDeleteNoteMutation, useNotesQuery } from '@/entities/note';
import { NoteForm } from '@/features/note/note-form/NoteForm';
import type { Note } from '@/shared/types';

// Полный CRUD-цикл заметок: список (useNotesQuery), создание/редактирование через
// Dialog+NoteForm и удаление с подтверждением через AlertDialog (ADR-5). Страницы
// остаются тонкими — вся логика здесь.
// lessonId прокидывается в useNotesQuery и NoteForm для использования внутри
// LessonDetailSheet; на NotesPage пропускается.
interface NoteListProps {
  lessonId?: number;
}

export function NoteList({ lessonId }: NoteListProps) {
  const { data: notes, isPending } = useNotesQuery(lessonId);
  const deleteMutation = useDeleteNoteMutation();
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Открытие диалога создания: сбрасываем редактируемую заметку.
  function openCreate() {
    setEditingNote(undefined);
    setDialogOpen(true);
  }

  // Открытие диалога редактирования: запоминаем заметку для NoteForm.
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
            <NoteForm note={editingNote} lessonId={lessonId} onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {isPending ? (
        <p className="text-sm text-muted-foreground">Загрузка...</p>
      ) : notes?.length === 0 ? (
        <EmptyState
          title="Заметок пока нет"
          description="Создайте первую заметку"
          action={
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" /> Создать заметку
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {notes?.map((note) => (
            <div key={note.id} className="flex items-start gap-2">
              <div className="flex-1">
                <NoteCard note={note} onClick={() => openEdit(note)} />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Удалить заметку">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить заметку?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Заметка «{note.title}» будет удалена безвозвратно.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteMutation.mutate(note.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
