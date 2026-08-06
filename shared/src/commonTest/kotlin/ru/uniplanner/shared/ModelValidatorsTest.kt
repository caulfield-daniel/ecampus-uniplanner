package ru.uniplanner.shared

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue
import kotlin.test.fail

/**
 * Тесты ModelValidators (перенесены из удалённого OpenApiValidationTest.kt).
 * Покрывают все 15 валидаторов: валидные и невалидные кейсы.
 */
class ModelValidatorsTest {

    // ---------- validateUser ----------

    @Test
    fun validateUser_acceptsValid() {
        val r = ModelValidators.validateUser(User("1", "student@example.com", "Иван Иванов", "CS-101"))
        assertTrue(r.isValid)
        assertEquals(emptyList(), r.errors)
    }

    @Test
    fun validateUser_rejectsInvalidEmail() {
        val r = ModelValidators.validateUser(User("1", "bad-email", "Иван", "CS-101"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("email") })
    }

    @Test
    fun validateUser_rejectsBlankNameAndGroup() {
        val r = ModelValidators.validateUser(User("1", "student@example.com", "   ", ""))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Полное имя") })
        assertTrue(r.errors.any { it.contains("группы") })
    }

    // ---------- validateRegisterRequest ----------

    @Test
    fun validateRegisterRequest_acceptsValid() {
        val r = ModelValidators.validateRegisterRequest(RegisterRequest("a@b.ru", "secret1", "Иван", "CS-101"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateRegisterRequest_rejectsBadEmailAndShortPassword() {
        val r = ModelValidators.validateRegisterRequest(RegisterRequest("bad", "123", "Иван", "CS-101"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("email") })
        assertTrue(r.errors.any { it.contains("6 символов") })
    }

    @Test
    fun validateRegisterRequest_rejectsBlankFields() {
        val r = ModelValidators.validateRegisterRequest(RegisterRequest("a@b.ru", "password", "", ""))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Полное имя") })
        assertTrue(r.errors.any { it.contains("группы") })
    }

    // ---------- validateLoginRequest ----------

    @Test
    fun validateLoginRequest_acceptsValid() {
        val r = ModelValidators.validateLoginRequest(LoginRequest("a@b.ru", "password"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateLoginRequest_rejectsBadEmail() {
        val r = ModelValidators.validateLoginRequest(LoginRequest("bad", "password"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("email") })
    }

    @Test
    fun validateLoginRequest_rejectsBlankPassword() {
        val r = ModelValidators.validateLoginRequest(LoginRequest("a@b.ru", ""))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Пароль") })
    }

    // ---------- validateTask ----------

    @Test
    fun validateTask_acceptsValid() {
        val r = ModelValidators.validateTask(Task(1, "Задача", "описание", "2026-01-01T10:00", 3, false))
        assertTrue(r.isValid)
    }

    @Test
    fun validateTask_rejectsBlankTitle() {
        val r = ModelValidators.validateTask(Task(1, "", "описание", "2026-01-01T10:00", 3, false))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Название") })
    }

    @Test
    fun validateTask_rejectsPriorityOutOfRange() {
        val r = ModelValidators.validateTask(Task(1, "Задача", "описание", "2026-01-01T10:00", 6, false))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("1 до 5") })
    }

    // ---------- validateTaskInput ----------

    @Test
    fun validateTaskInput_acceptsValid() {
        val r = ModelValidators.validateTaskInput(TaskInput("Задача", null, "2026-01-01T10:00", 2))
        assertTrue(r.isValid)
    }

    @Test
    fun validateTaskInput_rejectsBlankTitle() {
        val r = ModelValidators.validateTaskInput(TaskInput("", null, "2026-01-01T10:00", 2))
        assertFalse(r.isValid)
    }

    @Test
    fun validateTaskInput_rejectsPriorityOutOfRange() {
        val r = ModelValidators.validateTaskInput(TaskInput("Задача", null, "2026-01-01T10:00", 0))
        assertFalse(r.isValid)
    }

    // ---------- validateNote ----------

    @Test
    fun validateNote_acceptsValid() {
        val r = ModelValidators.validateNote(Note(1, "Заголовок", "Содержимое"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateNote_rejectsBlankFields() {
        val r = ModelValidators.validateNote(Note(1, "", " "))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Название") })
        assertTrue(r.errors.any { it.contains("Содержимое") })
    }

    // ---------- validateNoteInput ----------

    @Test
    fun validateNoteInput_acceptsValid() {
        val r = ModelValidators.validateNoteInput(NoteInput("Заголовок", "Содержимое"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateNoteInput_rejectsBlankContent() {
        val r = ModelValidators.validateNoteInput(NoteInput("Заголовок", ""))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Содержимое") })
    }

    // ---------- validateLesson ----------

    @Test
    fun validateLesson_acceptsValid() {
        val r = ModelValidators.validateLesson(Lesson(1, "CS-101", "2026-09-01", "Понедельник", "Математика", "Лекция", "10:00", "11:30"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateLesson_rejectsNegativeId() {
        val r = ModelValidators.validateLesson(Lesson(-1, "CS-101", "2026-09-01", "Понедельник", "Математика", "Лекция", "10:00", "11:30"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("ID") })
    }

    @Test
    fun validateLesson_rejectsBlankRequiredStrings() {
        val r = ModelValidators.validateLesson(Lesson(1, "", "2026-09-01", "Понедельник", "", "Лекция", "10:00", "11:30"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Группа") })
        assertTrue(r.errors.any { it.contains("Дисциплина") })
    }

    // ---------- validateInstitute ----------

    @Test
    fun validateInstitute_acceptsValid() {
        val r = ModelValidators.validateInstitute(Institute(1, "ИТ", "Институт информационных технологий"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateInstitute_rejectsTooLongShortName() {
        val r = ModelValidators.validateInstitute(Institute(1, "ДлинноеНазвание", "Институт"))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("10 символов") })
    }

    @Test
    fun validateInstitute_rejectsTooLongName() {
        val r = ModelValidators.validateInstitute(Institute(1, "ИТ", "x".repeat(101)))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("100 символов") })
    }

    // ---------- validateSpecialty ----------

    @Test
    fun validateSpecialty_acceptsValid() {
        val r = ModelValidators.validateSpecialty(Specialty(1, "Программная инженерия", 1))
        assertTrue(r.isValid)
    }

    @Test
    fun validateSpecialty_rejectsNegativeIdAndInstituteId() {
        val r = ModelValidators.validateSpecialty(Specialty(-1, "Программная инженерия", -1))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("ID специальности") })
        assertTrue(r.errors.any { it.contains("ID института") })
    }

    @Test
    fun validateSpecialty_rejectsTooLongName() {
        val r = ModelValidators.validateSpecialty(Specialty(1, "x".repeat(101), 1))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("100 символов") })
    }

    // ---------- validateAcademicGroup ----------

    @Test
    fun validateAcademicGroup_acceptsValid() {
        val r = ModelValidators.validateAcademicGroup(AcademicGroup(1, "ИИ-21", "бакалавриат", 1))
        assertTrue(r.isValid)
    }

    @Test
    fun validateAcademicGroup_rejectsTooLongName() {
        val r = ModelValidators.validateAcademicGroup(AcademicGroup(1, "x".repeat(51), "бакалавриат", 1))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("50 символов") })
    }

    @Test
    fun validateAcademicGroup_rejectsBlankEduLevel() {
        val r = ModelValidators.validateAcademicGroup(AcademicGroup(1, "ИИ-21", "", 1))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("уровень") || it.contains("Уровень") })
    }

    // ---------- validateTeacher ----------

    @Test
    fun validateTeacher_acceptsValid() {
        val r = ModelValidators.validateTeacher(Teacher(1))
        assertTrue(r.isValid)
    }

    @Test
    fun validateTeacher_rejectsTooLongName() {
        val r = ModelValidators.validateTeacher(Teacher(1, "x".repeat(101)))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("100 символов") })
    }

    // ---------- validateRoom ----------

    @Test
    fun validateRoom_acceptsValid() {
        val r = ModelValidators.validateRoom(Room(1, "А-201"))
        assertTrue(r.isValid)
    }

    @Test
    fun validateRoom_rejectsTooLongName() {
        val r = ModelValidators.validateRoom(Room(1, "x".repeat(51)))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("50 символов") })
    }

    // ---------- validateParserStatusResponse ----------

    @Test
    fun validateParserStatusResponse_acceptsValid() {
        val r = ModelValidators.validateParserStatusResponse(ParserStatusResponse("idle", "2026-09-01T10:00:00Z", 3, 42))
        assertTrue(r.isValid)
    }

    @Test
    fun validateParserStatusResponse_rejectsUnknownStatus() {
        val r = ModelValidators.validateParserStatusResponse(ParserStatusResponse("bogus", null, 3, 42))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("running, idle, error") })
    }

