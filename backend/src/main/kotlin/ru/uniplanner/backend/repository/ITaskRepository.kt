package ru.uniplanner.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import ru.uniplanner.backend.entity.TaskEntity
import java.util.UUID

interface ITaskRepository : JpaRepository<TaskEntity, Long> {
    fun findByUserId(userId: UUID): List<TaskEntity>
    fun findByIdAndUserId(id: Long, userId: UUID): TaskEntity?
}
