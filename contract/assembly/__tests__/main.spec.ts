import { createGame, play, getGame } from "..";
import { Game, games, GameStatus } from "../models";
import { storage, Context } from "near-sdk-as";

describe("TicTacToe ", () => {
  xit("should create a game", () => {
    const game = createGame();
    expect(game.id).toBe(1, "Shoud contain 1 game");
  });

  xit("should increase gameId", () => {
    const game1 = createGame();
    const game2 = createGame();

    expect(game2.id).toBe(game1.id + 1, "Second game should have gameId1 + 1");
  });

  it("should make a move", () => {
    let game = createGame();

    expect(game.id).toBe(1, "game.id"); // 1
    expect(game.status).toBe(1, "game.status"); // 1
    expect(game.player1).toBe(Context.sender, "game.player1"); // bob
    expect(game.player2).toBe("", "game.player2"); // ""
    expect(game.nextMovePlayer).toBe(Context.sender, "game.nextMovePlayer"); // bob
    expect(game.squares[0]).toBe(" ", "square[0]");

    game = play(0, game.id);

    expect(game.nextMovePlayer).toBe("", "Player2 AND it should be empty");
    expect(game.squares[0]).toBe("X", "square[0]");
  });
});
