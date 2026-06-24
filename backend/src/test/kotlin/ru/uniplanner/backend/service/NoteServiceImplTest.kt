package ru.uniplanner.backend.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Test
import ru.uniplanner.backend.entity.NoteEntity
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.repository.INoteRepository
import ru.uniplanner.shared.NoteInput
import java.util.UUID

class NoteServiceImplTest {

    private val noteRepository = mockk<INoteRepository>()
    private val noteService = NoteServiceImpl(noteRepository)
    private val userId: UUID = UUID.randomUUID()

    @Test
    fun `listForUser maps entities to dto`() {
        val entity = NoteEntity(id = 1L, userId = userId, title = "Заметка", content = "Текст")
        every { noteRepository.findByUserId(userId) } returns listOf(entity)

        val result = noteService.listForUser(userId)

        assertEquals(1, result.size)
        assertEquals("Заметка", result.first().title)
    }

    @Test
    fun `create saves new note`() {
        val input = NoteInput(title = "Новая заметка", content = "Содержимое")
        every { noteRepository.save(any()) } answers {
            val entity = firstArg<NoteEntity>()
            NoteEntity(id = 1L, userId = entity.userId, title = entity.title, content = entity.content)
        }

        val result = noteService.create(userId, input)

        assertEquals(input.title, result.title)
        verify { noteRepository.save(any()) }
    }

    @Test
    fun `update changes title and content`() {
        val entity = NoteEntity(id = 1L, userId = userId, title = "Старое", content = "Старый текст")
        val input = NoteInput(title = "Новое", content = "Новый текст")
        every { noteRepository.findByIdAndUserId(1L, userId) } returns entity
        every { noteRepository.save(entity) } returns entity

        val result = noteService.update(userId, 1L, input)

        assertEquals("Новое", result.title)
        assertEquals("Новый текст", result.content)
    }

    @Test
    fun `update throws when note not found`() {
        val input = NoteInput(title = "x", content = "y")
        every { noteRepository.findByIdAndUserId(99L, userId) } returns null

        assertThrows(NotFoundException::class.java) { noteService.update(userId, 99L, input) }
    }

    @Test
    fun `delete removes existing note`() {
        val entity = NoteEntity(id = 1L, userId = userId, title = "Заметка", content = "Текст")
        every { noteRepository.findByIdAndUserId(1L, userId) } returns entity
        every { noteRepository.delete(entity) } returns Unit

        noteService.delete(userId, 1L)

        verify { noteRepository.delete(entity) }
    }

    @Test
    fun `delete throws when note not found`() {
        every { noteRepository.findByIdAndUserId(42L, userId) } returns null

        assertThrows(NotFoundException::class.java) { noteService.delete(userId, 42L) }
    }
}
