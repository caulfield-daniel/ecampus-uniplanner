package ru.uniplanner.backend.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import ru.uniplanner.backend.security.currentUserId
import ru.uniplanner.backend.service.INoteService
import ru.uniplanner.shared.ApiConstants
import ru.uniplanner.shared.ModelValidators
import ru.uniplanner.shared.Note
import ru.uniplanner.shared.NoteInput
import ru.uniplanner.shared.requireValid

// Control-слой PCMEF: CRUD заметок текущего пользователя.
@RestController
@RequestMapping(ApiConstants.ENDPOINT_NOTES)
class NoteController(private val noteService: INoteService) {

    @GetMapping
    fun list(
        authentication: Authentication,
        @RequestParam(required = false) lessonId: Long?
    ): List<Note> = noteService.listForUser(authentication.currentUserId(), lessonId)

    @PostMapping
    fun create(authentication: Authentication, @RequestBody input: NoteInput): ResponseEntity<Note> {
        ModelValidators.validateNoteInput(input).requireValid()
        val created = noteService.create(authentication.currentUserId(), input)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @PutMapping("/{id}")
    fun update(
        authentication: Authentication,
        @PathVariable id: Long,
        @RequestBody input: NoteInput
    ): Note {
        ModelValidators.validateNoteInput(input).requireValid()
        return noteService.update(authentication.currentUserId(), id, input)
    }

    @DeleteMapping("/{id}")
    fun delete(authentication: Authentication, @PathVariable id: Long): ResponseEntity<Void> {
        noteService.delete(authentication.currentUserId(), id)
        return ResponseEntity.noContent().build()
    }
}
