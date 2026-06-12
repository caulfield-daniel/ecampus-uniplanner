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
tasks.register("buildJsDev") {
    group = "ecampus"
    description = "Сборка development JS из shared-модуля и копирование в web/src/shared/kmp"
    dependsOn(":shared:copyJsToWebDev")
}

tasks.register("buildJsProd") {
    group = "ecampus"
    description = "Сборка production JS из shared-модуля и копирование в web/src/shared/kmp"
    dependsOn(":shared:copyJsToWebProd")
}

tasks.register("buildAllDev") {
    group = "ecampus"
    description = "Полная development сборка проекта"
    dependsOn(":shared:copyJsToWebDev", ":backend:build")
}

tasks.register("buildAll") {
    group = "ecampus"
    description = "Полная production сборка проекта"
    dependsOn(":shared:copyJsToWebProd", ":backend:build")
}

tasks.register("cleanAll") {
    group = "ecampus"
    description = "Очистка всех build-директорий и сгенерированных shared-файлов в web"
    dependsOn("clean", ":shared:clean", ":backend:clean", ":shared:cleanWebKmp")
}

tasks.register("rebuildJsDev") {
    group = "ecampus"
    description = "Полная пересборка development JS (clean → build → copy)"
    dependsOn(":shared:rebuildJsDev")
}

tasks.register("rebuildJsProd") {
    group = "ecampus"
    description = "Полная пересборка production JS (clean → build → copy)"
    dependsOn(":shared:rebuildJsProd")
}

tasks.register("showTasks") {
    group = "ecampus"
    description = "Показать все доступные задачи верхнего уровня"
    doLast {
        println("\n" + "=".repeat(60))
        println("📦 ECAMPUS UNIPLANNER - Доступные задачи")
        println("=".repeat(60))
        println("\n🔧 СБОРКА:")
        println("  buildJsDev       - Сборка development JS + копирование в web")
        println("  buildJsProd      - Сборка production JS + копирование в web")
        println("  buildAllDev      - Полная development сборка (shared + backend)")
        println("  buildAll         - Полная production сборка (shared + backend)")
        println("\n🧹 ОЧИСТКА:")
        println("  cleanAll         - Очистить все build-директории")
        println("\n🔄 ПЕРЕСБОРКА:")
        println("  rebuildJsDev     - Полная пересборка development JS")
        println("  rebuildJsProd    - Полная пересборка production JS")
        println("\n🚀 BACKEND:")
        println("  :backend:bootRun       - Запустить Spring Boot")
        println("  :backend:build         - Собрать backend JAR")
        println("  :backend:test          - Запустить тесты backend")
        println("\n" + "=".repeat(60) + "\n")
    }
}

tasks.named("help") {
    doLast {
        println("\n💡 Для списка задач Ecampus используйте: ./gradlew showTasks\n")
    }
}