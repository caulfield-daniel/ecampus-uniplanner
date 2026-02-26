import org.jetbrains.kotlin.gradle.dsl.JvmTarget

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
            jvmTarget.set(JvmTarget.JVM_1_8)
        }
    }

    js {
        outputModuleName = "shared"
        browser {
            binaries.library()
            useCommonJs()
            generateTypeScriptDefinitions()
        }
        compilerOptions {
            target = "es2015"
        }
    }

    sourceSets {
        commonMain.dependencies {
            implementation(libs.kotlinx.serialization.json)
        }
        commonTest.dependencies {
            implementation(libs.kotlin.test)
        }
    }
}

// ============================================
// BUILD CONFIG (генерирует константы)
// ============================================
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

/**
 * Сборка development JS (библиотека)
 */
tasks.register("buildJsDev") {
    dependsOn("jsBrowserDevelopmentLibraryDistribution")
    group = "kmp"
    description = "Сборка development JS из shared-модуля"
}

/**
 * Сборка production JS (библиотека)
 */
tasks.register("buildJsProd") {
    dependsOn("jsBrowserProductionLibraryDistribution")
    group = "kmp"
    description = "Сборка production JS из shared-модуля"
}

/**
 * Копирование development JS в web/src/shared/kmp
 */
tasks.register<Copy>("copyJsToWebDev") {
    dependsOn("buildJsDev")
    group = "kmp"
    description = "Копирует development JS файлы в web/src/shared/kmp"

    val sourceDir = layout.buildDirectory.dir("dist/js/developmentLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp")

    from(sourceDir) {
        include("shared.js", "shared.js.map", "shared.d.ts")
        rename { fileName ->
            fileName.replace("shared.", "shared.dev.")
        }
    }
    into(targetDir)

    doLast {
        logger.lifecycle("✅ Development JS скопирован в web/src/shared/kmp")
    }
}

/**
 * Копирование production JS в web/src/shared/kmp
 */
tasks.register<Copy>("copyJsToWebProd") {
    dependsOn("buildJsProd")
    group = "kmp"
    description = "Копирует production JS файлы в web/src/shared/kmp"

    val sourceDir = layout.buildDirectory.dir("dist/js/productionLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp")

    from(sourceDir) {
        include("shared.js", "shared.js.map", "shared.d.ts")
        rename { fileName ->
            fileName.replace("shared.", "shared.prod.")
        }
    }
    into(targetDir)

    doLast {
        logger.lifecycle("✅ Production JS скопирован в web/src/shared/kmp")
    }
}

/**
 * Очистка только сгенерированных shared-файлов в web (не трогает index.ts и другие)
 */
tasks.register<Delete>("cleanWebKmp") {
    group = "kmp"
    description = "Удаляет сгенерированные shared.dev.* и shared.prod.* файлы из web/src/shared/kmp"

    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp").asFile
    if (targetDir.exists()) {
        delete(fileTree(targetDir) {
            include(
                "shared.dev.js", "shared.dev.js.map", "shared.dev.d.ts",
                "shared.prod.js", "shared.prod.js.map", "shared.prod.d.ts"
            )
        })
    }
    doLast {
        logger.lifecycle("🧹 Сгенерированные shared-файлы в web/src/shared/kmp удалены")
    }
}

/**
 * Полная пересборка development JS (clean → сборка → копирование)
 */
tasks.register("rebuildJsDev") {
    dependsOn("clean", "copyJsToWebDev")
    group = "kmp"
    description = "Полная пересборка development JS (clean → build → copy)"
}

/**
 * Полная пересборка production JS (clean → сборка → копирование)
 */
tasks.register("rebuildJsProd") {
    dependsOn("clean", "copyJsToWebProd")
    group = "kmp"
    description = "Полная пересборка production JS (clean → build → copy)"
}