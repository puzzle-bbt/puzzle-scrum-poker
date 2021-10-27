## puzzle-scrum-poker
A Puzzle Scrum Poker online Tool.

## How to start Puzzle Scrum Poker

### 1. maven verify
Run a Maven verify in console of project directory\
`mvn clean verify`

### 2. Run the Application
Run the Application with Right-clicking in the Puzzle ScrumPokerApplication file and press \
`Run 'PuzzleScrumPokerApplication'`

### 3. edit Run-configuration and add a new Maven goal 
Edit the Run Configuration and add a new MavenGoal before the build \
Put `clean package  -DskipTests=true` into the command line.

### 4. Start the Application
Start the Run Configuration, and it should execute a `mvn clean package` before start
