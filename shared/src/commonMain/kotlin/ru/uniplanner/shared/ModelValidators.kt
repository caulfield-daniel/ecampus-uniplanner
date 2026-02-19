package ru.uniplanner.shared

import kotlin.js.JsExport

/**
 * Вспомогательный класс для валидации моделей API в соответствии с ограничениями,
 * определёнными в спецификации OpenAPI.
 */
@JsExport
object ModelValidators {
    
    fun validateUser(user: User): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (!isValidEmail(user.email)) {
            errors.add("Неверный формат email: ${user.email}")
        }
        
        if (user.fullName.isBlank()) {
            errors.add("Полное имя не может быть пустым")
        }
        
        if (user.groupName.isBlank()) {
            errors.add("Название группы не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateRegisterRequest(request: RegisterRequest): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (!isValidEmail(request.email)) {
            errors.add("Неверный формат email: ${request.email}")
        }
        
        if (request.password.length < 6) {
            errors.add("Пароль должен содержать не менее 6 символов")
        }
        
        if (request.fullName.isBlank()) {
            errors.add("Полное имя не может быть пустым")
        }
        
        if (request.groupName.isBlank()) {
            errors.add("Название группы не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateLoginRequest(request: LoginRequest): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (!isValidEmail(request.email)) {
            errors.add("Неверный формат email: ${request.email}")
        }
        
        if (request.password.isBlank()) {
            errors.add("Пароль не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateTask(task: Task): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (task.title.isBlank()) {
            errors.add("Название задачи не может быть пустым")
        }
        
        if (task.priority !in 1..5) {
            errors.add("Приоритет задачи должен быть от 1 до 5, получено: ${task.priority}")
        }
        
        // При необходимости можно добавить проверку формата даты
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateTaskInput(input: TaskInput): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (input.title.isBlank()) {
            errors.add("Название задачи не может быть пустым")
        }
        
        if (input.priority !in 1..5) {
            errors.add("Приоритет задачи должен быть от 1 до 5, получено: ${input.priority}")
        }
        
        // При необходимости можно добавить проверку формата даты
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateNote(note: Note): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (note.title.isBlank()) {
            errors.add("Название заметки не может быть пустым")
        }
        
        if (note.content.isBlank()) {
            errors.add("Содержимое заметки не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateNoteInput(input: NoteInput): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (input.title.isBlank()) {
            errors.add("Название заметки не может быть пустым")
        }
        
        if (input.content.isBlank()) {
            errors.add("Содержимое заметки не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    fun validateLesson(lesson: Lesson): ValidationResult {
        val errors = mutableListOf<String>()
        
        if (lesson.group.isBlank()) {
            errors.add("Группа занятия не может быть пустой")
        }
        
        if (lesson.discipline.isBlank()) {
            errors.add("Дисциплина занятия не может быть пустой")
        }
        
        if (lesson.type.isBlank()) {
            errors.add("Тип занятия не может быть пустым")
        }
        
        if (lesson.timeStart.isBlank()) {
            errors.add("Время начала занятия не может быть пустым")
        }
        
        if (lesson.timeEnd.isBlank()) {
            errors.add("Время окончания занятия не может быть пустым")
        }
        
        return if (errors.isEmpty()) ValidationResult.Valid else ValidationResult.Invalid(errors)
    }
    
    private fun isValidEmail(email: String): Boolean {
        val emailRegex = Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
        return emailRegex.matches(email)
    }
}

sealed class ValidationResult {
    object Valid : ValidationResult()
    data class Invalid(val errors: List<String>) : ValidationResult()
    
    val isValid: Boolean
        get() = this is Valid
}

// Расширения для удобной проверки валидации
fun ValidationResult.requireValid() {
    if (this is ValidationResult.Invalid) {
        throw IllegalArgumentException("Ошибка валидации: ${errors.joinToString(", ")}")
    }
}