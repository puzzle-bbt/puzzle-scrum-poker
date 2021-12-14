package ch.puzzle.bbt.puzzlescrumpoker.gameroles;

import java.util.Objects;

/**
 * Warning:
 * This class must contain the same properties as Player interface from frontend!
 */
public class Player {
        protected final long id;
        protected final String name;
        protected boolean playing;
        protected String selectedCard;


    public Player(String name, long id) {
        this.id = id;
        this.name = name;
        this.playing = true;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean isPlaying() {
        return playing;
    }

    public String getSelectedCard() {
        return selectedCard;
    }

    public void setPlaying(boolean plisPlayingayer){
        this.playing = playing;
    }


    public void setSelectedCard(String selectedCard) {
        this.selectedCard = selectedCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player1 = (Player) o;
        return id == player1.id && playing == player1.playing && name.equals(player1.name) && Objects.equals(selectedCard, player1.selectedCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, playing, selectedCard);
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isPlaying=" + playing +
                ", selectedCard='" + selectedCard + '\'' +
                '}';
    }
}
