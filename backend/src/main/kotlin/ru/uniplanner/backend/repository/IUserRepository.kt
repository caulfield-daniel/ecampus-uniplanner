package ru.uniplanner.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.uniplanner.backend.entity.UserEntity
import java.util.UUID

interface IUserRepository : JpaRepository<UserEntity, UUID> {
    fun findByEmail(email: String): UserEntity?
    fun existsByEmail(email: String): Boolean
}
