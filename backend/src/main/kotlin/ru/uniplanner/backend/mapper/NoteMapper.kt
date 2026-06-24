package ru.uniplanner.backend.mapper

import ru.uniplanner.backend.entity.NoteEntity
import ru.uniplanner.shared.Note
import ru.uniplanner.shared.NoteInput
import java.util.UUID

object NoteMapper {
    fun toDto(entity: NoteEntity): Note = Note(
        id = requireNotNull(entity.id).toInt(),
        title = entity.title,
        content = entity.content,
        relatedLessonId = entity.lessonId?.toInt()
    )

    fun toEntity(input: NoteInput, userId: UUID): NoteEntity = NoteEntity(
        userId = userId,
        title = input.title,
        content = input.content,
        lessonId = input.relatedLessonId?.toLong()
    )
}
