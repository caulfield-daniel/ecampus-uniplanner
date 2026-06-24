package ru.uniplanner.backend.service

import ru.uniplanner.shared.Lesson
import java.time.LocalDate

interface IScheduleService {
    fun getLessons(group: String, from: LocalDate, to: LocalDate): List<Lesson>
    fun listGroups(): List<String>
}
