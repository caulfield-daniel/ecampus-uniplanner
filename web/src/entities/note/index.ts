// Публичный API сущности note (FSD): noteApi и DTO запроса,
// react-query хуки и карточка заметки. Потребители импортируют
// только из этого барреля, не из внутренних модулей сущности.
// Тип Note потребители берут из @/shared/types — здесь он не переэкспортируется.
export type { NoteInput } from '@/shared/types';
export { noteApi } from './api/noteApi';
export { noteKeys, useNotesQuery, useCreateNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } from './model/queries';
export { NoteCard } from './ui/NoteCard';
