package ch.puzzle.bbt.puzzlescrumpoker;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Tablemaster;
import ch.puzzle.bbt.puzzlescrumpoker.table.Table;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.regex.Pattern;

@Service
@Scope("application")
public class PokerService {
    private static final Logger LOG = LoggerFactory.getLogger(PokerService.class);

    private final Pattern isNumeric = Pattern.compile("^[0-9]+$");
    protected final AtomicLong playerCount = new AtomicLong();
    protected Map<String, Table> tableMap = new HashMap<>();

    public List<Object> addNewTable(String name, String tablename) {
        String gamekey = generateGameKey();
        long playerId = playerCount.incrementAndGet();
        tableMap.put(gamekey, new Table(gamekey, tablename, new Tablemaster(name, playerId)));

        List<Object> returnValue = new ArrayList<>();
        returnValue.add(gamekey);
        returnValue.add(playerId);
        return returnValue;
    }

    public long addNewPlayer(String playername, String gamekey) throws Exception {
        long playerid = playerCount.incrementAndGet();

        getTableById(gamekey).getPlayerMap().put(playerid, new Player(playername, playerid));

        sendWebsocketMessage(getTableById(gamekey), "RefreshPlayer"+playername+","+playerid);

        return playerid;
    }

    public void setSelectedCard(String gamekey, long playerid, String selectedCard) throws Exception {
        getTableById(gamekey).getPlayerById(playerid).setSelectedCard(selectedCard);
        sendWebsocketMessage(getTableById(gamekey), "RefreshPlayer"+","+playerid);

    }

    public String getSelectedCard(String gamekey, long playerid) throws Exception {
        return getTableById(gamekey).getPlayerById(playerid).getSelectedCard();
    }

    public void setPlayerMode(String gamekey, long playerid, boolean playerMode) throws Exception {
        getTableById(gamekey).getPlayerById(playerid).setPlayerMode(playerMode);
        sendWebsocketMessage(getTableById(gamekey), "RefreshPlayer"+","+playerid);
    }

    public boolean getPlayerMode(String gamekey, long playerid) throws Exception {
        return getTableById(gamekey).getPlayerById(playerid).getPlayerMode();
    }

    public void setRunning(String gamekey, boolean gamerunning) throws Exception {
        getTableById(gamekey).setGamerunning(gamerunning);
    }

    public Table getTableById(String gamekey) throws Exception {
        if (tableMap.get(gamekey) == null) {
            throw new Exception(String.format("Table Key: %s isn't existing", gamekey));
        }
        return tableMap.get(gamekey);
    }

    public List<Player> getPlayersFromTable(String gamekey) throws Exception {
        return getTableById(gamekey).getPlayersFromTable();
    }

    public void resetGame(String gamekey) throws Exception {
        Map<Long, Player> playerMap = getTableById(gamekey).getPlayerMap();
        for (Player player : playerMap.values()) {
            player.setSelectedCard(null);
        }
    }

