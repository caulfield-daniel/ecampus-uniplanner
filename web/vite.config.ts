import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  // Выбираем нужный файл в зависимости от режима
  // В dev-режиме для рантайм-сборок (валидаторы) используется shared.dev из kmp,
  // в prod соответственно shared.prod.
  // Типы из shared.dev.d.ts используются постоянно (т.к нужны только для typescript и на итоговый бандл
  // не влияют)

  const sharedFile = isProd ? 'shared.prod.js' : 'shared.dev.js';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // Алиас для shared-модуля ведёт на конкретный JS-файл
        '@shared/kmp': path.resolve(
          __dirname,
          `./src/shared/kmp/${sharedFile}`,
        ),
      },
    },
    build: {
      sourcemap: !isProd,
      minify: isProd ? 'esbuild' : false,
    },
  };
});
