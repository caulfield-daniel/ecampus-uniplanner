// Публичный API сущности task (FSD): taskApi и DTO запроса,
// react-query хуки, уровень срочности дедлайна и строка задачи. Потребители
// импортируют только из этого барреля, не из внутренних модулей сущности.
// Тип Task потребители берут из @/shared/types — здесь он не переэкспортируется.
export type { TaskInput } from '@/shared/types';
export { taskApi } from './api/taskApi';
export { taskKeys, useTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useToggleTaskMutation } from './model/queries';
export type { DeadlineUrgency } from './model/deadline';
export { deadlineUrgency } from './model/deadline';
export { TaskRow } from './ui/TaskRow';
