// Точка входа mocks: единый экспорт сервера, хендлеров, фабрик фикстур
// и сброса in-memory состояния — всё, что нужно интеграционным тестам.
export { server } from './server';
export { handlers, resetDb, makeUser, makeTask, makeNote, makeLesson } from './handlers';
