README
===

# puzzle-scrum-poker
A Puzzle Scrum Poker online Tool.

## How to Run Puzzle Scrum Poker from within IntelliJ


### 1. Add a New Spring Boot Run Configuration

Inside the menu *Edit Configurations...*, create a new Spring Boot configuration.

As main class use
`
ch.puzzle.bbt.puzzlescrumpoker.PuzzleScrumPokerApplication
`.

Finally, add a new maven goal in section *Before launch* of the configuration settings:
`
clean package -DskipTests
`


### 2. Run the Application

Run the application by either right-clicking on the ScrumPokerApplication file and pressing \
`
Run 'PuzzleScrumPokerApplication'
`

or by just executing the run configuration.

## Development

For rapid development the frontend, you can use the live-reload webserver with live reload:

```
cd static-web
npm install
./start-dev.sh
```

The frontend is started on localhost:4200. The backend should also be executed: Use your new Spring Boot configuration from above.

Certainly - the frontend work also on localhost:8080, but without live reload.

## How to Run Puzzle Scrum Poker from the Command Line

## Execute in a docker environment

Normally the build include only the own code into the artifact.
For run the ScrumPoker into a docker environment, the artifact must include all java dependencies.
The maven profile `build-for-docker` include all java dependencies and skip also all tests:

`mvn clean package -P build-for-docker`
