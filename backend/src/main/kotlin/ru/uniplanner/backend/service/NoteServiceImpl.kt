package ru.uniplanner.backend.service

import org.springframework.stereotype.Service
import ru.uniplanner.backend.exception.NotFoundException
import ru.uniplanner.backend.mapper.NoteMapper
import ru.uniplanner.backend.repository.INoteRepository
import ru.uniplanner.shared.Note
import ru.uniplanner.shared.NoteInput
import java.util.UUID

// Mediator-слой PCMEF: бизнес-сценарии CRUD заметок.
@Service
class NoteServiceImpl(private val noteRepository: INoteRepository) : INoteService {

    override fun listForUser(userId: UUID): List<Note> =
        noteRepository.findByUserId(userId).map(NoteMapper::toDto)

    override fun create(userId: UUID, input: NoteInput): Note =
        NoteMapper.toDto(noteRepository.save(NoteMapper.toEntity(input, userId)))

    override fun update(userId: UUID, noteId: Long, input: NoteInput): Note {
        val entity = noteRepository.findByIdAndUserId(noteId, userId)
            ?: throw NotFoundException("Заметка не найдена")
        entity.updateContent(input.title, input.content)
        return NoteMapper.toDto(noteRepository.save(entity))
    }

    override fun delete(userId: UUID, noteId: Long) {
        val entity = noteRepository.findByIdAndUserId(noteId, userId)
            ?: throw NotFoundException("Заметка не найдена")
        noteRepository.delete(entity)
    }
}
