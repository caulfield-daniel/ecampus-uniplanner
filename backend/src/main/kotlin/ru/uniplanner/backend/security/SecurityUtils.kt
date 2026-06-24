package ru.uniplanner.backend.security

import org.springframework.security.core.Authentication
import java.util.UUID

fun Authentication.currentUserId(): UUID = UUID.fromString(name)
