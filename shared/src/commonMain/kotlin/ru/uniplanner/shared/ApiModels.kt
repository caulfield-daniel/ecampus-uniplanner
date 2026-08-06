package ru.uniplanner.shared

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// ============================================
// Общие модели
// ============================================

@Serializable
data class ErrorResponse(
    val code: Int,
    val message: String
)

// ============================================
// Модели, связанные с пользователями
// ============================================

@Serializable
data class User(
    val id: String,
    val email: String,
    val fullName: String,
    val groupName: String
)

@Serializable
data class RegisterRequest(
    val email: String,
    val password: String,
    val fullName: String,
    val groupName: String
)

@Serializable
data class LoginRequest(
    val email: String,
    val password: String
)

@Serializable
data class LoginResponse(
    val token: String,
    val user: User
)

// ============================================
// Модели, связанные с задачами
// ============================================

@Serializable
data class Task(
    val id: Int,
    val title: String,
    val description: String? = null,
    @SerialName("deadline")
    val deadline: String, // Формат даты и времени ISO 8601
    val priority: Int, // Приоритет от 1 до 5
    val completed: Boolean,
    val relatedLessonId: Int? = null // привязка к занятию в расписании (опционально)
)

@Serializable
data class TaskInput(
    val title: String,
    val description: String? = null,
    @SerialName("deadline")
    val deadline: String, // Формат даты и времени ISO 8601
    val priority: Int,
    val completed: Boolean = false,
    val relatedLessonId: Int? = null
)

// ============================================
// Модели, связанные с заметками
// ============================================

@Serializable
data class Note(
    val id: Int,
    val title: String,
    val content: String,
    val relatedLessonId: Int? = null // привязка к занятию в расписании (опционально)
)

@Serializable
data class NoteInput(
    val title: String,
    val content: String,
    val relatedLessonId: Int? = null
)

// ============================================
// Модели, связанные с расписанием
// ============================================

@Serializable
data class Lesson(
    val id: Int,
    val group: String,
    @SerialName("date")
    val date: String, // Формат даты ISO 8601 (YYYY-MM-DD)
    val weekday: String,
    val discipline: String,
    val type: String,
    @SerialName("timeStart")
    val timeStart: String, // Формат времени: ЧЧ:ММ
    @SerialName("timeEnd")
    val timeEnd: String, // Формат времени: ЧЧ:ММ
    val teacher: String? = null,
    val room: String? = null,
    val subgroup: String? = null
)

// ============================================
// Модели, связанные с группами
// ============================================

@Serializable
data class GroupInfo(
    val id: Int,
    val name: String,
    val institute: String? = null,
    val specialty: String? = null
)

// ============================================
// Модели, связанные с парсером расписания
// ============================================

@Serializable
data class Institute(
    val id: Int,
    val shortName: String, // maxLength: 10
    val name: String,      // maxLength: 100
    val branchId: Int = 1  // default: 1
)

@Serializable
data class Specialty(
    val id: Int,
    val name: String,      // maxLength: 100
    val instituteId: Int
)

@Serializable
data class AcademicGroup(
    val id: Int,
    val name: String,      // maxLength: 50
    val eduLevel: String,  // maxLength: 50
    val specialtyId: Int
)

@Serializable
data class Teacher(
    val id: Int,
    val name: String = "неизвестно"  // default: 'неизвестно'
)

@Serializable
data class Room(
    val id: Int,
    val name: String
)

@Serializable
data class ParserStatusResponse(
    val status: String,        // enum: [running, idle, error]
    val lastUpdate: String?,  // format: date-time
    val groupsCount: Int,
    val lessonsCount: Int
)

@Serializable
data class ParserSyncRequest(
    val startDate: String?,    // format: date
    val endDate: String?,     // format: date
    val groups: List<String>? = null  // список групп для синхронизации
)

@Serializable
data class ParserSyncResponse(
    val group: String,          // группа, для которой выполнялась синхронизация
    val startDate: String? = null,  // format: date (YYYY-MM-DD)
    val endDate: String? = null,    // format: date (YYYY-MM-DD)
    val syncedLessons: Int = 0,     // количество синхронизированных занятий
    val status: String = "completed" // enum: [completed, partial, failed]
)

// ============================================
// Модели личного входа пользователя в ecampus.ncfu.ru (через капчу)
// ============================================

@Serializable
data class CaptchaChallengeResponse(
    val attemptId: String,
    val captchaImageBase64: String
)

@Serializable
data class UniversityLoginRequest(
    val attemptId: String,
    val login: String,
    val password: String,
    val captchaAnswer: String
)

@Serializable
data class UniversityLinkStatus(
    val linked: Boolean,
    val lastValidatedAt: String? = null
)
