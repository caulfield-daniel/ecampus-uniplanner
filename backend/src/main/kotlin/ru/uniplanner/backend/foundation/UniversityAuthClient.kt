package ru.uniplanner.backend.foundation

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import reactor.core.publisher.Mono

data class ParserCaptchaChallenge(val attemptId: String, val captchaImageBase64: String)

data class ParserLoginResult(
    val success: Boolean,
    val cookies: Map<String, String>? = null,
    val reason: String? = null
)

// Поля в snake_case — так их ждёт Pydantic-схема LoginAttemptRequest в parser.
private data class ParserLoginRequestBody(
    @JsonProperty("attempt_id") val attemptId: String,
    @JsonProperty("login") val login: String,
    @JsonProperty("password") val password: String,
    @JsonProperty("captcha_answer") val captchaAnswer: String
)

/**
 * Foundation-клиент к parser-микросервису для личного логина пользователей в ecampus.
 * Чистый HTTP-доступ, без бизнес-логики (бизнес-правила — в UniversityAuthServiceImpl).
 */
@Component
class UniversityAuthClient(
    webClientBuilder: WebClient.Builder,
    @Value("\${app.parser.base-url}") parserBaseUrl: String
) {
    private val webClient = webClientBuilder.baseUrl(parserBaseUrl).build()

    fun startCaptcha(): Mono<ParserCaptchaChallenge> =
        webClient.post()
            .uri("/auth/captcha")
            .retrieve()
            .bodyToMono<Map<String, Any?>>()
            .map {
                ParserCaptchaChallenge(
                    attemptId = it["attempt_id"] as String,
                    captchaImageBase64 = it["captcha_image_base64"] as String
                )
            }

    fun completeLogin(attemptId: String, login: String, password: String, captchaAnswer: String): Mono<ParserLoginResult> =
        webClient.post()
            .uri("/auth/login")
            .bodyValue(ParserLoginRequestBody(attemptId, login, password, captchaAnswer))
            .retrieve()
            .bodyToMono<Map<String, Any?>>()
            .map {
                @Suppress("UNCHECKED_CAST")
                ParserLoginResult(
                    success = it["success"] as Boolean,
                    cookies = it["cookies"] as? Map<String, String>,
                    reason = it["reason"] as? String
                )
            }
}
