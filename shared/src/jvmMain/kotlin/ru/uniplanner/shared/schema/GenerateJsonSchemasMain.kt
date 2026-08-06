package ru.uniplanner.shared.schema

import kotlinx.serialization.KSerializer
import ru.uniplanner.shared.AcademicGroup
import ru.uniplanner.shared.CaptchaChallengeResponse
import ru.uniplanner.shared.ErrorResponse
import ru.uniplanner.shared.GroupInfo
import ru.uniplanner.shared.Institute
import ru.uniplanner.shared.Lesson
import ru.uniplanner.shared.LoginRequest
import ru.uniplanner.shared.LoginResponse
import ru.uniplanner.shared.Note
import ru.uniplanner.shared.NoteInput
import ru.uniplanner.shared.ParserStatusResponse
import ru.uniplanner.shared.ParserSyncRequest
import ru.uniplanner.shared.ParserSyncResponse
import ru.uniplanner.shared.RegisterRequest
import ru.uniplanner.shared.Room
import ru.uniplanner.shared.Specialty
import ru.uniplanner.shared.Task
import ru.uniplanner.shared.TaskInput
import ru.uniplanner.shared.Teacher
import ru.uniplanner.shared.UniversityLinkStatus
import ru.uniplanner.shared.UniversityLoginRequest
import ru.uniplanner.shared.User
import ru.uniplanner.shared.ValidationResult
import java.io.File

/**
 * CLI-точка входа: генерирует JSON Schema всех моделей shared в указанную
 * директорию (по умолчанию `api/schemas`).
 *
 * Запуск: ./gradlew :shared:generateJsonSchemas
 * Аргумент: путь к выходной директории (абсолютный или относительный от CWD).
 */
fun main(args: Array<String>) {
    val outputDir = File(args.getOrElse(0) { "api/schemas" })
    outputDir.mkdirs()

    // Стабильный порядок: алфавитный по имени модели (порядок файлов в api/schemas).
    val models: LinkedHashMap<String, KSerializer<*>> = linkedMapOf(
        "AcademicGroup" to AcademicGroup.serializer(),
        "CaptchaChallengeResponse" to CaptchaChallengeResponse.serializer(),
        "ErrorResponse" to ErrorResponse.serializer(),
        "GroupInfo" to GroupInfo.serializer(),
        "Institute" to Institute.serializer(),
        "Lesson" to Lesson.serializer(),
        "LoginRequest" to LoginRequest.serializer(),
        "LoginResponse" to LoginResponse.serializer(),
        "Note" to Note.serializer(),
        "NoteInput" to NoteInput.serializer(),
        "ParserStatusResponse" to ParserStatusResponse.serializer(),
        "ParserSyncRequest" to ParserSyncRequest.serializer(),
        "ParserSyncResponse" to ParserSyncResponse.serializer(),
        "RegisterRequest" to RegisterRequest.serializer(),
        "Room" to Room.serializer(),
        "Specialty" to Specialty.serializer(),
        "Task" to Task.serializer(),
        "TaskInput" to TaskInput.serializer(),
        "Teacher" to Teacher.serializer(),
        "UniversityLinkStatus" to UniversityLinkStatus.serializer(),
        "UniversityLoginRequest" to UniversityLoginRequest.serializer(),
        "User" to User.serializer(),
        "ValidationResult" to ValidationResult.serializer(),
    )

    val generator = JsonSchemaGenerator()
    models.forEach { (name, serializer) ->
        File(outputDir, "$name.json").writeText(generator.generate(name, serializer))
    }
    println("✅ Сгенерировано ${models.size} JSON Schema в ${outputDir.absolutePath}")
}
