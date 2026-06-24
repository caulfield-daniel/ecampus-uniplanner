package ru.uniplanner.backend.service

import org.springframework.stereotype.Service
import ru.uniplanner.backend.mapper.LessonMapper
import ru.uniplanner.backend.repository.ICachedLessonRepository
import ru.uniplanner.shared.Lesson
import java.time.LocalDate

// Mediator-слой PCMEF: чтение расписания/групп из локального кэша (read-only).
@Service
class ScheduleServiceImpl(private val cachedLessonRepository: ICachedLessonRepository) : IScheduleService {

    override fun getLessons(group: String, from: LocalDate, to: LocalDate): List<Lesson> =
        cachedLessonRepository.findByGroupNameAndLessonDateBetween(group, from, to).map(LessonMapper::toDto)

    override fun listGroups(): List<String> = cachedLessonRepository.findDistinctGroupNames()
}
