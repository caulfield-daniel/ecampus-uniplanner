package ru.uniplanner.backend.security

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Test

class UniversitySessionCryptoTest {

    private val crypto = UniversitySessionCrypto("test-encryption-key-1234567890")

    @Test
    fun `encrypt then decrypt returns original text`() {
        val original = """{"PHPSESSID":"abc123","__RequestVerificationToken":"xyz"}"""

        val encrypted = crypto.encrypt(original)
        val decrypted = crypto.decrypt(encrypted)

        assertNotEquals(original, encrypted)
        assertEquals(original, decrypted)
    }

    @Test
    fun `encrypting the same text twice yields different ciphertext`() {
        val original = "same-plaintext"

        val first = crypto.encrypt(original)
        val second = crypto.encrypt(original)

        assertNotEquals(first, second, "GCM должен использовать случайный IV на каждое шифрование")
    }
}
