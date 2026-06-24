plugins {
    alias(libs.plugins.kotlinJvm)
    alias(libs.plugins.kotlinSpring)
    alias(libs.plugins.kotlinJpa)
    alias(libs.plugins.springBoot)
    alias(libs.plugins.springDependencyManagement)
    jacoco
}

group = "ru.uniplanner"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot starters
    implementation(libs.spring.boot.starter.web)
    implementation(libs.spring.boot.starter.data.jpa)
    implementation(libs.spring.boot.starter.security)
    implementation(libs.spring.boot.starter.validation)
    implementation(libs.spring.boot.starter.actuator)
    implementation(libs.spring.boot.starter.webflux) // WebClient для вызова парсера

    // Kotlin
    implementation(libs.jackson.module.kotlin)
    implementation(libs.kotlin.reflect)
    implementation(libs.kotlinx.coroutines.reactor)
    // Явно фиксируем версию, иначе Spring Dependency Management понижает её до 1.6.3 через свой BOM,
    // что несовместимо с сериализаторами, сгенерированными плагином Kotlin 2.3.0 в shared-модуле
    // (AbstractMethodError: GeneratedSerializer.typeParametersSerializers на /auth/login)
    implementation(libs.kotlinx.serialization.json)

    // Database
    implementation(libs.flyway.core)
    implementation(libs.flyway.database.postgresql)
    runtimeOnly(libs.postgresql)

    // JWT
    implementation(libs.jjwt.api)
    runtimeOnly(libs.jjwt.impl)
    runtimeOnly(libs.jjwt.jackson)

    // OpenAPI (Swagger UI)
    implementation(libs.springdoc.openapi.ui)

    // Shared module (KMP) — общие DTO
    implementation(project(":shared"))

    // Testing
    testImplementation(libs.spring.boot.starter.test)
    testImplementation(libs.spring.security.test)
    testImplementation(libs.mockk)
}

// Spring Dependency Management подключает kotlinx-serialization-bom:1.6.3 и понижает версию
// даже для явно объявленных implementation(...) — переопределяем здесь до версии из каталога.
dependencyManagement {
    dependencies {
        dependency("org.jetbrains.kotlinx:kotlinx-serialization-core:${libs.versions.kotlinxSerialization.get()}")
        dependency("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm:${libs.versions.kotlinxSerialization.get()}")
        dependency("org.jetbrains.kotlinx:kotlinx-serialization-json:${libs.versions.kotlinxSerialization.get()}")
        dependency("org.jetbrains.kotlinx:kotlinx-serialization-json-jvm:${libs.versions.kotlinxSerialization.get()}")
    }
}

// Новый синтаксис для Kotlin 2.x
kotlin {
    compilerOptions {
        jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_21)
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    dependsOn(tasks.test)
    reports {
        html.required.set(true)
        xml.required.set(true)
    }
}

// Плагин kotlin-jpa автоматически настраивает allOpen для @Entity
allOpen {
    annotation("jakarta.persistence.Entity")
    annotation("jakarta.persistence.MappedSuperclass")
    annotation("jakarta.persistence.Embeddable")
}