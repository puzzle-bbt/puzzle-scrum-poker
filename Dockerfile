FROM alpine:3.14

USER root

RUN apk update && apk add --upgrade curl && apk --no-cache add openjdk11

WORKDIR app-root

COPY . .

RUN ./mvnw clean package

RUN adduser --home /app-root --uid 1001 --disabled-password pocker
USER 1001

ENTRYPOINT  ["java", "-jar", "backend/target/puzzle-scrum-poker--1.0.0-SNAPSHOT.jar", "ch.puzzle.bbt.puzzlescrumpoker.PuzzleScrumPokerApplication"]