    @Test
    fun validateParserStatusResponse_rejectsNegativeCounts() {
        val r = ModelValidators.validateParserStatusResponse(ParserStatusResponse("idle", null, 3, -1))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Количество занятий") })
    }

    // ---------- validateParserSyncRequest ----------

    @Test
    fun validateParserSyncRequest_acceptsValid() {
        val r = ModelValidators.validateParserSyncRequest(ParserSyncRequest("2026-09-01", "2026-09-07", listOf("CS-101")))
        assertTrue(r.isValid)
    }

    @Test
    fun validateParserSyncRequest_rejectsBadDateFormat() {
        val r = ModelValidators.validateParserSyncRequest(ParserSyncRequest("01-09-2026", null, null))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("Формат даты") || it.contains("формат даты") })
    }

    @Test
    fun validateParserSyncRequest_rejectsStartAfterEnd() {
        val r = ModelValidators.validateParserSyncRequest(ParserSyncRequest("2026-09-07", "2026-09-01", null))
        assertFalse(r.isValid)
        assertTrue(r.errors.any { it.contains("позже") })
    }

    // ---------- ValidationResult helpers ----------

    @Test
    fun validationResultHelpers() {
        assertTrue(ValidationResult.valid().isValid)
        assertFalse(ValidationResult.invalid(listOf("err")).isValid)
        assertEquals(listOf("err"), ValidationResult.invalid(listOf("err")).errors)
    }

    @Test
    fun requireValid_throwsOnInvalid() {
        val r = ModelValidators.validateUser(User("1", "bad", "Иван", "CS-101"))
        try {
            r.requireValid()
            fail("Ожидалось IllegalArgumentException")
        } catch (e: IllegalArgumentException) {
            assertTrue(e.message.orEmpty().contains("email"))
        }
    }
}
