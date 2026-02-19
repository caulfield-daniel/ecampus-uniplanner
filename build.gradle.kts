import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsRootPlugin.Companion.kotlinNodeJsRootExtension

plugins {
    // this is necessary to avoid the plugins to be loaded multiple times
    // in each subproject's classloader
    alias(libs.plugins.kotlinMultiplatform) apply false
}

// ==================== ГЛОБАЛЬНЫЕ ЗАДАЧИ ====================

/**
 * Сборка development версии JS из shared и копирование в web
 */
tasks.register("buildJsDev") {
    dependsOn(":shared:buildJsDevAndCopy")
    description = "Сборка development JS из shared-модуля и копирование в web/src/shared"
}

/**
 * Сборка production версии JS из shared и копирование в web
 */
tasks.register("buildJsProd") {
    dependsOn(":shared:copyJsToWebProd")
    description = "Сборка production JS из shared-модуля и копирование в web/src/shared"
}

/**
 * Полная development сборка проекта
 * (сейчас только shared, позже добавим backend и android)
 */
tasks.register("buildAllDev") {
    dependsOn(
        ":shared:buildJsDevAndCopy"
        // ":backend:build",
        // ":android:assembleDebug"
    )
    description = "Полная development сборка проекта (shared JS dev + копирование)"
}

/**
 * Полная production сборка проекта
 */
tasks.register("buildAll") {
    dependsOn(
        ":shared:buildSharedWithJs"
        // ":backend:build",
        // ":android:assembleRelease"
    )
    description = "Полная production сборка проекта (shared + JS prod + копирование)"
}

/**
 * Очистка всех сгенерированных артефактов, включая web/src/shared
 */
tasks.register("cleanAll") {
    dependsOn(
        ":shared:clean",
        ":shared:cleanWebShared"
    )
    description = "Очистка всех build-директорий и web/src/shared"
}

/**
 * Пересборка development JS (clean + build + copy)
 */
tasks.register("rebuildJsDev") {
    dependsOn(":shared:rebuildJsDev")
    description = "Полная пересборка development JS (clean → build → copy)"
}

/**
 * Показать все доступные задачи верхнего уровня
 */
tasks.register("showTasks") {
    doLast {
        println("\nДоступные задачи верхнего уровня:")
        println("  buildJsDev       - собрать development JS и скопировать в web")
        println("  buildJsProd      - собрать production JS и скопировать в web")
        println("  buildAllDev      - полная development сборка проекта")
        println("  buildAll         - полная production сборка проекта")
        println("  cleanAll         - очистить все артефакты (build и web/shared)")
        println("  rebuildJsDev     - пересобрать development JS с очисткой")
        println("  showTasks        - показать это сообщение")
    }
}