package ru.uniplanner.backend.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate
import java.time.LocalTime
import java.time.OffsetDateTime

// Entity-слой PCMEF: занятие в кэше расписания backend'а (заполняется через
// ParserSyncServiceImpl из данных parser-микросервиса, см. docs/02-architecture/microservices.md).
@Entity
@Table(name = "cached_lessons")
class CachedLessonEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "group_name", nullable = false)
    val groupName: String,

    @Column(name = "lesson_date", nullable = false)
    val lessonDate: LocalDate,

    @Column(nullable = false)
    val weekday: String,

    @Column(nullable = false)
    val discipline: String,

    @Column(name = "lesson_type", nullable = false)
    val lessonType: String,

    @Column(name = "time_start", nullable = false)
    val timeStart: LocalTime,

    @Column(name = "time_end", nullable = false)
    val timeEnd: LocalTime,

    @Column
    val teacher: String? = null,

    @Column
    val room: String? = null,

    @Column
    val subgroup: String? = null,

    @Column(name = "cached_at", nullable = false)
    val cachedAt: OffsetDateTime = OffsetDateTime.now()
) {
    fun isToday(today: LocalDate): Boolean = lessonDate == today

    fun overlaps(other: CachedLessonEntity): Boolean =
        groupName == other.groupName &&
            lessonDate == other.lessonDate &&
            timeStart < other.timeEnd &&
            other.timeStart < timeEnd
}
