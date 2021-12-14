package ch.puzzle.bbt.puzzlescrumpoker.gameroles;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PlayerTest {

    public static final String PLAYER_NAME = "Max";
    public static final long PLAYER_ID = 1;


    @InjectMocks
    Player player = new Player(PLAYER_NAME, PLAYER_ID);

    @Test
    void testInitialValues() {
        assertEquals(PLAYER_ID, player.getId());
        assertEquals(PLAYER_NAME, player.getName());
        assertNull(player.getSelectedCard());
        assertTrue(player.isPlaying());
    }


    @Test
    void setSelectedCard() {
        //given
        player.setSelectedCard("5");
        //when
        assertEquals(player.getSelectedCard(), "5");
    }

    @Test
    void setSelectedCardNull() {
        //given
        player.setSelectedCard(null);
        //when
        assertNull(player.getSelectedCard());
    }
}