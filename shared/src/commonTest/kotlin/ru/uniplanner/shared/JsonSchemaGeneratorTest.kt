package ru.uniplanner.shared

import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import ru.uniplanner.shared.schema.JsonSchemaGenerator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

/**
 * Тесты кастомного генератора JSON Schema (shared/.../schema/JsonSchemaGenerator.kt).
 *
 * Гарантируют:
 *  - для каждой модели генерируется валидный JSON Schema с title = имя модели;
 *  - наборы properties и required точно соответствуют объявлению data-класса;
 *  - формат вывода стабилен (золотые снимки) — критично для CI-проверки git diff.
 */
class JsonSchemaGeneratorTest {

    private val generator = JsonSchemaGenerator()
    private val json = Json

    /** modelName -> (serializer, (все свойства в порядке объявления, required)) */
    private val models: Map<String, Pair<KSerializer<*>, Pair<List<String>, List<String>>>> = mapOf(
        "AcademicGroup" to (AcademicGroup.serializer() to (listOf("id", "name", "eduLevel", "specialtyId") to listOf("id", "name", "eduLevel", "specialtyId"))),
        "CaptchaChallengeResponse" to (CaptchaChallengeResponse.serializer() to (listOf("attemptId", "captchaImageBase64") to listOf("attemptId", "captchaImageBase64"))),
        "ErrorResponse" to (ErrorResponse.serializer() to (listOf("code", "message") to listOf("code", "message"))),
        "GroupInfo" to (GroupInfo.serializer() to (listOf("id", "name", "institute", "specialty") to listOf("id", "name"))),
        "Institute" to (Institute.serializer() to (listOf("id", "shortName", "name", "branchId") to listOf("id", "shortName", "name"))),
        "Lesson" to (Lesson.serializer() to (listOf("id", "group", "date", "weekday", "discipline", "type", "timeStart", "timeEnd", "teacher", "room", "subgroup") to listOf("id", "group", "date", "weekday", "discipline", "type", "timeStart", "timeEnd"))),
        "LoginRequest" to (LoginRequest.serializer() to (listOf("email", "password") to listOf("email", "password"))),
        "LoginResponse" to (LoginResponse.serializer() to (listOf("token", "user") to listOf("token", "user"))),
        "Note" to (Note.serializer() to (listOf("id", "title", "content", "relatedLessonId") to listOf("id", "title", "content"))),
        "NoteInput" to (NoteInput.serializer() to (listOf("title", "content", "relatedLessonId") to listOf("title", "content"))),
        "ParserStatusResponse" to (ParserStatusResponse.serializer() to (listOf("status", "lastUpdate", "groupsCount", "lessonsCount") to listOf("status", "groupsCount", "lessonsCount"))),
        "ParserSyncRequest" to (ParserSyncRequest.serializer() to (listOf("startDate", "endDate", "groups") to emptyList())),
        "ParserSyncResponse" to (ParserSyncResponse.serializer() to (listOf("group", "startDate", "endDate", "syncedLessons", "status") to listOf("group"))),
        "RegisterRequest" to (RegisterRequest.serializer() to (listOf("email", "password", "fullName", "groupName") to listOf("email", "password", "fullName", "groupName"))),
        "Room" to (Room.serializer() to (listOf("id", "name") to listOf("id", "name"))),
        "Specialty" to (Specialty.serializer() to (listOf("id", "name", "instituteId") to listOf("id", "name", "instituteId"))),
        "Task" to (Task.serializer() to (listOf("id", "title", "description", "deadline", "priority", "completed", "relatedLessonId") to listOf("id", "title", "deadline", "priority", "completed"))),
        "TaskInput" to (TaskInput.serializer() to (listOf("title", "description", "deadline", "priority", "completed", "relatedLessonId") to listOf("title", "deadline", "priority"))),
        "Teacher" to (Teacher.serializer() to (listOf("id", "name") to listOf("id"))),
        "UniversityLinkStatus" to (UniversityLinkStatus.serializer() to (listOf("linked", "lastValidatedAt") to listOf("linked"))),
        "UniversityLoginRequest" to (UniversityLoginRequest.serializer() to (listOf("attemptId", "login", "password", "captchaAnswer") to listOf("attemptId", "login", "password", "captchaAnswer"))),
        "User" to (User.serializer() to (listOf("id", "email", "fullName", "groupName") to listOf("id", "email", "fullName", "groupName"))),
        "ValidationResult" to (ValidationResult.serializer() to (listOf("isValid", "errors") to listOf("isValid"))),
    )

