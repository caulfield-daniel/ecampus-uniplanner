package ru.uniplanner.shared

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlin.js.JsExport

// Общие модели
@JsExport
@Serializable
data class ErrorResponse(
    val code: Int,
    val message: String
)

// Модели, связанные с пользователями
@JsExport
@Serializable
data class User(
    val id: String,
    val email: String,
    val fullName: String,
    val groupName: String
)

@JsExport
@Serializable
data class RegisterRequest(
    val email: String,
    val password: String,
    val fullName: String,
    val groupName: String
)

@JsExport
@Serializable
data class LoginRequest(
    val email: String,
    val password: String
)

@JsExport
@Serializable
data class LoginResponse(
    val token: String,
    val user: User
)

// Модели, связанные с задачами
@JsExport
@Serializable
data class Task(
    val id: Int,
    val title: String,
    val description: String? = null,
    @SerialName("deadline")
    val deadline: String, // Формат даты и времени ISO 8601
    val priority: Int, // Приоритет от 1 до 5
    val completed: Boolean
)

@JsExport
@Serializable
data class TaskInput(
    val title: String,
    val description: String? = null,
    @SerialName("deadline")
    val deadline: String, // Формат даты и времени ISO 8601
    val priority: Int,
    val completed: Boolean = false
)

// Модели, связанные с заметками
@JsExport
@Serializable
data class Note(
    val id: Int,
    val title: String,
    val content: String
)

@JsExport
@Serializable
data class NoteInput(
    val title: String,
    val content: String
)

// Модели, связанные с расписанием
@JsExport
@Serializable
data class Lesson(
    val id: Int,
    val group: String,
    @SerialName("date")
    val date: String, // Формат даты ISO 8601
    val weekday: String,
    val discipline: String,
    val type: String,
    @SerialName("timeStart")
    val timeStart: String, // Формат времени: ЧЧ:ММ
    @SerialName("timeEnd")
    val timeEnd: String, // Формат времени: ЧЧ:ММ
    val teacher: String,
    val room: String,
    val subgroup: String? = null
)

// Модели, связанные с группами
@JsExport
@Serializable
data class GroupInfo(
    val id: Int,
    val name: String,
    val institute: String? = null,
    val specialty: String? = null
)