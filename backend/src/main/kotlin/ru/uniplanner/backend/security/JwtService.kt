package ru.uniplanner.backend.security

import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import ru.uniplanner.backend.entity.Role
import java.util.Date
import java.util.UUID

data class JwtPrincipal(val userId: UUID, val role: Role)

// Генерация и валидация JWT (HS256). Секрет — app.jwt.secret (.env), не путать
// с app.university-auth.encryption-key (UniversitySessionCrypto) — разные угрозы.
@Component
class JwtService(
    @Value("\${app.jwt.secret}") secret: String,
    @Value("\${app.jwt.expiration-ms}") private val expirationMs: Long
) {
    private val key = Keys.hmacShaKeyFor(secret.toByteArray(Charsets.UTF_8))

    fun generateToken(userId: UUID, role: Role): String {
        val now = Date()
        val expiry = Date(now.time + expirationMs)
        return Jwts.builder()
            .subject(userId.toString())
            .claim("role", role.name)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(key)
            .compact()
    }

    fun parseToken(token: String): JwtPrincipal? = try {
        val claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).payload
        JwtPrincipal(
            userId = UUID.fromString(claims.subject),
            role = Role.valueOf(claims.get("role", String::class.java))
        )
    } catch (ex: JwtException) {
        null
    } catch (ex: IllegalArgumentException) {
        null
    }
}
