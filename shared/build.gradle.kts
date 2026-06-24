import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.plugin.KotlinJsCompilerType
import org.jetbrains.kotlin.gradle.targets.js.webpack.KotlinWebpackConfig

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
            jvmTarget.set(JvmTarget.JVM_21)
        }
    }

    js(KotlinJsCompilerType.IR) {
        outputModuleName = "shared"
        browser {
            binaries.library()
            webpackTask {
                mode = KotlinWebpackConfig.Mode.PRODUCTION
            }
            runTask {
                mode = KotlinWebpackConfig.Mode.DEVELOPMENT
            }
        }
        // Обрезка мёртвого кода (DCE) — по умолчанию включена
        compilerOptions {
            target = "es2015"
        }
    }

    sourceSets {
        commonMain.dependencies {
            implementation(libs.kotlinx.serialization.json)
        }
        commonTest.dependencies {
            implementation(kotlin("test"))
        }
    }
}

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
// ЗАДАЧИ ДЛЯ РАЗРАБОТЧИКОВ
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

tasks.register<Copy>("copyJsToWebDev") {
    dependsOn("buildJsDev")
    group = "kmp"
    description = "Копирует development JS в web/src/shared/kmp/dto"

    val sourceDir = layout.buildDirectory.dir("dist/js/developmentLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp/dto")

    from(sourceDir) {
        include("shared.mjs", "shared.mjs.map", "shared.d.mts")
    }
    into(targetDir)
    doLast {
        logger.lifecycle("✅ Development JS скопирован в web/src/shared/kmp/dto")
    }
}

tasks.register<Copy>("copyJsToWebProd") {
    dependsOn("buildJsProd")
    group = "kmp"
    description = "Копирует production JS в web/src/shared/kmp"

    val sourceDir = layout.buildDirectory.dir("dist/js/productionLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp/dto")

    from(sourceDir) {
        include("shared.mjs", "shared.mjs.map", "shared.d.mts")
    }
    into(targetDir)
    doLast {
        logger.lifecycle("✅ Production JS скопирован в web/src/shared/kmp/dto")
    }
}

tasks.register<Delete>("cleanWebKmp") {
    group = "kmp"
    description = "Удаляет сгенерированные shared-файлы из web/src/shared/kmp/dto"

    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared/kmp/dto").asFile
    if (targetDir.exists()) {
        delete(fileTree(targetDir) {
            include("shared.mjs", "shared.mjs.map", "shared.d.mts")
        })
    }
    doLast {
        logger.lifecycle("🧹 Сгенерированные shared-файлы удалены")
    }
}

tasks.register("rebuildJsDev") {
    dependsOn("cleanWebKmp", "copyJsToWebDev")
    group = "kmp"
    description = "Полная пересборка development JS"
}

tasks.register("rebuildJsProd") {
    dependsOn("cleanWebKmp", "copyJsToWebProd")
    group = "kmp"
    description = "Полная пересборка production JS"
}