// Общая навигация для защищённых страниц (Tasks/Notes/Schedule).
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #444' }}>
        <NavLink to="/tasks">Задачи</NavLink>
        <NavLink to="/notes">Заметки</NavLink>
        <NavLink to="/schedule">Расписание</NavLink>
        <span style={{ marginLeft: 'auto' }}>{user?.fullName}</span>
        <button onClick={handleLogout}>Выйти</button>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
