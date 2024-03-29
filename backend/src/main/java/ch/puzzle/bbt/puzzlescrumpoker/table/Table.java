package ch.puzzle.bbt.puzzlescrumpoker.table;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Tablemaster;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

public class Table {
    private final String gamekey;

    private boolean gamerunning = false;
    private boolean isNewTablemasterNeeded = false;

    private Tablemaster tablemaster;
    private String roundName;
    private final Map<Long, Player> playerMap = new HashMap<>();
    private Map<Long, WebSocketSession> websocketsession = new HashMap<>();

    public Table(String gamekey, Tablemaster tablemaster) {
        this.gamekey = gamekey;
        this.tablemaster = tablemaster;
        playerMap.put(tablemaster.getId(), tablemaster);
    }

    public Map<Long, Player> getPlayerMap() {
        return playerMap;
    }

    public Tablemaster getTablemaster() {
        return tablemaster;
    }

    public String getRoundName() {
        return roundName;
    }

    public void setRoundName(String roundName) {
        this.roundName = roundName;
    }

    public boolean isNewTablemasterNeeded() {
        return isNewTablemasterNeeded;
    }

    public void setNewTablemasterNeeded(boolean newTablemasterNeeded) {
        isNewTablemasterNeeded = newTablemasterNeeded;
    }

    public void setTablemaster(Tablemaster tablemaster) {
        this.tablemaster = tablemaster;
    }

    public List<Player> getPlayersFromTable(){
        return List.copyOf(playerMap.values());
    }

    public Player getPlayerById(long playerId) throws Exception {
        if (playerMap.get(playerId) == null) {
            throw new Exception(String.format("Player id: %d isn't existing", playerId));
        }

        return playerMap.get(playerId);
    }

    public boolean isGamerunning() {
        return gamerunning;
    }

    public void setGamerunning(boolean gamerunning) {
        this.gamerunning = gamerunning;
    }

    public Map<Long, WebSocketSession> getWebsocketsession() {
        return websocketsession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)  return true;
        if (o == null || getClass() != o.getClass()) return false;
        Table table = (Table) o;
        return gamerunning == table.gamerunning && gamekey.equals(table.gamekey) && tablemaster.equals(table.tablemaster);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gamekey);
    }

    @Override
    public String toString() {
        return "Table{" +
                "gamekey='" + gamekey + '\'' +
                ", gamerunning=" + gamerunning +
                ", tablemaster=" + tablemaster +
                ", playerMap=" + playerMap +
                '}';
    }
}
