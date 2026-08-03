package ru.uniplanner.shared.schema

import kotlinx.serialization.KSerializer
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.SerialKind
import kotlinx.serialization.descriptors.StructureKind
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * Кастомный генератор JSON Schema поверх descriptor'ов kotlinx.serialization.
 *
 * Единый источник истины моделей — shared/ApiModels.kt; из него через
 * `serializer().descriptor` строятся JSON Schema (файлы .json в каталоге api/schemas), а из них
 * json-schema-to-typescript генерирует TS-типы для web.
 *
 * Правила генерации:
 *  - data-класс  → `type: object` + `properties` + `required`
 *    (required = поля не-optional И не-nullable), `title` = короткое имя (только у корня);
 *  - nullable    → `type: ["T", "null"]`;
 *  - список      → `type: array` + `items`;
 *  - map         → `type: object` + `additionalProperties`;
 *  - enum-kind   → `type: string` + `enum`;
 *  - вложенные @Serializable классы инлайнятся (без `$defs`, без `title` —
 *    в TS это анонимные объектные типы).
 *
 * Чистый класс: без IO, тестируется в commonTest.
 */
class JsonSchemaGenerator {

    /** Возвращает pretty-printed JSON Schema для модели (корень с title). */
    fun generate(modelName: String, serializer: KSerializer<*>): String {
        val root = buildSchema(serializer.descriptor, title = modelName)
        return Json {
            prettyPrint = true
            prettyPrintIndent = "  "
        }.encodeToString(JsonElement.serializer(), root) + "\n"
    }

    private fun buildSchema(descriptor: SerialDescriptor, title: String? = null): JsonElement {
        val nonNull = buildNonNullSchema(descriptor, title)
        return if (descriptor.isNullable) withNullType(nonNull) else nonNull
    }

    private fun buildNonNullSchema(descriptor: SerialDescriptor, title: String?): JsonElement {
        val kind = descriptor.kind
        return when (kind) {
            StructureKind.CLASS -> buildObjectSchema(descriptor, title)
            StructureKind.LIST -> buildListSchema(descriptor)
            StructureKind.MAP -> buildMapSchema(descriptor)
            SerialKind.ENUM -> buildEnumSchema(descriptor)
            else -> buildPrimitiveSchema(kind)
        }
    }

    private fun buildObjectSchema(descriptor: SerialDescriptor, title: String?): JsonObject {
        val properties = buildJsonObject {
            for (i in 0 until descriptor.elementsCount) {
                val element = descriptor.getElementDescriptor(i)
                put(descriptor.getElementName(i), buildSchema(element))
            }
        }
        val required = buildJsonArray {
            for (i in 0 until descriptor.elementsCount) {
                val element = descriptor.getElementDescriptor(i)
                if (!descriptor.isElementOptional(i) && !element.isNullable) {
                    add(JsonPrimitive(descriptor.getElementName(i)))
                }
            }
        }
        return buildJsonObject {
            put("type", "object")
            if (title != null) put("title", title)
            put("properties", properties)
            if (required.isNotEmpty()) put("required", required)
        }
    }

    private fun buildListSchema(descriptor: SerialDescriptor): JsonObject {
        val element = descriptor.getElementDescriptor(0)
        return buildJsonObject {
            put("type", "array")
            put("items", buildSchema(element))
        }
    }

    private fun buildMapSchema(descriptor: SerialDescriptor): JsonObject {
        val value = descriptor.getElementDescriptor(1)
        return buildJsonObject {
            put("type", "object")
            put("additionalProperties", buildSchema(value))
        }
    }

    private fun buildEnumSchema(descriptor: SerialDescriptor): JsonObject {
        return buildJsonObject {
            put("type", "string")
            put("enum", buildJsonArray {
                for (i in 0 until descriptor.elementsCount) {
                    add(JsonPrimitive(descriptor.getElementName(i)))
                }
            })
        }
    }

    private fun buildPrimitiveSchema(kind: SerialKind): JsonObject {
        val typeName = when (kind) {
            PrimitiveKind.STRING -> "string"
            PrimitiveKind.INT -> "integer"
            PrimitiveKind.LONG -> "integer"
            PrimitiveKind.BYTE, PrimitiveKind.SHORT -> "integer"
            PrimitiveKind.DOUBLE, PrimitiveKind.FLOAT -> "number"
            PrimitiveKind.BOOLEAN -> "boolean"
            PrimitiveKind.CHAR -> "string"
            else -> "string"
        }
        return buildJsonObject { put("type", typeName) }
    }

    /** Оборачивает `type` в массив ["T", "null"], сохраняя остальные ключи и порядок. */
    private fun withNullType(schema: JsonElement): JsonElement {
        if (schema !is JsonObject) return schema
        val type = schema["type"] as? JsonPrimitive ?: return schema
        val modified = schema.toMutableMap().apply {
            this["type"] = JsonArray(listOf(type, JsonPrimitive("null")))
        }
        return JsonObject(modified)
    }
}
