import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.plugin.KotlinJsCompilerType

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.kotlinSerialization)
    alias(libs.plugins.buildConfig)
}

kotlin {
    compilerOptions {
        freeCompilerArgs.add("-opt-in=kotlin.js.ExperimentalJsExport")
    }

    jvm {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_25)
        }
    }

    
// Отказ от JS-бандлинга в пользу генерации typescript-типов из DTO

//     js(KotlinJsCompilerType.IR) {
//         outputModuleName = "shared"
//         browser {
//             binaries.library()
//         }
//         generateTypeScriptDefinitions()
//         compilerOptions {
//             target = "es2015"
//         }
//     }

//     sourceSets {
//         commonMain.dependencies {
//             implementation(libs.kotlinx.serialization.json)
//         }
//         commonTest.dependencies {
//             implementation(libs.kotlin.test)
//         }
//     }
// }

buildConfig {
    useKotlinOutput {
        internalVisibility = true
        topLevelConstants = true
    }
    packageName("ru.uniplanner.shared.config")
    buildConfigField(
        "STRING",
        "API_BASE_URL",
        "\"${project.findProperty("apiBaseUrl") ?: "http://localhost:8080/api/v1"}\""
    )
}

// ============================================
// ЗАДАЧИ ДЛЯ РАЗРАБОТЧИКОВ (группа "kmp")
// ============================================

tasks.register("buildJsDev") {
    dependsOn("jsBrowserDevelopmentLibraryDistribution")
    group = "kmp"
    description = "Сборка development JS из shared-модуля"
}

tasks.register("buildJsProd") {
    dependsOn("jsBrowserProductionLibraryDistribution")
    group = "kmp"
    description = "Сборка production JS из shared-модуля"
}

/**
 * Копирование development JS в web/src/shared/kmp.
 * Файлы переименовываются в единые имена shared.mjs / shared.mts.
 */
tasks.register<Copy>("copyJsToWebDev") {
    dependsOn("buildJsDev")
    group = "kmp"
    description = "Копирует development JS (ES-модули) в web/src/shared/kmp как shared.mjs и shared.mts"

    val sourceDir = layout.buildDirectory.dir("dist/js/developmentLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp")

    from(sourceDir) {
        include("shared.mjs", "shared.mjs.map", "shared.d.mts")
        // переименовываем в общие имена (без суффиксов)
        rename("shared.mjs", "shared.mjs")
        rename("shared.mjs.map", "shared.mjs.map")
        rename("shared.d.mts", "shared.d.mts")
    }
    into(targetDir)

    doLast {
        logger.lifecycle("✅ Development JS скопирован в web/src/shared/kmp")
    }
}

/**
 * Копирование production JS в web/src/shared/kmp.
 * Файлы переименовываются в единые имена shared.mjs / shared.mts.
 */
tasks.register<Copy>("copyJsToWebProd") {
    dependsOn("buildJsProd")
    group = "kmp"
    description = "Копирует production JS (ES-модули) в web/src/shared/kmp как shared.mjs и shared.mts"

    val sourceDir = layout.buildDirectory.dir("dist/js/productionLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp")

    from(sourceDir) {
        include("shared.mjs", "shared.mjs.map", "shared.mts")
        rename("shared.mjs", "shared.mjs")
        rename("shared.mjs.map", "shared.mjs.map")
        rename("shared.d.mts", "shared.d.mts")
    }
    into(targetDir)

    doLast {
        logger.lifecycle("✅ Production JS скопирован в web/src/shared/kmp")
    }
}

/**
 * Очистка сгенерированных shared-файлов в web (shared.mjs, shared.mjs.map, shared.mts)
 */
tasks.register<Delete>("cleanWebKmp") {
    group = "kmp"
    description = "Удаляет shared.mjs, shared.mjs.map, shared.mts из web/src/shared/kmp"

    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp").asFile
    if (targetDir.exists()) {
        delete(fileTree(targetDir) {
            include("shared.mjs", "shared.mjs.map", "shared.d.mts")
        })
    }
    doLast {
        logger.lifecycle("🧹 Сгенерированные shared-файлы в web/src/shared/kmp удалены")
    }
}

/**
 * Полная пересборка development JS (очистка → сборка → копирование)
 */
tasks.register("rebuildJsDev") {
    dependsOn("cleanWebKmp", "copyJsToWebDev")
    group = "kmp"
    description = "Полная пересборка development JS"
}

/**
 * Полная пересборка production JS (очистка → сборка → копирование)
 */
tasks.register("rebuildJsProd") {
    dependsOn("cleanWebKmp", "copyJsToWebProd")
    group = "kmp"
    description = "Полная пересборка production JS"
}