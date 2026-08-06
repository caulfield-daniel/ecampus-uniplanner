import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

// Форма входа/регистрации: использует react-query мутации сущности user
// (login/register убраны из контекста в фазе 2 FSD-рефакторинга). Ошибка
// берётся из mutationError — глобальный toast об ошибках мутаций уже
// настроен в queryClient (ADR-5), здесь дублируем её текстом под формой.
export function LoginForm() {
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [groupName, setGroupName] = useState('');

  // Пока хоть одна мутация в процессе — кнопка submit заблокирована.
  const isPending = loginMutation.isPending || registerMutation.isPending;
  // Показываем ошибку активной мутации (вторая в этот момент не запущена).
  const mutationError = loginMutation.error ?? registerMutation.error;
  const error = mutationError instanceof Error ? mutationError.message : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const onSuccess = () => navigate('/');
    if (mode === 'login') {
      loginMutation.mutate({ email, password }, { onSuccess });
    } else {
      registerMutation.mutate({ email, password, fullName, groupName }, { onSuccess });
    }
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-sm">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">UniPlanner</h1>
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
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  );
}
