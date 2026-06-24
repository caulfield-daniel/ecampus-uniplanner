package ru.uniplanner.backend.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import ru.uniplanner.shared.ApiConstants

// Достаёт Bearer-токен из заголовка и кладёт userId+роль в SecurityContext —
// дальше контроллеры читают его через Authentication.currentUserId() (SecurityUtils.kt).
@Component
class JwtAuthFilter(private val jwtService: JwtService) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val header = request.getHeader(ApiConstants.HEADER_AUTHORIZATION)
        if (header != null && header.startsWith(ApiConstants.HEADER_BEARER_PREFIX)) {
            val token = header.removePrefix(ApiConstants.HEADER_BEARER_PREFIX)
            val principal = jwtService.parseToken(token)
            if (principal != null && SecurityContextHolder.getContext().authentication == null) {
                val authorities = listOf(SimpleGrantedAuthority(principal.role.name))
                SecurityContextHolder.getContext().authentication =
                    UsernamePasswordAuthenticationToken(principal.userId.toString(), null, authorities)
            }
        }
        filterChain.doFilter(request, response)
    }
}
