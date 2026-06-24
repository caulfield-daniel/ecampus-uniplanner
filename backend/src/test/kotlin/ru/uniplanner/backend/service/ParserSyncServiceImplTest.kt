package ru.uniplanner.backend.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import reactor.core.publisher.Mono
import ru.uniplanner.backend.entity.CachedLessonEntity
import ru.uniplanner.backend.foundation.ParserClient
import ru.uniplanner.backend.foundation.ParserLessonDto
import ru.uniplanner.backend.repository.ICachedLessonRepository
import java.time.LocalDate
import java.time.LocalTime

class ParserSyncServiceImplTest {

    private val parserClient = mockk<ParserClient>()
    private val cachedLessonRepository = mockk<ICachedLessonRepository>()
    private val service = ParserSyncServiceImpl(parserClient, cachedLessonRepository)
    private val from = LocalDate.of(2026, 3, 2)
    private val to = LocalDate.of(2026, 3, 8)

    @Test
    fun `syncGroupSchedule replaces cached range with parser data`() {
        val lessons = listOf(
            ParserLessonDto(
                group = "ИВТ-б-о-23-1",
                date = from,
                weekday = "Понедельник",
                discipline = "Схемотехника",
                type = "Лекция",
                timeStart = LocalTime.of(9, 0),
                timeEnd = LocalTime.of(10, 30),
                teacher = "Иванов И.И.",
                room = "9-516",
                subgroup = null
            )
        )
        every { parserClient.fetchLessons("ИВТ-б-о-23-1", from, to) } returns Mono.just(lessons)
        every { cachedLessonRepository.deleteByGroupNameAndLessonDateBetween("ИВТ-б-о-23-1", from, to) } returns Unit
        every { cachedLessonRepository.saveAll(any<List<CachedLessonEntity>>()) } answers { firstArg() }

        val result = service.syncGroupSchedule("ИВТ-б-о-23-1", from, to)

        assertEquals(1, result)
        verify { cachedLessonRepository.deleteByGroupNameAndLessonDateBetween("ИВТ-б-о-23-1", from, to) }
        verify {
            cachedLessonRepository.saveAll(withArg<List<CachedLessonEntity>> {
                assertEquals(1, it.size)
                assertEquals("Схемотехника", it.first().discipline)
            })
        }
    }

    @Test
    fun `syncGroupSchedule skips lessons without scheduled time`() {
        val lessons = listOf(
            ParserLessonDto(
                group = "ИВТ-б-о-23-1",
                date = from,
                weekday = "Понедельник",
                discipline = "Без времени",
                type = "Лекция",
                timeStart = null,
                timeEnd = null,
                teacher = null,
                room = null,
                subgroup = null
            )
        )
        every { parserClient.fetchLessons(any(), any(), any()) } returns Mono.just(lessons)
        every { cachedLessonRepository.deleteByGroupNameAndLessonDateBetween(any(), any(), any()) } returns Unit
        every { cachedLessonRepository.saveAll(any<List<CachedLessonEntity>>()) } answers { firstArg() }

        val result = service.syncGroupSchedule("ИВТ-б-о-23-1", from, to)

        assertEquals(0, result)
    }
}
