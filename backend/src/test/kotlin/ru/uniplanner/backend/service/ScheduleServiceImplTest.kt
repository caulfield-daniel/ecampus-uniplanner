package ru.uniplanner.backend.service

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import ru.uniplanner.backend.entity.CachedLessonEntity
import ru.uniplanner.backend.repository.ICachedLessonRepository
import java.time.LocalDate
import java.time.LocalTime

class ScheduleServiceImplTest {

    private val cachedLessonRepository = mockk<ICachedLessonRepository>()
    private val scheduleService = ScheduleServiceImpl(cachedLessonRepository)

    @Test
    fun `getLessons maps entities to dto`() {
        val group = "ИВТ-21-1"
        val from = LocalDate.now()
        val to = from.plusDays(7)
        val entity = CachedLessonEntity(
            id = 1L,
            groupName = group,
            lessonDate = from,
            weekday = "Понедельник",
            discipline = "Программная инженерия",
            lessonType = "Лекция",
            timeStart = LocalTime.of(9, 0),
            timeEnd = LocalTime.of(10, 30)
        )
        every { cachedLessonRepository.findByGroupNameAndLessonDateBetween(group, from, to) } returns listOf(entity)

        val result = scheduleService.getLessons(group, from, to)

        assertEquals(1, result.size)
        assertEquals("Программная инженерия", result.first().discipline)
    }

    @Test
    fun `listGroups returns distinct group names`() {
        every { cachedLessonRepository.findDistinctGroupNames() } returns listOf("ИВТ-21-1", "ИВТ-22-2")

        val result = scheduleService.listGroups()

        assertEquals(listOf("ИВТ-21-1", "ИВТ-22-2"), result)
    }
}
