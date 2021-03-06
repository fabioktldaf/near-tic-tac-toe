import React, { useState } from "react";

export default ({ gameStatus, onStartNewGame, onJoinExistingGame }) => {
  const { winner, player1, player2, status, nextMovePlayer, id } = gameStatus;
  const [joinGameId, setJoinGameId] = useState(null);

  const won = winner?.toLowerCase() === window.nearUser?.toLowerCase();
  const loose = status == 2 && winner?.toLowerCase() != window.nearUser?.toLowerCase();
  const tie = status == 3;
  const canMove = window.nearUser?.toLowerCase() === nextMovePlayer?.toLowerCase();
  const playable = id > 0 && !won && !loose && !tie;
  const iCreateTheGame = player1?.toLowerCase() === window.nearUser?.toLowerCase();

  console.log("game");

  const renderMessage = (condition, message) => condition && <div className="message message-colored">{message}</div>;

  return (
    <div className="status-bar">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="actions">
        <div className="action">
          <button className="button-new-game" onClick={() => onStartNewGame()}>
            Create New Game
          </button>
        </div>

        <div className="action">
          <button className="join-game-button" onClick={() => onJoinExistingGame(joinGameId)}>
            Join a Game
          </button>
          <input
            className="input-join-game"
            value={joinGameId}
            onChange={(e) => setJoinGameId(e.target.value)}
            placeholder="Game Id"
          />
        </div>
      </div>

      <div className="messages">
        {iCreateTheGame && playable && (
          <div className="message">
            <p>
              Game created! The ID is
              <span className="game-details"> {id}</span>
            </p>
            <p>Give it to the other player so he can join the game.</p>
          </div>
        )}
        <div className="message">
          {playable && canMove
            ? "It's your turn"
            : playable && !canMove
            ? "Wait for your opponent's move"
            : "Create a new game or insert a Game Id and join an existing game"}
        </div>

        {won && <div className="message message-colored"> *** YOU WIN *** </div>}
        {loose && <div className="message message-colored"> YOU LOOSE </div>}
        {tie && <div className="message message-colored"> The game is a draw... </div>}
      </div>
    </div>
  );
};
