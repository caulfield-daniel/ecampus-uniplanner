package ru.uniplanner.backend.service

import java.time.LocalDate

interface IParserSyncService {
    /**
     * Забирает у parser'а актуальное расписание группы за период и
     * перезаписывает соответствующий диапазон в кэше backend'а.
     * Возвращает количество синхронизированных занятий.
     */
    fun syncGroupSchedule(group: String, from: LocalDate, to: LocalDate): Int
}
