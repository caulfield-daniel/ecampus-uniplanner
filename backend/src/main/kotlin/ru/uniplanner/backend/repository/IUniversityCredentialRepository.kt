package ru.uniplanner.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.uniplanner.backend.entity.UniversityCredentialEntity
import java.util.UUID

interface IUniversityCredentialRepository : JpaRepository<UniversityCredentialEntity, UUID> {
    fun findByUserId(userId: UUID): UniversityCredentialEntity?
    fun deleteByUserId(userId: UUID)
}
