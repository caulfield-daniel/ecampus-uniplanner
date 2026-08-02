// Глобальный ErrorBoundary: при необработанной ошибке рендера показывает
// заглушку с кнопками перезагрузки вместо развалившегося интерфейса.
// Классовый компонент — единственное легитимное исключение «без классов»
// в проекте: React не даёт ловить ошибки рендера в функциональных компонентах.
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/shared/ui/button';

// Состояние границы ошибки: hasError — была ли ошибка рендера в поддереве.
interface ErrorBoundaryState {
  hasError: boolean;
}

// Граница ошибки: перехватывает ошибки рендера в поддереве и показывает
// заглушку вместо развалившегося интерфейса.
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  // При ошибке рендера помечаем состояние — React перерендерит с заглушкой.
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  // Логируем ошибку в консоль для отладки.
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary поймал ошибку:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Что-то пошло не так</h1>
            <p className="text-sm text-muted-foreground">
              Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => window.location.reload()}>Перезагрузить страницу</Button>
              <Button variant="outline" onClick={() => (window.location.href = '/')}>
                На главную
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