    @Test
    fun allModelsGenerateValidSchemaWithCorrectPropsAndRequired() {
        assertEquals(23, models.size, "Ожидалось 23 модели (22 + ValidationResult)")
        models.forEach { (name, entry) ->
            val (serializer, expected) = entry
            val root = json.parseToJsonElement(generator.generate(name, serializer)).jsonObject

            assertEquals("object", root["type"]?.jsonPrimitive?.content, "type у $name")
            assertEquals(name, root["title"]?.jsonPrimitive?.content, "title у $name")

            val actualProps = root["properties"]?.jsonObject?.keys?.toList().orEmpty()
            assertEquals(expected.first, actualProps, "properties у $name")

            val actualRequired = root["required"]?.jsonArray?.map { it.jsonPrimitive.content }.orEmpty()
            assertEquals(expected.second, actualRequired, "required у $name")
        }
    }

    @Test
    fun goldenSnapshotTask() {
        val expected = """
            {
              "type": "object",
              "title": "Task",
              "properties": {
                "id": {
                  "type": "integer"
                },
                "title": {
                  "type": "string"
                },
                "description": {
                  "type": [
                    "string",
                    "null"
                  ]
                },
                "deadline": {
                  "type": "string"
                },
                "priority": {
                  "type": "integer"
                },
                "completed": {
                  "type": "boolean"
                },
                "relatedLessonId": {
                  "type": [
                    "integer",
                    "null"
                  ]
                }
              },
              "required": [
                "id",
                "title",
                "deadline",
                "priority",
                "completed"
              ]
            }
        """.trimIndent()
        assertEquals(expected, generator.generate("Task", Task.serializer()).trimEnd())
    }

    @Test
    fun goldenSnapshotLoginResponse() {
        val expected = """
            {
              "type": "object",
              "title": "LoginResponse",
              "properties": {
                "token": {
                  "type": "string"
                },
                "user": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "fullName": {
                      "type": "string"
                    },
                    "groupName": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "id",
                    "email",
                    "fullName",
                    "groupName"
                  ]
                }
              },
              "required": [
                "token",
                "user"
              ]
            }
        """.trimIndent()
        assertEquals(expected, generator.generate("LoginResponse", LoginResponse.serializer()).trimEnd())
    }

    @Test
    fun goldenSnapshotParserSyncRequestNoRequiredKey() {
        val expected = """
            {
              "type": "object",
              "title": "ParserSyncRequest",
              "properties": {
                "startDate": {
                  "type": [
                    "string",
                    "null"
                  ]
                },
                "endDate": {
                  "type": [
                    "string",
                    "null"
                  ]
                },
                "groups": {
                  "type": [
                    "array",
                    "null"
                  ],
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
        """.trimIndent()
        assertEquals(expected, generator.generate("ParserSyncRequest", ParserSyncRequest.serializer()).trimEnd())
    }

    @Serializable
    private data class WithSerialName(
        @SerialName("camelCase") val snake_case: String,
        val optional: Int? = null
    )

    @Test
    fun serialNameAndNullableFieldsAreRespected() {
        val root = json.parseToJsonElement(generator.generate("WithSerialName", WithSerialName.serializer())).jsonObject
        val props = root["properties"]?.jsonObject ?: error("нет properties")
        assertTrue("camelCase" in props.keys, "ожидался ключ camelCase")
        assertTrue("snake_case" !in props.keys, "snake_case не должен попасть в properties")
        assertEquals(listOf("camelCase"), root["required"]?.jsonArray?.map { it.jsonPrimitive.content })

        val optional = props["optional"]?.jsonObject ?: error("нет поля optional")
        assertEquals(listOf("integer", "null"), optional["type"]?.jsonArray?.map { it.jsonPrimitive.content })
        assertNotNull(props["optional"])
    }
}
