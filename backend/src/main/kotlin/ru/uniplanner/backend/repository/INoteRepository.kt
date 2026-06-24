package ru.uniplanner.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.uniplanner.backend.entity.NoteEntity
import java.util.UUID

interface INoteRepository : JpaRepository<NoteEntity, Long> {
    fun findByUserId(userId: UUID): List<NoteEntity>
    fun findByIdAndUserId(id: Long, userId: UUID): NoteEntity?
}
