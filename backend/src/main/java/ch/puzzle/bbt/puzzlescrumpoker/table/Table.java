package ch.puzzle.bbt.puzzlescrumpoker.table;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Tablemaster;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

public class Table {
    private final String gamekey;
    private final String tablename;

    private boolean gamerunning = false;
    private boolean isNewTablemasterNeeded = false;
    private int playersTabCancel = 0;

    private Tablemaster tablemaster;
    private final Map<Long, Player> playerMap = new HashMap<>();
    private Map<Long, WebSocketSession> websocketsession = new HashMap<>();

    public Table(String gamekey, String tablename, Tablemaster tablemaster) {
        this.gamekey = gamekey;
        this.tablename = tablename;
        this.tablemaster = tablemaster;
        playerMap.put(tablemaster.getId(), tablemaster);
    }

    public Map<Long, Player> getPlayerMap() {
        return playerMap;
    }

    public Tablemaster getTablemaster() {
        return tablemaster;
    }

    public int getPlayersTabCancel() {
        return playersTabCancel;
    }

    public void setPlayersTabCancel(int playersTabCancel) {
        this.playersTabCancel = playersTabCancel;
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
        return gamerunning == table.gamerunning && gamekey.equals(table.gamekey) && tablename.equals(table.tablename) && tablemaster.equals(table.tablemaster);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gamekey);
    }

    @Override
    public String toString() {
        return "Table{" +
                "gamekey='" + gamekey + '\'' +
                ", tablename='" + tablename + '\'' +
                ", gamerunning=" + gamerunning +
                ", tablemaster=" + tablemaster +
                ", playerMap=" + playerMap +
                '}';
    }
}
