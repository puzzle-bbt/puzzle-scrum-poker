# Puzzle-Scrum-Poker-Backend

## Anleitung Postman-Tests
Um die Tests der HTTP requests ohne Postman zu starten zu können, braucht es die Installation von newman

**Installation von Newman:**

1. curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
2. sudo apt install nodejs
3. npm install -g newman

Danach kann man in den Ordner src/test/resources/postman navigieren und mit dem folgeneden Command die Tests starten:

```
cd src/test/resources/postman
newman run ScrumPoker.postman_collection.json -e ScrumPoker.postman_environment.json
```
