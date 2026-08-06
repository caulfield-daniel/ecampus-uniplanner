import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.kotlinSerialization)
    alias(libs.plugins.buildConfig)
}

kotlin {
    jvm {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_25)
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

/**
 * Генерация JSON Schema всех моделей shared в api/schemas (корень репозитория).
 * Результат коммитится; TS-типы web генерируются из него (npm run generate:types).
 */
val generateJsonSchemas by tasks.registering(JavaExec::class) {
    group = "kmp"
    description = "Генерирует JSON Schema всех моделей shared в api/schemas"

    val jvmMain = kotlin.targets.getByName("jvm").compilations.getByName("main")
    dependsOn(jvmMain.compileTaskProvider)

    classpath = files(jvmMain.output.allOutputs) + jvmMain.runtimeDependencyFiles!!
    mainClass.set("ru.uniplanner.shared.schema.GenerateJsonSchemasMainKt")
    args(rootProject.layout.projectDirectory.dir("api/schemas").asFile.absolutePath)
}
