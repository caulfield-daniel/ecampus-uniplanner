// MSW-сервер для интеграционных тестов: перехватывает fetch-запросы httpClient
// в node-окружении vitest. Подключается в тестах стандартным образом:
//   beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
//   afterEach(() => { server.resetHandlers(); resetDb(); });
//   afterAll(() => server.close());
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
