-- ============================================
-- Личные сессии пользователей в ИС университета (ecampus.ncfu.ru)
-- Хранится зашифрованный cookie-blob сессии, НЕ пароль.
-- ============================================

CREATE TABLE university_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    encrypted_session_blob TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_validated_at TIMESTAMP WITH TIME ZONE,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX idx_university_credentials_user_id ON university_credentials(user_id);

COMMENT ON TABLE university_credentials IS 'Привязка личного аккаунта пользователя в ecampus.ncfu.ru (зашифрованная сессия, без пароля)';
COMMENT ON COLUMN university_credentials.encrypted_session_blob IS 'Cookies сессии ecampus, зашифрованные AES-GCM (см. UniversitySessionCrypto)';
COMMENT ON COLUMN university_credentials.is_valid IS 'false, если сессия протухла (требуется повторная привязка через капчу)';
