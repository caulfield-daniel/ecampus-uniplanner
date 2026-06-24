-- ============================================
-- Связь задач/заметок с конкретным занятием расписания (опционально).
-- ============================================

ALTER TABLE tasks ADD COLUMN lesson_id BIGINT NULL REFERENCES cached_lessons(id) ON DELETE SET NULL;
ALTER TABLE notes ADD COLUMN lesson_id BIGINT NULL REFERENCES cached_lessons(id) ON DELETE SET NULL;

CREATE INDEX idx_tasks_lesson_id ON tasks(lesson_id);
CREATE INDEX idx_notes_lesson_id ON notes(lesson_id);

COMMENT ON COLUMN tasks.lesson_id IS 'Занятие, к которому относится задача (NULL — общая задача)';
COMMENT ON COLUMN notes.lesson_id IS 'Занятие, к которому относится заметка (NULL — общая заметка)';
