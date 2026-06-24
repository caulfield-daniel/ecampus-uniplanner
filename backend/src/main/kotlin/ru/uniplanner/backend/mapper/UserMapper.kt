package ru.uniplanner.backend.mapper

import ru.uniplanner.backend.entity.UserEntity
import ru.uniplanner.shared.User

object UserMapper {
    fun toDto(entity: UserEntity): User = User(
        id = entity.id.toString(),
        email = entity.email,
        fullName = entity.fullName,
        groupName = entity.groupName
    )
}
