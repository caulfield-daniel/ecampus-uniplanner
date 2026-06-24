package ru.uniplanner.backend.mapper

import ru.uniplanner.backend.entity.CachedLessonEntity
import ru.uniplanner.shared.Lesson

object LessonMapper {
    fun toDto(entity: CachedLessonEntity): Lesson = Lesson(
        id = requireNotNull(entity.id).toInt(),
        group = entity.groupName,
        date = entity.lessonDate.toString(),
        weekday = entity.weekday,
        discipline = entity.discipline,
        type = entity.lessonType,
        timeStart = entity.timeStart.toString(),
        timeEnd = entity.timeEnd.toString(),
        teacher = entity.teacher,
        room = entity.room,
        subgroup = entity.subgroup
    )
}