    public String generateGameKey() {
        int leftLimit = 48; //Zahl: 0
        int rightLimit = 122; // Buchstabe: z
        int targetStringLength = 30;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                //filter out unicode characters 65-90 to avoid out of range characters
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public void gameOver(String gamekey) throws Exception {
        if (!getTableById(gamekey).isGamerunning()) {
            throw new Exception("Game isn't running");
        }

        LOG.debug("{}", getTableById(gamekey).getWebsocketsession().size());
        setRunning(gamekey, false);
        sendWebsocketMessage(getTableById(gamekey), "gameOver");
    }

    public void gameStart(String gamekey) throws Exception {
        if (getTableById(gamekey).isGamerunning()) {
            throw new Exception("Game is already running");
        }

        resetGame(gamekey);
        setRunning(gamekey, true);

        sendWebsocketMessage(getTableById(gamekey), "gameStart");
    }

    public double getAverage(String gamekey) throws Exception {
        int sum = 0;
        int count = 0;
        for (Player player : getTableById(gamekey).getPlayerMap().values()) {
            if (player.getPlayerMode() && player.getSelectedCard() != null && isNumeric.matcher(player.getSelectedCard()).matches()) {
                sum += Integer.parseInt(player.getSelectedCard());
                count++;
            }
        }
        return count == 0 ? 0 : sum / (double) count;
    }

    // an example of average calculation with a java stream
    public double getAverageStream(String gamekey) throws Exception {
        OptionalDouble average = getTableById(gamekey).getPlayerMap().values().parallelStream()
                .filter(Player::getPlayerMode)
                .map(Player::getSelectedCard)
                .filter(Objects::nonNull)
                .filter(value -> isNumeric.matcher(value).matches())
                .mapToInt(Integer::parseInt)
                .average();
        return average.isPresent() ? average.getAsDouble() : 0;
    }

    public void handleIncomingTextMessage(WebSocketSession session, String message) throws Exception {
        if (message.startsWith("table=") && message.contains("playerid=")) {
            String[] messageSplit = message.split(",");
            Long playerid = Long.parseLong(messageSplit[1].substring(9));
            String gamekey = messageSplit[0].substring(6);

            getTableById(gamekey).getWebsocketsession().put(playerid, session);
            LOG.debug("Connection established");
        } else if (message.startsWith("Iamtheoneandonlymaster=")) {
            String[] messageSplit = message.split("=");
            String gamekey = messageSplit[1];
            String playerIDString = messageSplit[2];
            Long playerID = Long.parseLong(playerIDString);

            if (getTableById(gamekey).isNewTablemasterNeeded()) {
                setUpNewTablemaster(gamekey, playerID, session);
            }
            else {
                sendWebsocketMessageSpecial("CantBeNewTablemaster", playerID, gamekey, true);
            }
        } else {
            LOG.warn("Unknown message: {}", message);
        }
    }

    public void setUpNewTablemaster(String gamekey, Long playerID, WebSocketSession session) throws Exception {
        if (!getTableById(gamekey).getWebsocketsession().containsValue(session)) {
            LOG.warn("Player with id: {} and the session: {} is not at the table with gamekey: {}", playerID, session, gamekey);
        } else if (getTableById(gamekey).getTablemaster().getId() == playerID) {
            LOG.warn("Player with id: {} is already tablemaster at the table with the gamekey {}", playerID, gamekey);
        } else {

            Tablemaster tablemaster = new Tablemaster(getTableById(gamekey).getPlayerById(playerID).getName(), playerID);
            getTableById(gamekey).setTablemaster(tablemaster);
            getTableById(gamekey).getPlayerMap().replace(playerID, tablemaster);

            sendWebsocketMessageSpecial("IAmNowTheOneAndOnlyTablemaster" + "," + getTableById(gamekey).isGamerunning(), playerID, gamekey, true);
            sendWebsocketMessageSpecial("NewTablemaster" + "," + getTableById(gamekey).getTablemaster().getName(), playerID, gamekey, false);

            getTableById(gamekey).setNewTablemasterNeeded(false);
            setRunning(gamekey, false);
        }
    }

    public void offboarding(String gamekey, long playerid, boolean isTablemaster) throws Exception {
        try {
            getTableById(gamekey).getPlayerMap().remove(playerid);
            getTableById(gamekey).getWebsocketsession().remove(playerid);
            if (isTablemaster) {
                getTableById(gamekey).setNewTablemasterNeeded(true);
                sendWebsocketMessageSpecial("AskForNewTablemaster", playerid, gamekey, false);
            }
            else {
                sendWebsocketMessage(getTableById(gamekey), "RefreshPlayer" + "," + playerid);
            }
        }
        catch (IOException e) {
            LOG.error("Couldn't not remove player from table", e);
        }
    }

    public void kickPlayer(String gamekey, long playerid) throws Exception {
        if(playerid == getTableById(gamekey).getTablemaster().getId()) {
            throw new Exception(String.format("Cant kick Tablemaster, Player with Id: %o is Tablemaster", playerid));
        }
        try {
            sendWebsocketMessageSpecial("YouGotKicked", playerid, gamekey, true);
            getTableById(gamekey).getPlayerMap().remove(playerid);
            getTableById(gamekey).getWebsocketsession().remove(playerid);
            sendWebsocketMessage(getTableById(gamekey), "RefreshPlayer" + "," + playerid);
        }
        catch (IOException e) {
            LOG.error("Couldn't not remove player from table", e);
        }
    }

    public void sendWebsocketMessage(Table table, String message) {
        for (WebSocketSession webSocketSession : table.getWebsocketsession().values()) {
            try {
                webSocketSession.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                checkWebsocketConnection(table, webSocketSession, e.getMessage());
            }
        }
    }

    public void sendWebsocketMessageSpecial(String message, Long playerID, String gamekey, boolean onlyOnePlayer) throws Exception {
        if (onlyOnePlayer) {
            getTableById(gamekey).getWebsocketsession().get(playerID).sendMessage(new TextMessage(message));
        } else {
            Table table = getTableById(gamekey);
            for (WebSocketSession webSocketSession : table.getWebsocketsession().values()) {
                try {
                    if (webSocketSession != getTableById(gamekey).getWebsocketsession().get(playerID)) {
                        webSocketSession.sendMessage(new TextMessage(message));
                    }
                } catch (IOException e) {
                    checkWebsocketConnection(table, webSocketSession, e.getMessage());
                }
            }
        }
    }

    public void checkWebsocketConnection(Table table, WebSocketSession webSocketSession, String message) {
        LOG.warn("No message could be sent to to the session with the id: {}, URI: {} and is open = {}. The session has the local address: {} and the remote address: {}. The thrown message is: {}", webSocketSession.getId(), webSocketSession.getUri(), webSocketSession.isOpen(), webSocketSession.getLocalAddress(), webSocketSession.getRemoteAddress(), message);
        if (!webSocketSession.isOpen()) {
            table.getWebsocketsession().remove(webSocketSession);
        }
    }

    public void handleClosedConnection(WebSocketSession session) {
        Iterator<Table> tables = tableMap.values().iterator();

        while (tables.hasNext()) {
            Table table = tables.next();
            Long playerId = -1l;
            for (Map.Entry<Long,WebSocketSession> entry: table.getWebsocketsession().entrySet()) {
                if (entry.getValue() == session) {
                    playerId = entry.getKey();
                }
            }

            if (playerId != -1l) {
                table.getWebsocketsession().remove(playerId);
                table.getPlayerMap().remove(playerId);
                LOG.warn("A closed session {}  was still stored in a sessionmap", session);
                sendWebsocketMessage(table, "RefreshPlayer");
            }
        }
    }
}