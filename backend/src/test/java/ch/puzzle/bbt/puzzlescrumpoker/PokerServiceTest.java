package ch.puzzle.bbt.puzzlescrumpoker;

import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player;
import ch.puzzle.bbt.puzzlescrumpoker.gameroles.Tablemaster;
import ch.puzzle.bbt.puzzlescrumpoker.table.Table;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PokerServiceTest {

    public static final String TABLEMASTER_NAME = "Tablemaster";
    public static final String PLAYER_NAME_1 = "Player1";
    public static final String PLAYER_NAME_2 = "Player2";
    public static final String TABLE_NAME_1 = "TestTable1";
    public static final String TABLE_NAME_2 = "TestTable2";
    public static final String TABLE_NAME_3 = "TestTable3";
    public static final String GAME_KEY_1 = "game1a6az8jsuwua6az8jsuwua6az8";
    public static final String GAME_KEY_2 = "game2fuisdfuisaf6az8jsuwua6az8";
    public static final String GAME_KEY_3 = "game3a6az8jsuwua6az8jsuwua6az8";
    public static final String WEBSOCKET_MESSAGE = "This is the WebSocket message!";
    static Tablemaster TABLEMASTER;
    static Player PLAYER_1;
    static Player PLAYER_2;
    static Table TABLE_WITH_TABLEMASTER;
    static Table TABLE_WITH_TABLEMASTER_AND_ONE_PLAYER;
    static Table TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS;

    @Spy
    PokerService pokerService = new PokerService();

    @BeforeEach
    void initTables() {
        TABLEMASTER = new Tablemaster(TABLEMASTER_NAME, 1L);
        PLAYER_1 = new Player(PLAYER_NAME_1, 2L);
        PLAYER_2 = new Player(PLAYER_NAME_2, 3L);
        TABLE_WITH_TABLEMASTER = new Table(GAME_KEY_1, TABLEMASTER);
        TABLE_WITH_TABLEMASTER_AND_ONE_PLAYER = new Table(GAME_KEY_2, TABLEMASTER);
        TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS = new Table(GAME_KEY_3, TABLEMASTER);

        TABLE_WITH_TABLEMASTER_AND_ONE_PLAYER.getPlayerMap().put(2L, PLAYER_1);

        TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS.getPlayerMap().put(2L, PLAYER_1);
        TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS.getPlayerMap().put(3L, PLAYER_2);
    }

    @Test
    void addNewTable() {
        //given
        when(pokerService.generateGameKey()).thenReturn(GAME_KEY_1);
        //when
        List<Object> ids = pokerService.addNewTable(TABLEMASTER_NAME);
        //then
        // test return values
        assertEquals(2, ids.size());
        assertTrue(ids.get(0) instanceof String);
        assertTrue(ids.get(1) instanceof Long);
        assertEquals(GAME_KEY_1, ids.get(0));
        assertEquals(1l, ids.get(1));
        // test methods calls
        verify(pokerService, times(1)).generateGameKey();
        // test state
        assertEquals(1, pokerService.tableMap.size());
        assertEquals(TABLE_WITH_TABLEMASTER, pokerService.tableMap.get(GAME_KEY_1));
    }

    @Test
    void addNewPlayer() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        pokerService.playerCount.incrementAndGet(); // id '1' has the TableMaster
        doNothing().when(pokerService).sendWebsocketMessage(any(Table.class), anyString());
        //when
        long playerId = pokerService.addNewPlayer(PLAYER_NAME_1, GAME_KEY_1);
        //then
        // test return value
        assertEquals(2, playerId);
        // test methods calls
        verify(pokerService, times(1)).sendWebsocketMessage(TABLE_WITH_TABLEMASTER,
                String.format("RefreshPlayer%s,%d", PLAYER_NAME_1, PLAYER_1.getId()));
        // test state
        assertEquals(2, pokerService.playerCount.get());
        assertEquals(2, pokerService.getTableById(GAME_KEY_1).getPlayerMap().size());
        assertEquals(PLAYER_1, pokerService.getTableById(GAME_KEY_1).getPlayerMap().get(2L));
    }

    @Test
    void addNewPlayerToNonExistingTable() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.addNewPlayer(PLAYER_NAME_1 ,GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void setSelectedCard() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        //when
        pokerService.setSelectedCard(GAME_KEY_1, 1L, "6");
        //then
        assertEquals("6", pokerService.getTableById(GAME_KEY_1).getPlayerById(1L).getSelectedCard());
    }

    @Test
    void setSelectedCardOfNonExistingPlayer() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);

        Exception exception = assertThrows(Exception.class, () ->
                pokerService.setSelectedCard(GAME_KEY_1, 2L, "6"));
        //when then
        assertEquals("Player id: 2 isn't existing", exception.getMessage());
    }

    @Test
    void getSelectedCard() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        pokerService.setSelectedCard(GAME_KEY_1, 1L, "3");
        //when then
        assertEquals("3", pokerService.getSelectedCard(GAME_KEY_1, 1L));
    }

    @Test
    void getselectedcardOfNonExistingPlayer() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);

        Exception exception = assertThrows(Exception.class, () ->
                pokerService.getSelectedCard(GAME_KEY_1, 2L));
        //when then
        assertEquals("Player id: 2 isn't existing", exception.getMessage());
    }

    @Test
    void setPlayerModeFalse() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        //when
        pokerService.setPlayerMode(GAME_KEY_1, 1L, false);
        //then
        assertFalse(pokerService.getPlayerMode(GAME_KEY_1, 1L));
    }

    @Test
    void setPlayerModeTrue() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        //when
        pokerService.setPlayerMode(GAME_KEY_1, 1L, true);
        //then
        assertTrue(pokerService.getPlayerMode(GAME_KEY_1, 1L));
    }

    @Test
    void setPlayerModeOfNonExistingPlayer() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);

        Exception exception = assertThrows(Exception.class, () ->
                pokerService.setPlayerMode(GAME_KEY_1, 2L, false));
        //when then
        assertEquals("Player id: 2 isn't existing", exception.getMessage());
    }

    @Test
    void getTableById() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        //when then
        assertEquals(pokerService.getTableById(GAME_KEY_1), pokerService.tableMap.get(GAME_KEY_1));
    }

    @Test
    void getTableWithWrongId() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.getTableById(GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void resetGame() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.setSelectedCard(GAME_KEY_1, 1L, "6");
        pokerService.setSelectedCard(GAME_KEY_1, 2L, "?");
        //when
        pokerService.resetGame(GAME_KEY_1);
        //then
        assertNull(pokerService.getSelectedCard(GAME_KEY_1, 1L));
        assertNull(pokerService.getSelectedCard(GAME_KEY_1, 2L));
    }

    @Test
    void resetGameWithWrongGameKey() {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.resetGame(GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void generateGameKey() {
        assertEquals(30 ,pokerService.generateGameKey().length());
        assertTrue(pokerService.generateGameKey().matches("^[a-zA-Z0-9_]*$"));
    }

    @Test
    void gameOver() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        pokerService.gameStart(GAME_KEY_1);

        pokerService.gameOver(GAME_KEY_1);

        assertFalse(pokerService.getTableById(GAME_KEY_1).isGamerunning());
        verify(pokerService, times(1)).sendWebsocketMessage(TABLE_WITH_TABLEMASTER, "gameOver");
    }

    @Test
    void gameOverWithWrongGamekey() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.gameOver(GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void gameOverWhenGameIsAlreadyFinished() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.gameOver(GAME_KEY_1));
        //when then
        assertEquals("Game isn't running", exception.getMessage());
    }

    @Test
    void gameStart() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);

        pokerService.gameStart(GAME_KEY_1);

        assertTrue(pokerService.getTableById(GAME_KEY_1).isGamerunning());
        verify(pokerService, times(1)).resetGame(GAME_KEY_1);
    }

    @Test
    void gameStartWithWrongGamekey() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.gameStart(GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void gameStartWhenGameIsAlreadyRunning() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        pokerService.gameStart(GAME_KEY_1);
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.gameStart(GAME_KEY_1));
        //when then
        assertEquals("Game is already running", exception.getMessage());
    }

    @Test
    void getAverage() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.setSelectedCard(GAME_KEY_1, 1L, "6");
        pokerService.setSelectedCard(GAME_KEY_1, 2L, "3");
        pokerService.setSelectedCard(GAME_KEY_1, 3L, "9");

        assertEquals(6, pokerService.getAverage(GAME_KEY_1));
    }

    @Test
    void getAverageWithSpectators() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.setPlayerMode(GAME_KEY_1, 1L, false);
        pokerService.setSelectedCard(GAME_KEY_1, 2L, "3");
        pokerService.setSelectedCard(GAME_KEY_1, 3L, "9");
        pokerService.setPlayerMode(GAME_KEY_1, 2L, false);

        assertEquals(9, pokerService.getAverage(GAME_KEY_1));
    }

    @Test
    void getAverageWithNonNumericSelections() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.setSelectedCard(GAME_KEY_1, 1L, "3");
        pokerService.setSelectedCard(GAME_KEY_1, 2L, "A");
        pokerService.setSelectedCard(GAME_KEY_1, 3L, "?");

        assertEquals(3, pokerService.getAverage(GAME_KEY_1));
    }

    @Test
    void getAverageWithWrongGamekey() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.getAverage(GAME_KEY_1));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void offboardingPlayer() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);

        pokerService.offboarding(GAME_KEY_1, 3L, false);

        assertEquals(2, pokerService.getTableById(GAME_KEY_1).getPlayerMap().size());

        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.getTableById(GAME_KEY_1).getPlayerById(3L));
        //when then
        assertEquals("Player id: 3 isn't existing", exception.getMessage());
    }

    @Test
    void offboardingTablemaster() throws Exception {
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);

        pokerService.offboarding(GAME_KEY_1, 1L, true);

        assertTrue(pokerService.getTableById(GAME_KEY_1).isNewTablemasterNeeded());

        verify(pokerService, times(1)).sendWebsocketMessageSpecial("AskForNewTablemaster", 1L, GAME_KEY_1, false);
    }

    @Test
    void kickPlayerWithWrongGamekey() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.kickPlayer(GAME_KEY_1, 1L));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void kickPlayer() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        WebSocketSession webSocketSessionMock = mock(WebSocketSession.class);
        pokerService.getTableById(GAME_KEY_1).getWebsocketsession().put(3L, webSocketSessionMock);

        //when
        pokerService.kickPlayer(GAME_KEY_1, 3L);

        //then
        assertEquals(2, pokerService.getTableById(GAME_KEY_1).getPlayerMap().size());

        Exception exception = assertThrows(Exception.class, () ->
                pokerService.getTableById(GAME_KEY_1).getPlayerById(3L));

        assertEquals("Player id: 3 isn't existing", exception.getMessage());

        verify(pokerService, times(1)).sendWebsocketMessageSpecial("YouGotKicked", 3L, GAME_KEY_1, true);
    }

    @Test
    void kickPlayerButPlayerIsTablemaster() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        WebSocketSession webSocketSessionMock = mock(WebSocketSession.class);
        pokerService.getTableById(GAME_KEY_1).getWebsocketsession().put(3L, webSocketSessionMock);


        Exception exception = assertThrows(Exception.class, () ->
                pokerService.kickPlayer(GAME_KEY_1, 1L));

        assertEquals("Cant kick Tablemaster, Player with Id: 1 is Tablemaster", exception.getMessage());
    }

    @Test
    void offboardingWithWrongGamekey() throws Exception {
        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.offboarding(GAME_KEY_1, 1L, false));
        //when then
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
    }

    @Test
    void sendWebsocketMessageWithNoSessions() throws Exception {
        // given
        Map<Long, WebSocketSession> webSocketSessions = new HashMap<>();
        Table tableMock = mock(Table.class);
        when(tableMock.getWebsocketsession()).thenReturn(webSocketSessions);
        // when
        pokerService.sendWebsocketMessage(tableMock, WEBSOCKET_MESSAGE);
        // then
        verify(tableMock, times(1)).getWebsocketsession();
        assertEquals(0, tableMock.getWebsocketsession().size());
    }

    @Test
    void sendWebsocketMessageWithTwoSessions() throws Exception {
        // given
        Map<Long, WebSocketSession> webSocketSessions = new HashMap<>();
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        webSocketSessions.put(1L, webSocketSessionMock1);
        WebSocketSession webSocketSessionMock2 = mock(WebSocketSession.class);
        webSocketSessions.put(2L, webSocketSessionMock2);
        Table tableMock = mock(Table.class);
        when(tableMock.getWebsocketsession()).thenReturn(webSocketSessions);
        // when
        pokerService.sendWebsocketMessage(tableMock, WEBSOCKET_MESSAGE);
        // then
        verify(tableMock, times(1)).getWebsocketsession();
        assertEquals(2, tableMock.getWebsocketsession().size());
        verify(webSocketSessionMock1, times(1)).sendMessage(new TextMessage(WEBSOCKET_MESSAGE));
        verify(webSocketSessionMock2, times(1)).sendMessage(new TextMessage(WEBSOCKET_MESSAGE));
    }

    @Test
    void sendWebsocketMessageWithException() throws Exception {
        WebSocketSession webSocketSessionMock = mock(WebSocketSession.class);
        IOException ioException = mock(IOException.class);
        Set<WebSocketSession> webSocketSessions = new HashSet<>();
        webSocketSessions.add(webSocketSessionMock);

        //given
        Exception exception = assertThrows(Exception.class, () ->
                pokerService.sendWebsocketMessage(pokerService.getTableById(GAME_KEY_1), WEBSOCKET_MESSAGE));
        //when then
        assertNotNull(exception);
        assertEquals("Table Key: " + GAME_KEY_1 + " isn't existing", exception.getMessage());
        //pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        //verify(pokerService, times(1)).checkWebsocketConnection(pokerService.getTableById(GAME_KEY_1), webSocketSessionMock, "for");
    }

    @Disabled(value = "fix later")
    @Test
    void sendWebsocketMessageWithIOException() throws Exception {
        //given
        WebSocketSession webSocketSessionMock = mock(WebSocketSession.class);
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER);
        pokerService.tableMap.get(GAME_KEY_1).getWebsocketsession().put(1L, webSocketSessionMock);

        doThrow(IOException.class)
                .when(webSocketSessionMock)
                .sendMessage(new TextMessage(WEBSOCKET_MESSAGE));

        doNothing().when(pokerService).checkWebsocketConnection(pokerService.getTableById(GAME_KEY_1), webSocketSessionMock, WEBSOCKET_MESSAGE);

        //when
        pokerService.sendWebsocketMessage(pokerService.getTableById(GAME_KEY_1), WEBSOCKET_MESSAGE);

        //then
        verify(pokerService, times(1)).checkWebsocketConnection(pokerService.getTableById(GAME_KEY_1), webSocketSessionMock, WEBSOCKET_MESSAGE);
    }


    @Test
    void handleClosedConnection() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_3, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        WebSocketSession webSocketSessionMock2 = mock(WebSocketSession.class);
        pokerService.tableMap.get(GAME_KEY_3).getWebsocketsession().put(3L, webSocketSessionMock1);
        pokerService.tableMap.get(GAME_KEY_3).getWebsocketsession().put(4L, webSocketSessionMock2);
        doNothing().when(pokerService).sendWebsocketMessage(any(Table.class), anyString());

        //when
        pokerService.handleClosedConnection(webSocketSessionMock1);
        //then
        verify(pokerService, times(1)).sendWebsocketMessage(TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS,
                String.format("RefreshPlayer"));
    }

    @Test
    void handleClosedConnectionWithWrongSession() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_3, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);

        //when
        pokerService.handleClosedConnection(webSocketSessionMock1);
        //then
        verify(pokerService, times(0)).sendWebsocketMessage(TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS,
                String.format("RefreshPlayer"));
    }

    @Disabled(value = "fix later")
    @Test
    void handleClosedConnectionWithIOexception() throws Exception {
        //given
        pokerService.tableMap.put(GAME_KEY_3, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        pokerService.tableMap.get(GAME_KEY_3).getWebsocketsession().put(3L, webSocketSessionMock1);

        doThrow(IOException.class)
                .when(pokerService)
                .sendWebsocketMessage(any(Table.class), anyString());

        pokerService.handleClosedConnection(webSocketSessionMock1);


        verify(pokerService, times(1)).sendWebsocketMessage(any(Table.class),
                String.format("RefreshPlayer"));
    }

    // TODO: Enable this test!
    @Test
    @Disabled("for frontend build")
    void setUpNewTablemaster() throws Exception {
        //given
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.getTableById(GAME_KEY_1).getWebsocketsession().put(3L, webSocketSessionMock1);

        //when
        pokerService.offboarding(GAME_KEY_1, 1L, true);
        pokerService.setUpNewTablemaster(GAME_KEY_1, 3L, webSocketSessionMock1);

        //then
        assertEquals(Tablemaster.class, pokerService.getTableById(GAME_KEY_1).getPlayerById(3L).getClass());
        assertEquals(2, pokerService.getTableById(GAME_KEY_1).getPlayerMap().size());

        verify(pokerService, times(1)).sendWebsocketMessageSpecial("IAmNowTheOneAndOnlyTablemaster", 3L, GAME_KEY_1, true);
        verify(pokerService, times(1)).sendWebsocketMessageSpecial("NewTablemaster," + PLAYER_NAME_2, 3L, GAME_KEY_1, false);

        assertFalse(pokerService.getTableById(GAME_KEY_1).isNewTablemasterNeeded());
    }

    @Test
    void setUpNewTablemasterWithWrongSession() throws Exception {
        //given
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);

        //when
        pokerService.setUpNewTablemaster(GAME_KEY_1, 3L, webSocketSessionMock1);

        //then
        verify(pokerService, times(0)).sendWebsocketMessageSpecial("IAmNowTheOneAndOnlyTablemaster", 3L, GAME_KEY_1, true);
        verify(pokerService, times(0)).sendWebsocketMessage(any(Table.class), anyString());
    }

    @Test
    void setUpNewTablemasterWithPlayerWhoAlreadyIsTablemaster() throws Exception {
        //given
        WebSocketSession webSocketSessionMock1 = mock(WebSocketSession.class);
        pokerService.tableMap.put(GAME_KEY_1, TABLE_WITH_TABLEMASTER_AND_TWO_PLAYERS);
        pokerService.getTableById(GAME_KEY_1).getWebsocketsession().put(3L, webSocketSessionMock1);

        //when
        pokerService.setUpNewTablemaster(GAME_KEY_1, 1L, webSocketSessionMock1);

        //then
        verify(pokerService, times(0)).sendWebsocketMessageSpecial("IAmNowTheOneAndOnlyTablemaster", 3L, GAME_KEY_1, true);
        verify(pokerService, times(0)).sendWebsocketMessage(any(Table.class), anyString());
    }
}
