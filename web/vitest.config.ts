import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    globals: false, // тесты в проекте используют явные импорты из vitest — оставь false
  },
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
      '@shared': import.meta.dirname + '/src/shared',
    },
  },
});
