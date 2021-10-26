package ch.puzzle.bbt.puzzlescrumpoker.gameroles;

public class Tablemaster extends Player {


    public Tablemaster(String name, long id) {
        super(name, id);
    }

    @Override
    public String toString() {
        return "Tablemaster{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isPlaying=" + isPlaying +
                ", selectedCard='" + selectedCard + '\'' +
                '}';
    }
}
