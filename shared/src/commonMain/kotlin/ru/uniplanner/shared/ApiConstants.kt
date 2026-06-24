package ru.uniplanner.shared

import kotlinx.serialization.Serializable
import kotlin.js.JsExport
import ru.uniplanner.shared.config.API_BASE_URL

@JsExport
object ApiConstants {
    val BASE_URL: String = API_BASE_URL

    // Эндпоинты API
    const val ENDPOINT_AUTH_REGISTER = "/auth/register"
    const val ENDPOINT_AUTH_LOGIN = "/auth/login"
    const val ENDPOINT_AUTH_ME = "/auth/me"
    const val ENDPOINT_TASKS = "/tasks"
    const val ENDPOINT_NOTES = "/notes"
    const val ENDPOINT_SCHEDULE = "/schedule"
    const val ENDPOINT_GROUPS = "/groups"
    const val ENDPOINT_UNIVERSITY_AUTH_CAPTCHA = "/university-auth/captcha"
    const val ENDPOINT_UNIVERSITY_AUTH_LOGIN = "/university-auth/login"
    const val ENDPOINT_UNIVERSITY_AUTH_STATUS = "/university-auth/status"
    const val ENDPOINT_UNIVERSITY_AUTH_LINK = "/university-auth/link"

    // Эндпоинты парсера
    const val ENDPOINT_PARSER_STATUS = "/parser/status"
    const val ENDPOINT_PARSER_SYNC = "/parser/sync"
    const val ENDPOINT_PARSER_INSTITUTES = "/parser/institutes"
    const val ENDPOINT_PARSER_SPECIALTIES = "/parser/specialties"
    const val ENDPOINT_PARSER_GROUPS = "/parser/groups"

    // HTTP-заголовки
    const val HEADER_AUTHORIZATION = "Authorization"
    const val HEADER_BEARER_PREFIX = "Bearer "
}

// Объект передачи данных для ответов API
@JsExport
@Serializable
data class ApiResponse<T>(
    val data: T? = null,
    val error: ErrorResponse? = null,
    val success: Boolean = data != null && error == null
)

// Параметры запросов к эндпоинтам
@JsExport
@Serializable
data class ScheduleParams(
    val group: String,
    val date: String? = null
)

@JsExport
@Serializable
data class TaskUpdateParams(
    val title: String? = null,
    val description: String? = null,
    val deadline: String? = null,
    val priority: Int? = null,
    val completed: Boolean? = null
)

@JsExport
@Serializable
data class ParserSyncParams(
    val startDate: String? = null,
    val endDate: String? = null,
    val groups: List<String>? = null
)