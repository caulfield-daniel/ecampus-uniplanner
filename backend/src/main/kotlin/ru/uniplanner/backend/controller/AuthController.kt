package ru.uniplanner.backend.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.uniplanner.backend.security.currentUserId
import ru.uniplanner.backend.service.IAuthService
import ru.uniplanner.shared.ApiConstants
import ru.uniplanner.shared.LoginRequest
import ru.uniplanner.shared.LoginResponse
import ru.uniplanner.shared.ModelValidators
import ru.uniplanner.shared.RegisterRequest
import ru.uniplanner.shared.User
import ru.uniplanner.shared.requireValid

// Control-слой PCMEF: регистрация/логин/текущий пользователь приложения (JWT).
@RestController
class AuthController(private val authService: IAuthService) {

    @PostMapping(ApiConstants.ENDPOINT_AUTH_REGISTER)
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<User> {
        ModelValidators.validateRegisterRequest(request).requireValid()
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request))
    }

    @PostMapping(ApiConstants.ENDPOINT_AUTH_LOGIN)
    fun login(@RequestBody request: LoginRequest): LoginResponse {
        ModelValidators.validateLoginRequest(request).requireValid()
        return authService.login(request)
    }

    @GetMapping(ApiConstants.ENDPOINT_AUTH_ME)
    fun me(authentication: Authentication): User = authService.getCurrentUser(authentication.currentUserId())
}
