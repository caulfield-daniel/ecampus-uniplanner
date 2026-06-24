package ru.uniplanner.backend.mapper

import ru.uniplanner.backend.entity.TaskEntity
import ru.uniplanner.shared.Task
import ru.uniplanner.shared.TaskInput
import java.time.OffsetDateTime
import java.util.UUID

object TaskMapper {
    fun toDto(entity: TaskEntity): Task = Task(
        id = requireNotNull(entity.id).toInt(),
        title = entity.title,
        description = entity.description,
        deadline = entity.deadline.toString(),
        priority = entity.priority,
        completed = entity.completed,
        relatedLessonId = entity.lessonId?.toInt()
    )

    fun toEntity(input: TaskInput, userId: UUID): TaskEntity = TaskEntity(
        userId = userId,
        title = input.title,
        description = input.description,
        deadline = OffsetDateTime.parse(input.deadline),
        priority = input.priority,
        completed = input.completed,
        lessonId = input.relatedLessonId?.toLong()
    )
}
