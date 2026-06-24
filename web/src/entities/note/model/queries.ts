import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { noteApi, type NoteInputDto } from '../api/noteApi';

export const noteKeys = {
  all: ['notes'] as const,
  list: (lessonId?: number) => ['notes', { lessonId }] as const,
};

export function useNotesQuery(lessonId?: number) {
  return useQuery({ queryKey: noteKeys.list(lessonId), queryFn: () => noteApi.list(lessonId) });
}

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NoteInputDto) => noteApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });
}

export function useUpdateNoteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: NoteInputDto }) => noteApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });
}

export function useDeleteNoteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => noteApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });
}
