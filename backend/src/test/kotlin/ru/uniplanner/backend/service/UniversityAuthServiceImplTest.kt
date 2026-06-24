package ru.uniplanner.backend.service

import com.fasterxml.jackson.databind.ObjectMapper
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import reactor.core.publisher.Mono
import ru.uniplanner.backend.entity.UniversityCredentialEntity
import ru.uniplanner.backend.exception.UnauthorizedException
import ru.uniplanner.backend.foundation.ParserCaptchaChallenge
import ru.uniplanner.backend.foundation.ParserLoginResult
import ru.uniplanner.backend.foundation.UniversityAuthClient
import ru.uniplanner.backend.repository.IUniversityCredentialRepository
import ru.uniplanner.backend.security.UniversitySessionCrypto
import ru.uniplanner.shared.UniversityLoginRequest
import java.util.UUID

class UniversityAuthServiceImplTest {

    private val client = mockk<UniversityAuthClient>()
    private val repository = mockk<IUniversityCredentialRepository>()
    private val crypto = mockk<UniversitySessionCrypto>()
    private val objectMapper = ObjectMapper()
    private val service = UniversityAuthServiceImpl(client, repository, crypto, objectMapper)
    private val userId: UUID = UUID.randomUUID()

    @Test
    fun `startCaptchaChallenge maps parser response to dto`() {
        every { client.startCaptcha() } returns Mono.just(ParserCaptchaChallenge("attempt-1", "base64image"))

        val result = service.startCaptchaChallenge()

        assertEquals("attempt-1", result.attemptId)
        assertEquals("base64image", result.captchaImageBase64)
    }

    @Test
    fun `completeLogin creates new credential on success`() {
        val request = UniversityLoginRequest("attempt-1", "student", "pass", "7")
        every {
            client.completeLogin("attempt-1", "student", "pass", "7")
        } returns Mono.just(ParserLoginResult(success = true, cookies = mapOf("PHPSESSID" to "abc")))
        every { repository.findByUserId(userId) } returns null
        every { crypto.encrypt(any()) } returns "encrypted-blob"
        every { repository.save(any()) } answers { firstArg<UniversityCredentialEntity>() }

        val result = service.completeLogin(userId, request)

        assertTrue(result.linked)
        verify {
            repository.save(withArg<UniversityCredentialEntity> {
                assertEquals(userId, it.userId)
                assertEquals("encrypted-blob", it.encryptedSessionBlob)
                assertTrue(it.isValid)
            })
        }
    }

    @Test
    fun `completeLogin updates existing credential on success`() {
        val request = UniversityLoginRequest("attempt-1", "student", "pass", "7")
        val existing = UniversityCredentialEntity(userId = userId, encryptedSessionBlob = "old-blob", isValid = false)
        every {
            client.completeLogin(any(), any(), any(), any())
        } returns Mono.just(ParserLoginResult(success = true, cookies = mapOf("PHPSESSID" to "abc")))
        every { repository.findByUserId(userId) } returns existing
        every { crypto.encrypt(any()) } returns "new-blob"
        every { repository.save(any()) } answers { firstArg<UniversityCredentialEntity>() }

        val result = service.completeLogin(userId, request)

        assertTrue(result.linked)
        assertEquals("new-blob", existing.encryptedSessionBlob)
        assertTrue(existing.isValid)
    }

    @Test
    fun `completeLogin throws UnauthorizedException on invalid captcha`() {
        val request = UniversityLoginRequest("attempt-1", "student", "pass", "wrong")
        every {
            client.completeLogin(any(), any(), any(), any())
        } returns Mono.just(ParserLoginResult(success = false, reason = "invalid_captcha"))

        val exception = assertThrows(UnauthorizedException::class.java) { service.completeLogin(userId, request) }
        assertEquals("invalid_captcha", exception.message)
        verify(exactly = 0) { repository.save(any()) }
    }

    @Test
    fun `unlink deletes credential by user id`() {
        every { repository.deleteByUserId(userId) } returns Unit

        service.unlink(userId)

        verify { repository.deleteByUserId(userId) }
    }

    @Test
    fun `getLinkStatus returns not linked when no credential exists`() {
        every { repository.findByUserId(userId) } returns null

        val status = service.getLinkStatus(userId)

        assertFalse(status.linked)
    }

    @Test
    fun `getLinkStatus returns linked when credential is valid`() {
        val entity = UniversityCredentialEntity(userId = userId, encryptedSessionBlob = "blob", isValid = true)
        every { repository.findByUserId(userId) } returns entity

        val status = service.getLinkStatus(userId)

        assertTrue(status.linked)
    }
}
