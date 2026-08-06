// Публичный API сущности lesson (FSD): scheduleApi, react-query хуки
// расписания (scheduleKeys, useScheduleQuery, useGroupsQuery) и карточка
// занятия LessonCard. Потребители импортируют только из этого барреля,
// не из внутренних модулей сущности.
// Тип Lesson потребители берут из @/shared/types — здесь он не переэкспортируется.
export { scheduleApi } from './api/scheduleApi';
export { scheduleKeys, useScheduleQuery, useGroupsQuery } from './model/queries';
export { LessonCard } from './ui/LessonCard';
