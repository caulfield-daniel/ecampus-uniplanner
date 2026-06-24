package ru.uniplanner.backend.service

import ru.uniplanner.shared.CaptchaChallengeResponse
import ru.uniplanner.shared.UniversityLinkStatus
import ru.uniplanner.shared.UniversityLoginRequest
import java.util.UUID

interface IUniversityAuthService {
    fun startCaptchaChallenge(): CaptchaChallengeResponse
    fun completeLogin(userId: UUID, request: UniversityLoginRequest): UniversityLinkStatus
    fun unlink(userId: UUID)
    fun getLinkStatus(userId: UUID): UniversityLinkStatus
}
