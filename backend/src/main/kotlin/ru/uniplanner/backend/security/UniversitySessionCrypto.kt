package ru.uniplanner.backend.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.crypto.encrypt.Encryptors
import org.springframework.stereotype.Component

/**
 * Шифрование cookie-сессии ecampus at rest (AES-GCM через Spring Security Crypto).
 *
 * Соль здесь не секретна (это нормально для Encryptors.delux — она защищает от
 * предвычисленных словарных атак при слабом пароле, но реальная защита идёт от
 * app.university-auth.encryption-key). Ключ — отдельный секрет от app.jwt.secret:
 * компрометация одного не должна автоматически компрометировать другой.
 */
@Component
class UniversitySessionCrypto(
    @Value("\${app.university-auth.encryption-key}") encryptionKey: String
) {
    private companion object {
        // Несекретная фиксированная соль (см. KDoc выше).
        const val SALT = "c0ffee1234567890c0ffee1234567890"
    }

    // delux = AES/GCM (рекомендуемый Spring Security режим; "gcm" как имя метода не существует в текущей версии)
    private val encryptor = Encryptors.delux(encryptionKey, SALT)

    fun encrypt(plainText: String): String = encryptor.encrypt(plainText)

    fun decrypt(cipherText: String): String = encryptor.decrypt(cipherText)
}
