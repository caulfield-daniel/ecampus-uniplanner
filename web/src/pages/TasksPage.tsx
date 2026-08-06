// TasksPage — тонкая страница: весь CRUD-цикл задач (список, Dialog+TaskForm,
// переключение выполнения, удаление через AlertDialog) вынесен в
// features/task/task-list (таска 4.1). Страница только рендерит TaskList
// и не содержит бизнес-логики (FSD: слои pages → features).
import { TaskList } from '@/features/task/task-list';

export function TasksPage() {
  return <TaskList />;
}
