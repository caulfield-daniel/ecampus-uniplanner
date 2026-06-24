package ru.uniplanner.backend.service

import ru.uniplanner.shared.Task
import ru.uniplanner.shared.TaskInput
import java.util.UUID

interface ITaskService {
    fun listForUser(userId: UUID, lessonId: Long? = null): List<Task>
    fun create(userId: UUID, input: TaskInput): Task
    fun update(userId: UUID, taskId: Long, input: TaskInput): Task
    fun delete(userId: UUID, taskId: Long)
}
