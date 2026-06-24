package ru.uniplanner.backend.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import ru.uniplanner.backend.service.IParserSyncService
import ru.uniplanner.shared.ApiConstants
import java.time.LocalDate

/**
 * Ручная синхронизация кэша расписания backend'а с данными, уже накопленными
 * parser-микросервисом (см. docs/02-architecture/microservices.md). Без cron —
 * вызывается администратором по необходимости (раз в неделю/месяц).
 */
@RestController
class ParserSyncController(private val parserSyncService: IParserSyncService) {

    @PostMapping(ApiConstants.ENDPOINT_PARSER_SYNC)
    fun syncGroupSchedule(
        @RequestParam group: String,
        @RequestParam(required = false) from: String?,
        @RequestParam(required = false) to: String?
    ): Map<String, Any> {
        val fromDate = from?.let(LocalDate::parse) ?: LocalDate.now()
        val toDate = to?.let(LocalDate::parse) ?: fromDate.plusDays(7)
        val syncedCount = parserSyncService.syncGroupSchedule(group, fromDate, toDate)
        return mapOf("group" to group, "from" to fromDate, "to" to toDate, "syncedLessons" to syncedCount)
    }
}
