package ru.uniplanner.backend.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import ru.uniplanner.backend.entity.TaskEntity
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.repository.ITaskRepository
import ru.uniplanner.shared.TaskInput
import java.time.OffsetDateTime
import java.util.UUID

class TaskServiceImplTest {

    private val taskRepository = mockk<ITaskRepository>()
    private val taskService = TaskServiceImpl(taskRepository)
    private val userId: UUID = UUID.randomUUID()

    @Test
    fun `listForUser maps entities to dto`() {
        val entity = TaskEntity(
            id = 1L,
            userId = userId,
            title = "Сделать лабу",
            deadline = OffsetDateTime.now().plusDays(1),
            priority = 2
        )
        every { taskRepository.findByUserId(userId) } returns listOf(entity)

        val result = taskService.listForUser(userId)

        assertEquals(1, result.size)
        assertEquals("Сделать лабу", result.first().title)
    }

    @Test
    fun `create saves new task`() {
        val input = TaskInput(
            title = "Новая задача",
            deadline = OffsetDateTime.now().plusDays(2).toString(),
            priority = 3
        )
        every { taskRepository.save(any()) } answers {
            val entity = firstArg<TaskEntity>()
            TaskEntity(
                id = 1L,
                userId = entity.userId,
                title = entity.title,
                description = entity.description,
                deadline = entity.deadline,
                priority = entity.priority,
                completed = entity.completed
            )
        }

        val result = taskService.create(userId, input)

        assertEquals(input.title, result.title)
        verify { taskRepository.save(any()) }
    }

    @Test
    fun `update marks task completed and reschedules`() {
        val entity = TaskEntity(
            id = 1L,
            userId = userId,
            title = "Старое название",
            deadline = OffsetDateTime.now(),
            priority = 3,
            completed = false
        )
        val newDeadline = OffsetDateTime.now().plusDays(5)
        val input = TaskInput(
            title = "Новое название",
            deadline = newDeadline.toString(),
            priority = 1,
            completed = true
        )
        every { taskRepository.findByIdAndUserId(1L, userId) } returns entity
        every { taskRepository.save(entity) } returns entity

        val result = taskService.update(userId, 1L, input)

        assertEquals("Новое название", result.title)
        assertTrue(result.completed)
        assertEquals(1, result.priority)
    }

    @Test
    fun `update throws when task not found`() {
        val input = TaskInput(title = "x", deadline = OffsetDateTime.now().toString(), priority = 1)
        every { taskRepository.findByIdAndUserId(99L, userId) } returns null

        assertThrows(NotFoundException::class.java) { taskService.update(userId, 99L, input) }
    }

    @Test
    fun `delete removes existing task`() {
        val entity = TaskEntity(
            id = 1L,
            userId = userId,
            title = "Задача",
            deadline = OffsetDateTime.now(),
            priority = 3
        )
        every { taskRepository.findByIdAndUserId(1L, userId) } returns entity
        every { taskRepository.delete(entity) } returns Unit

        taskService.delete(userId, 1L)

        verify { taskRepository.delete(entity) }
    }

    @Test
    fun `delete throws when task not found`() {
        every { taskRepository.findByIdAndUserId(42L, userId) } returns null

        assertThrows(NotFoundException::class.java) { taskService.delete(userId, 42L) }
    }
}
