import { Game, GameStatus, games } from "./models";
import { context } from "near-sdk-as";

function assert_game_id(gameId: i32): void {
  assert(gameId <= games.length, "Invalid Game Id");
}

export function createGame(): Game {
  const newGame = new Game();

  newGame.player1 = context.sender;
  newGame.nextMovePlayer = context.sender;
  newGame.id = games.length + 1;
  newGame.status = GameStatus.Playable;

  games.push(newGame);
  return newGame;
}

export function getGame(gameId: i32): Game {
  assert_game_id(gameId);
  return games[gameId - 1];
}

export function joinGame(gameId: i32): Game {
  assert_game_id(gameId);

  const game = games[gameId - 1];

  assert(game.status == GameStatus.Playable, "You cannot join to this game");
  assert(game.player1 != context.sender, "You cannot be player2");

  const newGame = new Game();

  newGame.id = game.id;
  newGame.squares = game.squares;
  newGame.player1 = game.player1;
  newGame.player2 = context.sender;
  newGame.nextMovePlayer = game.nextMovePlayer;
  newGame.winner = game.winner;
  newGame.status = game.status;
  newGame.logs = game.logs;

  games[gameId - 1] = newGame;
  return newGame;
}

export function play(move: u8, gameId: i32): Game {
  assert_game_id(gameId);

  const game = games[gameId - 1];

  assert(game.status == GameStatus.Playable, "This game cannot be played");
  assert(game.nextMovePlayer == context.sender, "You cannot play");
  assert(game.squares[move] == " ", "You can't choose this square");

  const updatedGame = new Game();

  updatedGame.id = game.id;
  updatedGame.squares = game.squares;
  updatedGame.status = game.status;

  updatedGame.player1 = game.player1;
  updatedGame.player2 = context.sender;
  updatedGame.logs = game.logs;

  updatedGame.squares[move] = context.sender == game.player1 ? "X" : "O";

  if (
    areSquaresEquals(game, 0, 1, 2) ||
    areSquaresEquals(game, 3, 4, 5) ||
    areSquaresEquals(game, 6, 7, 8) ||
    areSquaresEquals(game, 0, 3, 6) ||
    areSquaresEquals(game, 1, 4, 7) ||
    areSquaresEquals(game, 2, 5, 8) ||
    areSquaresEquals(game, 0, 4, 8) ||
    areSquaresEquals(game, 2, 4, 6)
  ) {
    updatedGame.winner = game.nextMovePlayer;
    updatedGame.nextMovePlayer = "";
    updatedGame.status = GameStatus.EndedWithWinner;

    games[gameId - 1] = updatedGame;
    return updatedGame;
  }

  const emptySquares = game.squares.filter((square: string) => square == " ").length;

  if (emptySquares == 0) {
    updatedGame.nextMovePlayer = "";
    updatedGame.status = GameStatus.EndedWithTie;

    games[gameId - 1] = updatedGame;
    return updatedGame;
  }

  updatedGame.nextMovePlayer = game.nextMovePlayer == game.player1 ? game.player2 : game.player1;

  games[gameId - 1] = updatedGame;
  return updatedGame;
}

function areSquaresEquals(game: Game, iSquare1: u8, iSquare2: u8, iSquare3: u8): boolean {
  return (
    game.squares[iSquare1] != " " &&
    game.squares[iSquare1] == game.squares[iSquare2] &&
    game.squares[iSquare1] == game.squares[iSquare3]
  );
}
