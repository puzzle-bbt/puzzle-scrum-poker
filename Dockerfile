FROM alpine:3.14

USER root

RUN apk update && apk add --upgrade curl && apk --no-cache add openjdk11

RUN adduser --home /app-root --uid 1001 --disabled-password poker
USER 1001

WORKDIR app-root

COPY --chown=1001 . .

#RUN ./mvnw clean package -P build-for-docker
ENTRYPOINT ["/bin/sh", "-c", "export APP_JAR=$(find . -type f -name 'backend-*.jar' -print -quit); java -jar ${APP_JAR}"]