package ch.puzzle.bbt.puzzlescrumpoker.table;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Tablemaster;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TableTest {

    public static final String GAMEKEY = "jsuwua6az8jsuwua6az8jsuwua6az8";
    public static final String TABLE_NAME = "TestTable";
    public static final String TABLEMASTER_NAME = "Tablemaster";
    public static final String PLAYER_NAME = "Player";

    public static final Tablemaster TABLEMASTER = new Tablemaster(TABLEMASTER_NAME, 1);
    public static final Player PLAYER = new Player(PLAYER_NAME, 2);

    @InjectMocks
    Table table = new Table(GAMEKEY, TABLE_NAME, TABLEMASTER);



    @Test
    void initHasTablemaster() {
        //when
        assertEquals(table.getPlayerMap().size(), 1);
        assertEquals(table.getPlayerMap().get(1L), TABLEMASTER);
    }


    @Test
    void isGameNotRunning() {
        //given
        table.setGamerunning(false);
        //when
        assertFalse(table.isGamerunning());
    }

    @Test
    void isGameRunning() {
        //given
        table.setGamerunning(true);
        //when
        assertTrue(table.isGamerunning());
    }

    @Test
    void unknownPlayerThrowException() {
        //when
        Exception exception = assertThrows(Exception.class, () ->
                table.getPlayerById(5));
        assertEquals("Player id: 5 isn't existing", exception.getMessage());
    }

    @Test
    void getPlayerbyId() throws Exception {
        //when
        assertEquals(table.getPlayerById(1), TABLEMASTER);
    }

    @Test
    void getPlayerMap() {
        //given
        table.getPlayerMap().put(2L, PLAYER);

        //when
        assertEquals(table.getPlayerMap().size(), 2);
        assertEquals(table.getPlayerMap().get(1L), TABLEMASTER);
        assertEquals(table.getPlayerMap().get(2L), PLAYER);
    }

    @Test
    void getPlayersFromTable() {
        //given
        table.getPlayerMap().put(2L, PLAYER);

        //when
        assertEquals(table.getPlayersFromTable().size(), 2);
        assertEquals(table.getPlayersFromTable().get(0), TABLEMASTER);
        assertEquals(table.getPlayersFromTable().get(1), PLAYER);
    }

    @Test
    void setGamerunningTrue() {
        table.setGamerunning(true);
        assertTrue(table.isGamerunning());
    }

    @Test
    void setGamerunningFalse() {
        table.setGamerunning(false);
        assertFalse(table.isGamerunning());
    }
}