import React from "react";
import { useSelector } from "react-redux";
import CardsContainer from "../CardsContainer";

import "./index.css";

const Game = () => {
  const userName = useSelector((state) => state.user.userName);
  const points = useSelector((state) => state.user.points);
  const gameStatus = useSelector((state) => state.game.gameStatus);

  return (
    <div className="game-container">
      <div className="user-details">
        <h1>Name: {userName}</h1>
        <h1>Points: {points}</h1>
      </div>
      <h1>Game</h1>
      <div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Game;
