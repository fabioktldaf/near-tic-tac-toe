import { PersistentVector } from "near-sdk-as";

export enum GameStatus {
  None,
  Playable,
  EndedWithWinner,
  EndedWithTie,
}

@nearBindgen
export class Game {
  public id: i32 = 0;
  public squares: string[] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  public player1: string = "";
  public player2: string = "";
  public nextMovePlayer: string = "";
  public winner: string = "";
  public status: GameStatus = GameStatus.None;

  public logs: string = "";
}

export const games = new PersistentVector<Game>("g");
