import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Task } from '@/shared/types';
import { taskApi } from '../api/taskApi';
import type { TaskInput } from '@/shared/types';

// Серверный кэш задач — заменяет ручной useEffect+fetch, инвалидируется после мутаций.
export const taskKeys = {
  all: ['tasks'] as const,
  list: (lessonId?: number) => ['tasks', { lessonId }] as const,
};

export function useTasksQuery(lessonId?: number) {
  return useQuery({ queryKey: taskKeys.list(lessonId), queryFn: () => taskApi.list(lessonId) });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TaskInput) => taskApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: TaskInput }) => taskApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}

export function useToggleTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) =>
      taskApi.update(task.id, {
        title: task.title,
        description: task.description ?? undefined,
        deadline: task.deadline,
        priority: task.priority,
        completed: !task.completed,
        relatedLessonId: task.relatedLessonId,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}
