// Все роуты кроме /login защищены ProtectedRoute (требует токен из AuthContext).
import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { NotesPage } from './pages/NotesPage';
import { SchedulePage } from './pages/SchedulePage';
import { TaskFormPage } from './pages/TaskFormPage';
import { TasksPage } from './pages/TasksPage';

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
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/new" element={<TaskFormPage />} />
          <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
