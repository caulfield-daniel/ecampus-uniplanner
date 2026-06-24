package ru.uniplanner.backend.service

import ru.uniplanner.shared.Note
import ru.uniplanner.shared.NoteInput
import java.util.UUID

interface INoteService {
    fun listForUser(userId: UUID, lessonId: Long? = null): List<Note>
    fun create(userId: UUID, input: NoteInput): Note
    fun update(userId: UUID, noteId: Long, input: NoteInput): Note
    fun delete(userId: UUID, noteId: Long)
}
