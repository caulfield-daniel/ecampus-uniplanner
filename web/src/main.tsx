import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './index.css';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Toaster всегда смонтирован — тосты отображаются поверх всего приложения.
        Стили sonner подключаются автоматически (в v2 CSS инжектится рантаймом), css-импорт не нужен. */}
    <App />
    <Toaster position="top-right" />
  </StrictMode>,
);
