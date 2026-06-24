package ru.uniplanner.backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import ru.uniplanner.backend.service.IScheduleService
import ru.uniplanner.shared.ApiConstants
import ru.uniplanner.shared.Lesson
import java.time.LocalDate

// Control-слой PCMEF: чтение расписания и списка групп из локального кэша
// (cached_lessons), который наполняется отдельно через ParserSyncController.
@RestController
class ScheduleController(private val scheduleService: IScheduleService) {

    @GetMapping(ApiConstants.ENDPOINT_SCHEDULE)
    fun getLessons(
        @RequestParam group: String,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?
    ): List<Lesson> {
        val fromDate = from?.let(LocalDate::parse) ?: LocalDate.now()
        val toDate = to?.let(LocalDate::parse) ?: fromDate.plusDays(7)
        return scheduleService.getLessons(group, fromDate, toDate)
    }

    @GetMapping(ApiConstants.ENDPOINT_GROUPS)
    fun listGroups(): List<String> = scheduleService.listGroups()
}
