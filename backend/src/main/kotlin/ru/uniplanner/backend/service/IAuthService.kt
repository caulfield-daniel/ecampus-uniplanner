package ru.uniplanner.backend.service

import ru.uniplanner.shared.LoginRequest
import ru.uniplanner.shared.LoginResponse
import ru.uniplanner.shared.RegisterRequest
import ru.uniplanner.shared.User
import java.util.UUID

interface IAuthService {
    fun register(request: RegisterRequest): User
    fun login(request: LoginRequest): LoginResponse
    fun getCurrentUser(userId: UUID): User
}
