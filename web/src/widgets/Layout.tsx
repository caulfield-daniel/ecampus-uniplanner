import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar';
import { QuickTaskDialog } from '@/features/task/quick-task-dialog/QuickTaskDialog';

export function Layout() {
  return (
    <div>
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <header className="flex items-center justify-end gap-3 border-b border-border px-8 py-4">
          <QuickTaskDialog />
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
