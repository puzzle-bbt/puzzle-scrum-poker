# Puzzle-scrum-poker
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


## How to Run Puzzle Scrum Poker from the Command Line