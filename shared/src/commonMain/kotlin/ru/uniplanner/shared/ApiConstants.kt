package ru.uniplanner.shared

import kotlinx.serialization.Serializable
import kotlin.js.JsExport

@JsExport
object ApiConstants {
    const val BASE_URL = "http://localhost:8080/api/v1"

    // Эндпоинты API
    const val ENDPOINT_AUTH_REGISTER = "/auth/register"
    const val ENDPOINT_AUTH_LOGIN = "/auth/login"
    const val ENDPOINT_AUTH_ME = "/auth/me"
    const val ENDPOINT_TASKS = "/tasks"
    const val ENDPOINT_NOTES = "/notes"
    const val ENDPOINT_SCHEDULE = "/schedule"
    const val ENDPOINT_GROUPS = "/groups"

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
data class ScheduleParams(
    val group: String,
    val date: String? = null
)

@JsExport
data class TaskUpdateParams(
    val title: String? = null,
    val description: String? = null,
    val deadline: String? = null,
    val priority: Int? = null,
    val completed: Boolean? = null
)