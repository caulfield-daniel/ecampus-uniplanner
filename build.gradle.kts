plugins {
    alias(libs.plugins.kotlinMultiplatform) apply false
    alias(libs.plugins.kotlinSerialization) apply false
    alias(libs.plugins.buildConfig) apply false
}

// ============================================
// ГЛОБАЛЬНЫЕ ЗАДАЧИ (группа "ecampus")
// ============================================

/**
 * Сборка development JS (shared) и копирование в web
 */
tasks.register("buildJsDev") {
    group = "ecampus"
    description = "Сборка development JS из shared-модуля и копирование в web/src/shared/kmp"
    dependsOn(":shared:copyJsToWebDev")
}

/**
 * Сборка production JS (shared) и копирование в web
 */
tasks.register("buildJsProd") {
    group = "ecampus"
    description = "Сборка production JS из shared-модуля и копирование в web/src/shared/kmp"
    dependsOn(":shared:copyJsToWebProd")
}

/**
 * Полная development сборка проекта (shared + позже backend/android)
 */
tasks.register("buildAllDev") {
    group = "ecampus"
    description = "Полная development сборка проекта"
    dependsOn(":shared:copyJsToWebDev")
    // TODO добавить backend и android
}

/**
 * Полная production сборка проекта (shared + позже backend/android)
 */
tasks.register("buildAll") {
    group = "ecampus"
    description = "Полная production сборка проекта"
    dependsOn(":shared:copyJsToWebProd")
    // TODO добавить backend и android
}

/**
 * Очистка всех build-директорий и сгенерированных shared-файлов в web
 */
tasks.register("cleanAll") {
    group = "ecampus"
    description = "Очистка всех build-директорий и сгенерированных shared-файлов в web"
    dependsOn(
        "clean",
        ":shared:clean",
        ":shared:cleanWebKmp"
    )
}

/**
 * Полная пересборка development JS
 */
tasks.register("rebuildJsDev") {
    group = "ecampus"
    description = "Полная пересборка development JS (clean → build → copy)"
    dependsOn(":shared:rebuildJsDev")
}

/**
 * Полная пересборка production JS
 */
tasks.register("rebuildJsProd") {
    group = "ecampus"
    description = "Полная пересборка production JS (clean → build → copy)"
    dependsOn(":shared:rebuildJsProd")
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
        println("  buildJsDev       - Сборка development JS + копирование в web")
        println("  buildJsProd      - Сборка production JS + копирование в web")
        println("  buildAllDev      - Полная development сборка проекта")
        println("  buildAll         - Полная production сборка проекта")
        println("\n🧹 ОЧИСТКА:")
        println("  cleanAll         - Очистить все build-директории + сгенерированные shared-файлы")
        println("\n🔄 ПЕРЕСБОРКА:")
        println("  rebuildJsDev     - Полная пересборка development JS")
        println("  rebuildJsProd    - Полная пересборка production JS")
        println("\nℹ️  ИНФО:")
        println("  showTasks        - Показать это сообщение")
        println("  tasks            - Показать все задачи Gradle")
        println("\n" + "=".repeat(60))
        println("📁 Сгенерированные файлы: ./web/src/shared/kmp/shared.dev.* и shared.prod.*")
        println("=".repeat(60) + "\n")
    }
}

// Небольшое дополнение к задаче help
tasks.named("help") {
    doLast {
        println("\n💡 Для списка задач Ecampus используйте: ./gradlew showTasks\n")
    }
}