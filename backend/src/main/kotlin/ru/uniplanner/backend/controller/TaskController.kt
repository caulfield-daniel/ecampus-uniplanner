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
import ru.uniplanner.backend.service.ITaskService
import ru.uniplanner.shared.ApiConstants
import ru.uniplanner.shared.ModelValidators
import ru.uniplanner.shared.Task
import ru.uniplanner.shared.TaskInput
import ru.uniplanner.shared.requireValid

// Control-слой PCMEF: CRUD задач текущего пользователя.
@RestController
@RequestMapping(ApiConstants.ENDPOINT_TASKS)
class TaskController(private val taskService: ITaskService) {

    @GetMapping
    fun list(
        authentication: Authentication,
        @RequestParam(required = false) lessonId: Long?
    ): List<Task> = taskService.listForUser(authentication.currentUserId(), lessonId)

    @PostMapping
    fun create(authentication: Authentication, @RequestBody input: TaskInput): ResponseEntity<Task> {
        ModelValidators.validateTaskInput(input).requireValid()
        val created = taskService.create(authentication.currentUserId(), input)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @PutMapping("/{id}")
    fun update(
        authentication: Authentication,
        @PathVariable id: Long,
        @RequestBody input: TaskInput
    ): Task {
        ModelValidators.validateTaskInput(input).requireValid()
        return taskService.update(authentication.currentUserId(), id, input)
    }

    @DeleteMapping("/{id}")
    fun delete(authentication: Authentication, @PathVariable id: Long): ResponseEntity<Void> {
        taskService.delete(authentication.currentUserId(), id)
        return ResponseEntity.noContent().build()
    }
}
