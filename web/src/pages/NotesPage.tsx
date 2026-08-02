// NotesPage — тонкая обёртка над фичей note-list: весь CRUD-цикл заметок
// (список, создание, редактирование, удаление) реализован в NoteList.
import { NoteList } from '@/features/note/note-list';

export function NotesPage() {
  return <NoteList />;
}
