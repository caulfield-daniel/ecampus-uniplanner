package ru.uniplanner.backend.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Test
import org.springframework.security.crypto.password.PasswordEncoder
import ru.uniplanner.backend.entity.Role
import ru.uniplanner.backend.entity.UserEntity
import ru.uniplanner.backend.exception.ConflictException
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.exception.UnauthorizedException
import ru.uniplanner.backend.repository.IUserRepository
import ru.uniplanner.backend.security.JwtService
import ru.uniplanner.shared.LoginRequest
import ru.uniplanner.shared.RegisterRequest
import java.util.Optional
import java.util.UUID

class AuthServiceImplTest {

    private val userRepository = mockk<IUserRepository>()
    private val passwordEncoder = mockk<PasswordEncoder>()
    private val jwtService = mockk<JwtService>()
    private val authService = AuthServiceImpl(userRepository, passwordEncoder, jwtService)

    @Test
    fun `register creates new user when email is free`() {
        val request = RegisterRequest("new@example.com", "password1", "New User", "ИВТ-21-1")
        every { userRepository.existsByEmail(request.email) } returns false
        every { passwordEncoder.encode(request.password) } returns "hashed"
        every { userRepository.save(any()) } answers {
            firstArg<UserEntity>().let { it.copy(id = UUID.randomUUID()) }
        }

        val result = authService.register(request)

        assertEquals(request.email, result.email)
        assertEquals(request.fullName, result.fullName)
        verify { userRepository.save(any()) }
    }

    @Test
    fun `register throws when email already taken`() {
        val request = RegisterRequest("taken@example.com", "password1", "Someone", "ИВТ-21-1")
        every { userRepository.existsByEmail(request.email) } returns true

        assertThrows(ConflictException::class.java) { authService.register(request) }
    }

    @Test
    fun `login returns token for valid credentials`() {
        val entity = UserEntity(
            id = UUID.randomUUID(),
            email = "user@example.com",
            passwordHash = "hashed",
            fullName = "User",
            groupName = "ИВТ-21-1",
            role = Role.ROLE_USER
        )
        val request = LoginRequest(entity.email, "password1")
        every { userRepository.findByEmail(entity.email) } returns entity
        every { passwordEncoder.matches(request.password, entity.passwordHash) } returns true
        every { jwtService.generateToken(entity.id!!, entity.role) } returns "jwt-token"

        val result = authService.login(request)

        assertEquals("jwt-token", result.token)
        assertEquals(entity.email, result.user.email)
    }

    @Test
    fun `login throws when user not found`() {
        val request = LoginRequest("missing@example.com", "password1")
        every { userRepository.findByEmail(request.email) } returns null

        assertThrows(UnauthorizedException::class.java) { authService.login(request) }
    }

    @Test
    fun `login throws when password does not match`() {
        val entity = UserEntity(
            id = UUID.randomUUID(),
            email = "user@example.com",
            passwordHash = "hashed",
            fullName = "User",
            groupName = "ИВТ-21-1"
        )
        val request = LoginRequest(entity.email, "wrong-password")
        every { userRepository.findByEmail(entity.email) } returns entity
        every { passwordEncoder.matches(request.password, entity.passwordHash) } returns false

        assertThrows(UnauthorizedException::class.java) { authService.login(request) }
    }

    @Test
    fun `getCurrentUser throws when user does not exist`() {
        val userId = UUID.randomUUID()
        every { userRepository.findById(userId) } returns Optional.empty()

        assertThrows(NotFoundException::class.java) { authService.getCurrentUser(userId) }
    }

    private fun UserEntity.copy(id: UUID): UserEntity = UserEntity(
        id = id,
        email = email,
        passwordHash = passwordHash,
        fullName = fullName,
        groupName = groupName,
        role = role
    )
}
