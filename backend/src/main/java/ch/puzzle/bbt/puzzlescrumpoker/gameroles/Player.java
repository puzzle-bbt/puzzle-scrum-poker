package ch.puzzle.bbt.puzzlescrumpoker.gameroles;

import java.util.Objects;

public class Player {
        protected final long id;
        protected final String name;
        protected boolean isPlaying;
        protected String selectedCard;


    public Player(String name, long id) {
        this.id = id;
        this.name = name;
        this.isPlaying = true;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSelectedCard() {
        return selectedCard;
    }

    public void setPlayerMode(boolean player){
        this.isPlaying = player;
    }

    public boolean getPlayerMode() {
        return isPlaying;
    }

    public void setSelectedCard(String selectedCard) {
        this.selectedCard = selectedCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player1 = (Player) o;
        return id == player1.id && isPlaying == player1.isPlaying && name.equals(player1.name) && Objects.equals(selectedCard, player1.selectedCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, isPlaying, selectedCard);
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isPlaying=" + isPlaying +
                ", selectedCard='" + selectedCard + '\'' +
                '}';
    }
}
