/**
 * Warning:
 * This interface must contain the same properties as the ch.puzzle.bbt.puzzlescrumpoker.gameroles.Player object!
 */
export interface Player {
  id: number;
  name: string;
  playing: boolean;
  selectedCard: string | undefined;
}

export interface Game {
  gameKey: string;
  isGameRunning: boolean;
  me: Player | undefined;
  iAmTableMaster: boolean;
  roundInfo: string | undefined;
  roundInfoLink: string | undefined;
}

export interface UserError {
  httpCode: number | undefined;
  message: string;
}
