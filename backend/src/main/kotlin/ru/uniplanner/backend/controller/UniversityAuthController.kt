package ru.uniplanner.backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.uniplanner.backend.security.currentUserId
import ru.uniplanner.backend.service.IUniversityAuthService
import ru.uniplanner.shared.ApiConstants
import ru.uniplanner.shared.CaptchaChallengeResponse
import ru.uniplanner.shared.UniversityLinkStatus
import ru.uniplanner.shared.UniversityLoginRequest

/**
 * Личный вход пользователя приложения в ecampus.ncfu.ru через капчу.
 *
 * Не путать с эндпоинтами parser-сервисного-аккаунта (общий аккаунт для скрейпинга
 * публичного расписания групп) — здесь каждый пользователь добровольно привязывает СВОЙ
 * собственный аккаунт ИС университета (легитимный кейс "Connect my account").
 * Все эндпоинты защищены JWT — userId берётся из токена, не из тела запроса.
 */
@RestController
class UniversityAuthController(private val universityAuthService: IUniversityAuthService) {

    @PostMapping(ApiConstants.ENDPOINT_UNIVERSITY_AUTH_CAPTCHA)
    fun startCaptcha(): CaptchaChallengeResponse = universityAuthService.startCaptchaChallenge()

    @PostMapping(ApiConstants.ENDPOINT_UNIVERSITY_AUTH_LOGIN)
    fun completeLogin(
        authentication: Authentication,
        @RequestBody request: UniversityLoginRequest
    ): UniversityLinkStatus = universityAuthService.completeLogin(authentication.currentUserId(), request)

    @GetMapping(ApiConstants.ENDPOINT_UNIVERSITY_AUTH_STATUS)
    fun status(authentication: Authentication): UniversityLinkStatus =
        universityAuthService.getLinkStatus(authentication.currentUserId())

    @DeleteMapping(ApiConstants.ENDPOINT_UNIVERSITY_AUTH_LINK)
    fun unlink(authentication: Authentication): ResponseEntity<Void> {
        universityAuthService.unlink(authentication.currentUserId())
        return ResponseEntity.noContent().build()
    }
}
