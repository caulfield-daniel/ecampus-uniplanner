import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Button } from '@/shared/ui/button';
import type { Lesson } from '@/shared/types';
// Импорты из публичных API (FSD): сущности task/note и фичи task-form/note-form
// переэкспортируют хуки и компоненты через свои баррели (index.ts) — глубоких
// импортов во внутренние модули (model/queries, ui/*) нет.
import { TaskRow, useTasksQuery, useToggleTaskMutation } from '@/entities/task';
import { NoteCard, useNotesQuery } from '@/entities/note';
import { TaskForm } from '@/features/task/task-form';
import { NoteForm } from '@/features/note/note-form';

interface LessonDetailSheetProps {
  lesson: Lesson | null;
  onClose: () => void;
}

// Слайд-панель занятия: вкладки "Задачи"/"Заметки", отфильтрованные по lessonId
// (backend-фильтр GET /tasks?lessonId=, см. ITaskService.listForLesson). Вкладки
// "Файлы" нет — у backend нет file storage (см. docs/08-final/summary.md).
export function LessonDetailSheet({ lesson, onClose }: LessonDetailSheetProps) {
  const [addingTask, setAddingTask] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const { data: tasks } = useTasksQuery(lesson?.id);
  const { data: notes } = useNotesQuery(lesson?.id);
  // Переключение выполнения задачи (галочка TaskRow): мутация инвалидирует кэш,
  // список перезапросится автоматически.
  const toggleMutation = useToggleTaskMutation();

  if (!lesson) {
    return null;
  }

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{lesson.discipline}</SheetTitle>
          <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
            <div>
              {lesson.timeStart}–{lesson.timeEnd}
            </div>
            {lesson.teacher && <div>{lesson.teacher}</div>}
            {lesson.room && <div>Ауд. {lesson.room}</div>}
            <div>{lesson.type}</div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Задачи ({tasks?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="notes">Заметки ({notes?.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-2">
            {tasks?.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={(task) => toggleMutation.mutate(task)} />
            ))}
            {addingTask ? (
              <TaskForm lessonId={lesson.id} onSuccess={() => setAddingTask(false)} />
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setAddingTask(true)}>
                + Добавить задачу к занятию
              </Button>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-2">
            {notes?.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
            {addingNote ? (
              <NoteForm lessonId={lesson.id} onSuccess={() => setAddingNote(false)} />
            ) : (
              <Button variant="outline" className="w-full" onClick={() => setAddingNote(true)}>
                + Новая заметка по занятию
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
