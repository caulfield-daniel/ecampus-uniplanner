package ru.uniplanner.backend.service

import org.springframework.stereotype.Service
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.mapper.TaskMapper
import ru.uniplanner.backend.repository.ITaskRepository
import ru.uniplanner.shared.Task
import ru.uniplanner.shared.TaskInput
import java.time.OffsetDateTime
import java.util.UUID

// Mediator-слой PCMEF: бизнес-сценарии CRUD задач.
@Service
class TaskServiceImpl(private val taskRepository: ITaskRepository) : ITaskService {

    override fun listForUser(userId: UUID): List<Task> =
        taskRepository.findByUserId(userId).map(TaskMapper::toDto)

    override fun create(userId: UUID, input: TaskInput): Task =
        TaskMapper.toDto(taskRepository.save(TaskMapper.toEntity(input, userId)))

    override fun update(userId: UUID, taskId: Long, input: TaskInput): Task {
        val entity = taskRepository.findByIdAndUserId(taskId, userId)
            ?: throw NotFoundException("Задача не найдена")
        entity.title = input.title
        entity.description = input.description
        entity.reschedule(OffsetDateTime.parse(input.deadline))
        entity.priority = input.priority
        if (input.completed) entity.markCompleted() else entity.completed = false
        return TaskMapper.toDto(taskRepository.save(entity))
    }

    override fun delete(userId: UUID, taskId: Long) {
        val entity = taskRepository.findByIdAndUserId(taskId, userId)
            ?: throw NotFoundException("Задача не найдена")
        taskRepository.delete(entity)
    }
}
