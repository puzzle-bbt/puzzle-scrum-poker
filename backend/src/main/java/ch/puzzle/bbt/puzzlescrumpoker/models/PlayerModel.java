package ch.puzzle.bbt.puzzlescrumpoker.models;

public class PlayerModel {
	public String id;
	public String gameKey;
	public String selectedCard;

	public PlayerModel(String gameKey, String id, String selectedCard) {
		this.gameKey = gameKey;
		this.id = id;
		this.selectedCard = selectedCard;
	}

}
