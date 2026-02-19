import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.kotlinSerialization)
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
    // js {
    //     browser()
    //     binaries.executable()
    // }

    sourceSets {
        commonMain.dependencies {
            implementation(libs.kotlinx.serialization.json)
        }
        commonTest.dependencies {
            implementation(libs.kotlin.test)
        }
    }
}

// ==================== ЗАДАЧИ ДЛЯ РАБОТЫ С JS ====================

/**
 * Сборка development версии JS
 */
tasks.register("buildJsDev") {
    dependsOn("jsBrowserDevelopmentLibraryDistribution")
    description = "Сборка development JS (library) из shared-модуля"
}

/**
 * Копирование development JS в web/src/shared
 */
tasks.register<Copy>("copyJsToWebDev") {
    dependsOn("jsBrowserDevelopmentLibraryDistribution")

    val sourceDir = layout.buildDirectory.dir("dist/js/developmentLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared")

    from(sourceDir) {
        // Копируем только файлы, относящиеся к shared-модулю
        include("shared.js", "shared.js.map", "shared.d.ts")
        // Переименовываем с суффиксом .dev
        rename { name ->
            when (name) {
                "shared.js" -> "shared.dev.js"
                "shared.js.map" -> "shared.dev.js.map"
                "shared.d.ts" -> "shared.dev.d.ts"
                else -> name
            }
        }
    }

    into(targetDir)

    doFirst {
        println("📦 Копирование development JS...")
        println("   Из: ${sourceDir.get().asFile.absolutePath}")
        println("   В: ${targetDir.asFile.absolutePath}")

        val sourceFile = sourceDir.get().asFile
        if (!sourceFile.exists()) {
            throw GradleException("❌ Исходная папка не существует! Сначала выполните: ./gradlew :shared:jsBrowserDevelopmentLibraryDistribution")
        }

        // Проверяем наличие нужных файлов
        val requiredFiles = listOf("shared.js", "shared.js.map", "shared.d.ts")
        val missing = requiredFiles.filter { !sourceFile.resolve(it).exists() }
        if (missing.isNotEmpty()) {
            throw GradleException("❌ В исходной папке отсутствуют файлы: $missing")
        }
        println("✅ Все необходимые файлы найдены")
    }

    description = "Копирует development JS и .d.ts файлы в web/src/shared"
}

/**
 * Объединённая задача: сборка dev JS + копирование
 */
tasks.register("buildJsDevAndCopy") {
    dependsOn("buildJsDev", "copyJsToWebDev")
    description = "Сборка development JS и копирование в web/src/shared"
}

/**
 * Сборка production версии JS
 */
tasks.register("buildJsProd") {
    dependsOn("jsBrowserProductionLibraryDistribution")
    description = "Сборка production JS (library) из shared-модуля"
}

/**
 * Копирование production JS в web/src/shared
 */
tasks.register<Copy>("copyJsToWebProd") {
    dependsOn("jsBrowserProductionLibraryDistribution")

    val sourceDir = layout.buildDirectory.dir("dist/js/productionLibrary")
    val targetDir = rootProject.layout.projectDirectory.dir("web/src/shared")

    from(sourceDir) {
        include("shared.js", "shared.js.map", "shared.d.ts")
        rename { name ->
            when (name) {
                "shared.js" -> "shared.prod.js"
                "shared.js.map" -> "shared.prod.js.map"
                "shared.d.ts" -> "shared.prod.d.ts"
                else -> name
            }
        }
    }

    into(targetDir)
    description = "Копирует production JS и .d.ts файлы в web/src/shared"
}

/**
 * Сборка всего shared модуля (JVM + JS production)
 */
tasks.register("buildShared") {
    dependsOn("build", "jsBrowserProductionLibraryDistribution")
    description = "Сборка всего shared модуля (JVM + JS production)"
}

/**
 * Сборка всего shared + копирование production JS
 */
tasks.register("buildSharedWithJs") {
    dependsOn("buildShared", "copyJsToWebProd")
    description = "Сборка всего shared и копирование production JS в web"
}

/**
 * Очистка сгенерированных JS файлов в web
 */
tasks.register<Delete>("cleanWebShared") {
    delete(rootProject.file("web/src/shared"))
    description = "Удаляет все файлы из web/src/shared"
}

/**
 * Полная пересборка JS для web (dev)
 */
tasks.register("rebuildJsDev") {
    dependsOn("clean", "buildJsDevAndCopy")
    description = "Полная пересборка development JS (clean → build dev → copy)"
}