package ru.uniplanner.backend.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import ru.uniplanner.backend.entity.CachedLessonEntity
import java.time.LocalDate

interface ICachedLessonRepository : JpaRepository<CachedLessonEntity, Long> {
    fun findByGroupNameAndLessonDateBetween(
        groupName: String,
        from: LocalDate,
        to: LocalDate
    ): List<CachedLessonEntity>

    @Query("SELECT DISTINCT c.groupName FROM CachedLessonEntity c ORDER BY c.groupName")
    fun findDistinctGroupNames(): List<String>

    fun deleteByGroupNameAndLessonDateBetween(groupName: String, from: LocalDate, to: LocalDate)
}
