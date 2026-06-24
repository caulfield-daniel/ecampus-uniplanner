package ru.uniplanner.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.OffsetDateTime
import java.util.UUID

// Entity-слой PCMEF: задача пользователя, с бизнес-методами (не анемичная модель).
@Entity
@Table(name = "tasks")
class TaskEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "user_id", nullable = false)
    val userId: UUID,

    @Column(nullable = false)
    var title: String,

    @Column
    var description: String? = null,

    @Column(nullable = false)
    var deadline: OffsetDateTime,

    @Column(nullable = false)
    var priority: Int = 3,

    @Column(nullable = false)
    var completed: Boolean = false,

    @Column(name = "lesson_id")
    var lessonId: Long? = null,

    @Column(name = "created_at", nullable = false)
    val createdAt: OffsetDateTime = OffsetDateTime.now(),

    @Column(name = "updated_at", nullable = false)
    var updatedAt: OffsetDateTime = OffsetDateTime.now()
) {
    init {
        require(priority in 1..5) { "priority must be between 1 and 5" }
    }

    fun markCompleted() {
        completed = true
    }

    fun isOverdue(now: OffsetDateTime): Boolean = !completed && deadline.isBefore(now)

    fun reschedule(newDeadline: OffsetDateTime) {
        deadline = newDeadline
    }
}
