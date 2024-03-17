import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { exitGame } from "../../features/game/gameSlice";
import CardsContainer from "../CardsContainer";

import "./index.css";

const Game = () => {
  const gameState = useSelector((state) => state.game);
  const userName = useSelector((state) => state.game.userName);
  const points = useSelector((state) => state.game.points);
  const startGame = useSelector((state) => state.game.startGame);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  const handleSave = () => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  };

  const handleExit = () => {
    localStorage.removeItem("gameState");
    dispatch(exitGame());
  };

  if (!startGame) {
    return <Navigate to="/" />;
  }

  return (
    <div className="game-container">
      <div className="user-details">
        <h1>Name: {userName}</h1>
        <h1>Points: {points}</h1>
      </div>
      <div className="game-head">
        <h1>EXPLODING KITTEN Game</h1>
        <button className="save-btn" onClick={handleSave}>
          SAVE GAME
        </button>
        <button className="exit-btn" onClick={handleExit}>
          EXIT GAME
        </button>
      </div>

      <div className="game">
        <CardsContainer />
      </div>
    </div>
  );
};

export default Game;
