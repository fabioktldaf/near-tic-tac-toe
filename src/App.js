import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { initContract, loadGameStatus, saveGameStatus } from "./utils";
import "./styles/app.css";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import Loading from "./components/Loading";
import NotLoggedInfrom from "./components/NotLoggedIn";

const App = () => {
  const [game, setGame] = useState(loadGameStatus());
  const [loading, setLoading] = useState(false);
  const [ticTacToe, setTicTacToe] = useState(null);

  useEffect(() => {
    (async () => {
      const contract = await initContract();
      setTicTacToe(contract);
    })();
  }, []);

  useEffect(() => {
    const intervalUpdatingGame = setInterval(async () => {
      if (!game.id || !ticTacToe) return;

      updateGameStatus(await ticTacToe.getGame({ gameId: game.id }));
    }, 3000);

    return () => {
      clearInterval(intervalUpdatingGame);
    };
  }, [ticTacToe, game]);

  const updateGameStatus = (updatedGame) => {
    saveGameStatus(updatedGame);
    setGame(updatedGame);
  };

  const handleStartNewGame = async () => {
    if (!ticTacToe) return;

    setLoading(true);

    try {
      const _game = await ticTacToe.createGame();
      updateGameStatus(_game);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleJoinExistingGame = async (id) => {
    if (!ticTacToe) return;

    setLoading(true);

    const gameId = parseInt(id);
    try {
      const _game = await ticTacToe.joinGame({ gameId });
      updateGameStatus(_game);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleMoveMade = async (move) => {
    if (!ticTacToe) return;

    setLoading(true);

    try {
      const _game = await ticTacToe.play({ move, gameId: game.id });

      updateGameStatus(_game);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  console.log("Game ", game);

  return !window.nearWallet?.isSignedIn() ? (
    <NotLoggedInfrom />
  ) : (
    <div className="app">
      <StatusBar gameStatus={game} onStartNewGame={handleStartNewGame} onJoinExistingGame={handleJoinExistingGame} />
      {game.id > 0 && <Board gameStatus={game} handleClick={handleMoveMade} />}
      {loading && (
        <div className="waiting-overlay">
          <div className="waiting-overlay-inner">
            <Loading />{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
