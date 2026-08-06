package ru.uniplanner.shared

import kotlinx.serialization.Serializable

/**
 * Вспомогательный класс для валидации моделей API в соответствии с ограничениями,
 * определёнными в спецификации OpenAPI.
 */
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

        return ValidationResult(errors.isEmpty(), errors)
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

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateLoginRequest(request: LoginRequest): ValidationResult {
        val errors = mutableListOf<String>()

        if (!isValidEmail(request.email)) {
            errors.add("Неверный формат email: ${request.email}")
        }

        if (request.password.isBlank()) {
            errors.add("Пароль не может быть пустым")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateTask(task: Task): ValidationResult {
        val errors = mutableListOf<String>()

        if (task.title.isBlank()) {
            errors.add("Название задачи не может быть пустым")
        }

        if (task.priority !in 1..5) {
            errors.add("Приоритет задачи должен быть от 1 до 5, получено: ${task.priority}")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateTaskInput(input: TaskInput): ValidationResult {
        val errors = mutableListOf<String>()

        if (input.title.isBlank()) {
            errors.add("Название задачи не может быть пустым")
        }

        if (input.priority !in 1..5) {
            errors.add("Приоритет задачи должен быть от 1 до 5, получено: ${input.priority}")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateNote(note: Note): ValidationResult {
        val errors = mutableListOf<String>()

        if (note.title.isBlank()) {
            errors.add("Название заметки не может быть пустым")
        }

        if (note.content.isBlank()) {
            errors.add("Содержимое заметки не может быть пустым")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateNoteInput(input: NoteInput): ValidationResult {
        val errors = mutableListOf<String>()

        if (input.title.isBlank()) {
            errors.add("Название заметки не может быть пустым")
        }

        if (input.content.isBlank()) {
            errors.add("Содержимое заметки не может быть пустым")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateLesson(lesson: Lesson): ValidationResult {
        val errors = mutableListOf<String>()

        if (lesson.id < 0) {
            errors.add("ID занятия должен быть положительным")
        }

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

        return ValidationResult(errors.isEmpty(), errors)
    }

    // Валидаторы для моделей парсера расписания

    fun validateInstitute(institute: Institute): ValidationResult {
        val errors = mutableListOf<String>()

        if (institute.id < 0) {
            errors.add("ID института должен быть неотрицательным")
        }

        if (institute.shortName.isBlank()) {
            errors.add("Краткое название института не может быть пустым")
        }

        if (institute.shortName.length > 10) {
            errors.add("Краткое название института не должно превышать 10 символов")
        }

        if (institute.name.isBlank()) {
            errors.add("Полное название института не может быть пустым")
        }

        if (institute.name.length > 100) {
            errors.add("Полное название института не должно превышать 100 символов")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateSpecialty(specialty: Specialty): ValidationResult {
        val errors = mutableListOf<String>()

        if (specialty.id < 0) {
            errors.add("ID специальности должен быть неотрицательным")
        }

        if (specialty.name.isBlank()) {
            errors.add("Название специальности не может быть пустым")
        }

        if (specialty.name.length > 100) {
            errors.add("Название специальности не должно превышать 100 символов")
        }

        if (specialty.instituteId < 0) {
            errors.add("ID института в специальности должен быть неотрицательным")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateAcademicGroup(group: AcademicGroup): ValidationResult {
        val errors = mutableListOf<String>()

        if (group.id < 0) {
            errors.add("ID академической группы должен быть неотрицательным")
        }

        if (group.name.isBlank()) {
            errors.add("Название академической группы не может быть пустым")
        }

        if (group.name.length > 50) {
            errors.add("Название академической группы не должно превышать 50 символов")
        }

        if (group.eduLevel.isBlank()) {
            errors.add("Уровень образования не может быть пустым")
        }

        if (group.eduLevel.length > 50) {
            errors.add("Уровень образования не должен превышать 50 символов")
        }

        if (group.specialtyId < 0) {
            errors.add("ID специальности в академической группе должен быть неотрицательным")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateTeacher(teacher: Teacher): ValidationResult {
        val errors = mutableListOf<String>()

        if (teacher.id < 0) {
            errors.add("ID преподавателя должен быть неотрицательным")
        }

        if (teacher.name.isBlank()) {
            errors.add("Имя преподавателя не может быть пустым")
        }

        if (teacher.name.length > 100) {
            errors.add("Имя преподавателя не должно превышать 100 символов")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateRoom(room: Room): ValidationResult {
        val errors = mutableListOf<String>()

        if (room.id < 0) {
            errors.add("ID аудитории должен быть неотрицательным")
        }

        if (room.name.isBlank()) {
            errors.add("Название аудитории не может быть пустым")
        }

        if (room.name.length > 50) {
            errors.add("Название аудитории не должно превышать 50 символов")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateParserStatusResponse(response: ParserStatusResponse): ValidationResult {
        val errors = mutableListOf<String>()

        if (!isValidParserStatus(response.status)) {
            errors.add("Статус парсера должен быть одним из: running, idle, error, получено: ${response.status}")
        }

        if (response.groupsCount < 0) {
            errors.add("Количество групп не может быть отрицательным")
        }

        if (response.lessonsCount < 0) {
            errors.add("Количество занятий не может быть отрицательным")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun validateParserSyncRequest(request: ParserSyncRequest): ValidationResult {
        val errors = mutableListOf<String>()

        if (request.startDate != null && !isValidDateFormat(request.startDate)) {
            errors.add("Неверный формат даты начала: ${request.startDate}")
        }

        if (request.endDate != null && !isValidDateFormat(request.endDate)) {
            errors.add("Неверный формат даты окончания: ${request.endDate}")
        }

        if (request.startDate != null && request.endDate != null &&
            request.startDate > request.endDate) {
            errors.add("Дата начала не может быть позже даты окончания")
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    private fun isValidParserStatus(status: String): Boolean {
        return listOf("running", "idle", "error").contains(status.lowercase())
    }

    private fun isValidDateFormat(date: String): Boolean {
        val dateRegex = Regex("^\\d{4}-\\d{2}-\\d{2}$") // YYYY-MM-DD format
        return dateRegex.matches(date)
    }

    private fun isValidEmail(email: String): Boolean {
        val emailRegex = Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
        return emailRegex.matches(email)
    }
}

@Serializable
data class ValidationResult(
    val isValid: Boolean,
    val errors: List<String> = emptyList()
) {
    companion object {
        fun valid(): ValidationResult = ValidationResult(true, emptyList())
        fun invalid(errors: List<String>): ValidationResult = ValidationResult(false, errors)
    }
}

// Расширения для удобной проверки валидации
fun ValidationResult.requireValid() {
    if (!isValid) {
        throw IllegalArgumentException("Ошибка валидации: ${errors.joinToString(", ")}")
    }
}