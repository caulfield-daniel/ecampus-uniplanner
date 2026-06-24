package ru.uniplanner.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "university_credentials")
class UniversityCredentialEntity(
    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(name = "user_id", nullable = false, unique = true)
    val userId: UUID,

    @Column(name = "encrypted_session_blob", nullable = false)
    var encryptedSessionBlob: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: OffsetDateTime = OffsetDateTime.now(),

    @Column(name = "last_validated_at")
    var lastValidatedAt: OffsetDateTime? = null,

    @Column(name = "is_valid", nullable = false)
    var isValid: Boolean = true
) {
    fun touch() {
        lastValidatedAt = OffsetDateTime.now()
        isValid = true
    }

    fun invalidate() {
        isValid = false
    }
}
