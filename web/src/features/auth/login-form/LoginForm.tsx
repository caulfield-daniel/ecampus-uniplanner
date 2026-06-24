import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function LoginForm() {
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
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось выполнить запрос');
    }
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-sm">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Student Hub</h1>
      <div className="mb-4 flex gap-2">
        <Button variant={mode === 'login' ? 'default' : 'outline'} onClick={() => setMode('login')}>
          Вход
        </Button>
        <Button variant={mode === 'register' ? 'default' : 'outline'} onClick={() => setMode('register')}>
          Регистрация
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {mode === 'register' && (
          <>
            <div className="space-y-1">
              <Label htmlFor="fullName">ФИО</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="groupName">Группа</Label>
              <Input id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
            </div>
          </>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit">{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</Button>
      </form>
    </div>
  );
}
