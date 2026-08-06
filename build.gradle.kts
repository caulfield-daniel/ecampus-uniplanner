plugins {
    // KMP
    alias(libs.plugins.kotlinMultiplatform) apply false
    alias(libs.plugins.kotlinSerialization) apply false
    alias(libs.plugins.buildConfig) apply false

    // Backend
    alias(libs.plugins.kotlinJvm) apply false
    alias(libs.plugins.kotlinSpring) apply false
    alias(libs.plugins.kotlinJpa) apply false
    alias(libs.plugins.springBoot) apply false
    alias(libs.plugins.springDependencyManagement) apply false
}

// ============================================
// ГЛОБАЛЬНЫЕ ЗАДАЧИ (группа "ecampus")
// ============================================

/**
 * Генерация JSON Schema из shared-моделей в api/schemas
 */
tasks.register("generateSchemas") {
    group = "ecampus"
    description = "Генерация JSON Schema (api/schemas) из shared-моделей"
    dependsOn(":shared:generateJsonSchemas")
}

/**
 * Полная сборка проекта (shared + backend)
 */
tasks.register("buildAll") {
    group = "ecampus"
    description = "Полная сборка проекта (shared + backend)"
    dependsOn(":shared:build", ":backend:build")
}

/**
 * Очистка всех build-директорий
 */
tasks.register("cleanAll") {
    group = "ecampus"
    description = "Очистка всех build-директорий"
    dependsOn("clean", ":shared:clean", ":backend:clean")
}

/**
 * Информационная задача — список доступных команд
 */
tasks.register("showTasks") {
    group = "ecampus"
    description = "Показать все доступные задачи верхнего уровня"
    doLast {
        println("\n" + "=".repeat(60))
        println("📦 ECAMPUS UNIPLANNER - Доступные задачи")
        println("=".repeat(60))
        println("\n🔧 СБОРКА:")
        println("  generateSchemas - Генерация JSON Schema (api/schemas) из shared-моделей")
        println("  buildAll        - Полная сборка проекта (shared + backend)")
        println("\n🧹 ОЧИСТКА:")
        println("  cleanAll        - Очистить все build-каталоги")
        println("\nℹ️  ИНФО:")
        println("  showTasks       - Показать это сообщение")
        println("  tasks           - Показать все задачи Gradle")
        println("\n🌐 ВЕБ-КЛИЕНТ (web/):")
        println("  npm run generate:types - Генерация TS-типов (web/src/shared/types/generated) из api/schemas")
        println("\n🚀 BACKEND:")
        println("  :backend:bootRun       - Запустить Spring Boot")
        println("  :backend:build         - Собрать backend JAR")
        println("  :backend:test          - Запустить тесты backend")
        println("\n" + "=".repeat(60))
        println("📁 Сгенерированные файлы: api/schemas/*.json, web/src/shared/types/generated/*.d.ts")
        println("=".repeat(60) + "\n")
    }
}

// Небольшое дополнение к задаче help
tasks.named("help") {
    doLast {
        println("\n💡 Для списка задач Ecampus используйте: ./gradlew showTasks\n")
    }
}