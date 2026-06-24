package ru.uniplanner.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.OffsetDateTime
import java.util.UUID

enum class Role {
    ROLE_USER, ROLE_ADMIN, ROLE_MANAGER
}

// Entity-слой PCMEF: пользователь приложения (не путать с его учётной записью в ecampus —
// см. UniversityCredentialEntity).

@Entity
@Table(name = "users")
class UserEntity(
    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(name = "password_hash", nullable = false)
    var passwordHash: String,

    @Column(name = "full_name", nullable = false)
    var fullName: String,

    @Column(name = "group_name", nullable = false)
    var groupName: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var role: Role = Role.ROLE_USER,

    @Column(name = "created_at", nullable = false)
    val createdAt: OffsetDateTime = OffsetDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime = OffsetDateTime.now()
) {
    fun hasRole(expected: Role): Boolean = role == expected

    fun isAdmin(): Boolean = role == Role.ROLE_ADMIN

    fun changePassword(newPasswordHash: String) {
        passwordHash = newPasswordHash
    }
}
