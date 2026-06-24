import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, fullName, groupName });
      }
      navigate('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось выполнить запрос');
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto' }}>
      <h1>Ecampus UniPlanner</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setMode('login')} disabled={mode === 'login'}>
          Вход
        </button>
        <button onClick={() => setMode('register')} disabled={mode === 'register'}>
          Регистрация
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {mode === 'register' && (
          <>
            <input
              type="text"
              placeholder="ФИО"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Группа"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
}
