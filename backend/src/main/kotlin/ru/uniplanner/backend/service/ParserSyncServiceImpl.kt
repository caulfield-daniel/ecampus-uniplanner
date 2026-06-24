package ru.uniplanner.backend.service

import org.springframework.stereotype.Service
import ru.uniplanner.backend.entity.CachedLessonEntity
import ru.uniplanner.backend.foundation.ParserClient
import ru.uniplanner.backend.foundation.ParserLessonDto
import ru.uniplanner.backend.repository.ICachedLessonRepository
import java.time.LocalDate

@Service
class ParserSyncServiceImpl(
    private val parserClient: ParserClient,
    private val cachedLessonRepository: ICachedLessonRepository
) : IParserSyncService {

    override fun syncGroupSchedule(group: String, from: LocalDate, to: LocalDate): Int {
        val lessons = parserClient.fetchLessons(group, from, to).block() ?: emptyList()

        // Кэш: перезаписываем диапазон целиком, а не точечно обновляем — так
        // из кэша пропадают занятия, которые parser больше не видит (отмены/переносы).
        cachedLessonRepository.deleteByGroupNameAndLessonDateBetween(group, from, to)

        val entities = lessons
            .filter { it.timeStart != null && it.timeEnd != null }
            .map { it.toEntity() }
        cachedLessonRepository.saveAll(entities)

        return entities.size
    }

    private fun ParserLessonDto.toEntity(): CachedLessonEntity = CachedLessonEntity(
        groupName = group,
        lessonDate = date,
        weekday = weekday,
        discipline = discipline,
        lessonType = type,
        timeStart = requireNotNull(timeStart),
        timeEnd = requireNotNull(timeEnd),
        teacher = teacher,
        room = room,
        subgroup = subgroup?.ifBlank { null }
    )
}
