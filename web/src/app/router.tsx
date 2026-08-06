import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/widgets/Layout';
import { useAuth } from '@/entities/user';
import { LoginPage } from '@/pages/LoginPage';
import { TodayPage } from '@/pages/TodayPage';
import { SchedulePage } from '@/pages/SchedulePage';
import { TasksPage } from '@/pages/TasksPage';
import { NotesPage } from '@/pages/NotesPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<TodayPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
