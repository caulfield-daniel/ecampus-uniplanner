package ru.uniplanner.backend.service

import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ru.uniplanner.backend.entity.UserEntity
import ru.uniplanner.backend.exception.ConflictException
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.exception.UnauthorizedException
import ru.uniplanner.backend.mapper.UserMapper
import ru.uniplanner.backend.repository.IUserRepository
import ru.uniplanner.backend.security.JwtService
import ru.uniplanner.shared.LoginRequest
import ru.uniplanner.shared.LoginResponse
import ru.uniplanner.shared.RegisterRequest
import ru.uniplanner.shared.User
import java.util.UUID

// Mediator-слой PCMEF: регистрация, логин (BCrypt + JWT), текущий пользователь.
@Service
class AuthServiceImpl(
    private val userRepository: IUserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService
) : IAuthService {

    override fun register(request: RegisterRequest): User {
        if (userRepository.existsByEmail(request.email)) {
            throw ConflictException("Пользователь с email ${request.email} уже зарегистрирован")
        }
        val entity = UserEntity(
            email = request.email,
            passwordHash = passwordEncoder.encode(request.password),
            fullName = request.fullName,
            groupName = request.groupName
        )
        return UserMapper.toDto(userRepository.save(entity))
    }

    override fun login(request: LoginRequest): LoginResponse {
        val entity = userRepository.findByEmail(request.email)
            ?: throw UnauthorizedException("Неверный email или пароль")
        if (!passwordEncoder.matches(request.password, entity.passwordHash)) {
            throw UnauthorizedException("Неверный email или пароль")
        }
        val token = jwtService.generateToken(requireNotNull(entity.id), entity.role)
        return LoginResponse(token = token, user = UserMapper.toDto(entity))
    }

    override fun getCurrentUser(userId: UUID): User {
        val entity = userRepository.findById(userId)
            .orElseThrow { NotFoundException("Пользователь не найден") }
        return UserMapper.toDto(entity)
    }
}
