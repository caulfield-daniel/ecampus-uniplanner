// Публичный API сущности user (FSD): типы запросов/ответа, userApi,
// react-query хуки и контекст текущего пользователя. Потребители импортируют
// только из этого барреля, не из внутренних модулей сущности.
// Тип User потребители берут из @/shared/types — здесь он не переэкспортируется.
export type { LoginRequest, RegisterRequest, LoginResponse } from '@/shared/types';
export { userApi } from './api/userApi';
export { userKeys, useMeQuery, useLoginMutation, useRegisterMutation } from './model/queries';
export { UserProvider, useAuth, type UserContextValue } from './model/user-context';
