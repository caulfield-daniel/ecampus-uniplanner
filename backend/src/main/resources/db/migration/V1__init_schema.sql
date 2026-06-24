-- ============================================
-- Ecampus UniPlanner Backend - Initial Schema
-- Version: 1.0
-- Description: Создание всех таблиц согласно OpenAPI спецификации
-- ============================================

-- Таблица пользователей (users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    group_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check CHECK (role IN ('ROLE_USER', 'ROLE_ADMIN', 'ROLE_MANAGER')),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_group_name ON users(group_name);

-- Таблица задач (tasks)
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    priority INTEGER NOT NULL DEFAULT 3,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT tasks_priority_check CHECK (priority >= 1 AND priority <= 5)
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- Таблица заметок (notes)
CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_created_at ON notes(created_at DESC);

-- Таблица кэша расписания (cached_lessons)
CREATE TABLE cached_lessons (
    id BIGSERIAL PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    lesson_date DATE NOT NULL,
    weekday VARCHAR(20) NOT NULL,
    discipline VARCHAR(255) NOT NULL,
    lesson_type VARCHAR(50) NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    teacher VARCHAR(255),
    room VARCHAR(100),
    subgroup VARCHAR(10),
    cached_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT cached_lessons_time_check CHECK (time_end > time_start)
);

CREATE INDEX idx_cached_lessons_group_date ON cached_lessons(group_name, lesson_date);
CREATE INDEX idx_cached_lessons_date ON cached_lessons(lesson_date);
CREATE INDEX idx_cached_lessons_group ON cached_lessons(group_name);

-- ============================================
-- Триггеры для автоматического обновления updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_notes_updated_at
    BEFORE UPDATE ON notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Комментарии к таблицам (для документации)
-- ============================================

COMMENT ON TABLE users IS 'Пользователи системы (студенты)';
COMMENT ON COLUMN users.id IS 'Уникальный идентификатор (UUID)';
COMMENT ON COLUMN users.email IS 'Email пользователя (уникальный)';
COMMENT ON COLUMN users.password_hash IS 'Хэш пароля (BCrypt)';
COMMENT ON COLUMN users.full_name IS 'ФИО пользователя';
COMMENT ON COLUMN users.group_name IS 'Название учебной группы';
COMMENT ON COLUMN users.role IS 'Роль пользователя (ROLE_USER, ROLE_ADMIN, ROLE_MANAGER)';

COMMENT ON TABLE tasks IS 'Задачи пользователей';
COMMENT ON COLUMN tasks.user_id IS 'Ссылка на пользователя';
COMMENT ON COLUMN tasks.title IS 'Название задачи';
COMMENT ON COLUMN tasks.description IS 'Описание задачи';
COMMENT ON COLUMN tasks.deadline IS 'Срок выполнения (ISO 8601)';
COMMENT ON COLUMN tasks.priority IS 'Приоритет (1-5, где 1 - наивысший)';
COMMENT ON COLUMN tasks.completed IS 'Флаг выполнения';

COMMENT ON TABLE notes IS 'Заметки пользователей';
COMMENT ON COLUMN notes.user_id IS 'Ссылка на пользователя';
COMMENT ON COLUMN notes.title IS 'Название заметки';
COMMENT ON COLUMN notes.content IS 'Содержимое заметки';

COMMENT ON TABLE cached_lessons IS 'Кэш расписания занятий из парсера';
COMMENT ON COLUMN cached_lessons.group_name IS 'Название учебной группы';
COMMENT ON COLUMN cached_lessons.lesson_date IS 'Дата занятия';
COMMENT ON COLUMN cached_lessons.weekday IS 'День недели';
COMMENT ON COLUMN cached_lessons.discipline IS 'Название дисциплины';
COMMENT ON COLUMN cached_lessons.lesson_type IS 'Тип занятия (лекция, практика, лабораторная)';
COMMENT ON COLUMN cached_lessons.time_start IS 'Время начала (HH:MM)';
COMMENT ON COLUMN cached_lessons.time_end IS 'Время окончания (HH:MM)';
COMMENT ON COLUMN cached_lessons.teacher IS 'Преподаватель';
COMMENT ON COLUMN cached_lessons.room IS 'Аудитория';
COMMENT ON COLUMN cached_lessons.subgroup IS 'Подгруппа (если есть)';