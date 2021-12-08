import React from "react";
import Loading from "./Loading";

export default ({ gameStatus, handleClick }) => {
  const { winner, player1, player2, status, id, nextMovePlayer } = gameStatus;
  const won = winner?.toLowerCase() === window.nearUser?.toLowerCase();
  const loose = status == 2 && winner?.toLowerCase() != window.nearUser?.toLowerCase();
  const tie = status == 3;
  const canMove = window.nearUser?.toLowerCase() === nextMovePlayer?.toLowerCase();
  const playable = id > 0 && !won && !loose && !tie;

  return (
    <div className="board">
      {gameStatus.squares.map((val, i) => (
        <button className="square" onClick={() => handleClick(i)} key={i}>
          {val}
        </button>
      ))}

      {playable && !canMove && (
        <div className="board-overlay">
          <Loading />
        </div>
      )}
    </div>
  );
};
