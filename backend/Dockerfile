FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace
COPY . .
RUN sed -i 's/\r$//' gradlew && sh gradlew :backend:bootJar --no-daemon -x test

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
