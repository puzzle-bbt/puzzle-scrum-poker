/**
 * @deprecated The method should be deleted
 */
export interface PlayerModel {
  id: string;
  gameKey: string | undefined;
  selectedCard: string | undefined;
}

export interface Player  {
  id: number;
  name: string;
  isPlaying: boolean;
  selectedCard: string | undefined;
}

export interface Game {
  gameKey: string;
  isGameRunning: boolean;
  me: Player | undefined;
  iAmTableMaster: boolean;
  roundInfo : string | undefined;
  roundInfoLink: string | undefined;
}

export interface UserError {
  httpCode: number |undefined;
  message: string;
}
