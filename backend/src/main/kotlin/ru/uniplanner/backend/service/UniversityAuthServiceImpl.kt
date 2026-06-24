package ru.uniplanner.backend.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.stereotype.Service
import ru.uniplanner.backend.entity.UniversityCredentialEntity
import ru.uniplanner.backend.exception.UnauthorizedException
import ru.uniplanner.backend.foundation.UniversityAuthClient
import ru.uniplanner.backend.repository.IUniversityCredentialRepository
import ru.uniplanner.backend.security.UniversitySessionCrypto
import ru.uniplanner.shared.CaptchaChallengeResponse
import ru.uniplanner.shared.UniversityLinkStatus
import ru.uniplanner.shared.UniversityLoginRequest
import java.util.UUID

@Service
class UniversityAuthServiceImpl(
    private val client: UniversityAuthClient,
    private val credentialRepository: IUniversityCredentialRepository,
    private val crypto: UniversitySessionCrypto,
    private val objectMapper: ObjectMapper
) : IUniversityAuthService {

    override fun startCaptchaChallenge(): CaptchaChallengeResponse {
        val challenge = client.startCaptcha().block()
            ?: throw IllegalStateException("Parser не вернул капчу")
        return CaptchaChallengeResponse(
            attemptId = challenge.attemptId,
            captchaImageBase64 = challenge.captchaImageBase64
        )
    }

    override fun completeLogin(userId: UUID, request: UniversityLoginRequest): UniversityLinkStatus {
        val result = client.completeLogin(
            attemptId = request.attemptId,
            login = request.login,
            password = request.password,
            captchaAnswer = request.captchaAnswer
        ).block() ?: throw IllegalStateException("Parser не ответил на попытку логина")

        if (!result.success) {
            throw UnauthorizedException(result.reason ?: "unknown")
        }

        val cookiesJson = objectMapper.writeValueAsString(result.cookies ?: emptyMap<String, String>())
        val encryptedBlob = crypto.encrypt(cookiesJson)

        val entity = credentialRepository.findByUserId(userId)?.also {
            it.encryptedSessionBlob = encryptedBlob
            it.touch()
        } ?: UniversityCredentialEntity(userId = userId, encryptedSessionBlob = encryptedBlob).also { it.touch() }

        val saved = credentialRepository.save(entity)
        return UniversityLinkStatus(linked = true, lastValidatedAt = saved.lastValidatedAt?.toString())
    }

    override fun unlink(userId: UUID) {
        credentialRepository.deleteByUserId(userId)
    }

    override fun getLinkStatus(userId: UUID): UniversityLinkStatus {
        val entity = credentialRepository.findByUserId(userId)
            ?: return UniversityLinkStatus(linked = false)
        return UniversityLinkStatus(linked = entity.isValid, lastValidatedAt = entity.lastValidatedAt?.toString())
    }
}
