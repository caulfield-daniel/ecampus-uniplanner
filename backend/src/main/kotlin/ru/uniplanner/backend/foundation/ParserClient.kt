package ru.uniplanner.backend.foundation

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.bodyToMono
import reactor.core.publisher.Mono
import java.time.LocalDate
import java.time.LocalTime

data class ParserLessonDto(
    val group: String,
    val date: LocalDate,
    val weekday: String,
    val discipline: String,
    val type: String,
    val timeStart: LocalTime?,
    val timeEnd: LocalTime?,
    val teacher: String?,
    val room: String?,
    val subgroup: String?
)

/**
 * Foundation-клиент к публичным справочникам parser-микросервиса (сервисный
 * аккаунт скрейпинга расписания групп). Backend САМ забирает (pull) данные,
 * которые parser уже накопил у себя — не наоборот (см. docs/03-architecture/microservices.md).
 */
@Component
class ParserClient(
    webClientBuilder: WebClient.Builder,
    @Value("\${app.parser.base-url}") parserBaseUrl: String
) {
    private val webClient = webClientBuilder.baseUrl(parserBaseUrl).build()

    fun fetchGroups(): Mono<List<String>> =
        webClient.get()
            .uri("/parser/groups")
            .retrieve()
            .bodyToMono<List<String>>()

    fun fetchLessons(group: String, from: LocalDate, to: LocalDate): Mono<List<ParserLessonDto>> =
        webClient.get()
            .uri { builder ->
                builder.path("/parser/lessons")
                    .queryParam("group", group)
                    .queryParam("date_from", from)
                    .queryParam("date_to", to)
                    .build()
            }
            .retrieve()
            .bodyToMono<List<ParserLessonDto>>()
}
