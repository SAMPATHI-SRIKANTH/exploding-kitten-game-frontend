import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  wonGame,
  restartGame,
  handleActiveCard,
} from "../../features/game/gameSlice";

import Card from "../Card";
import "./index.css";

const CardsContainer = () => {
  const activeCard = useSelector((state) => state.game.activeCard);
  const deck = useSelector((state) => state.game.deck);
  const userName = useSelector((state) => state.game.userName);
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deck.length === 0) {
      dispatch(wonGame());
      const sendData = async () => {
        try {
          const response = await fetch(
            "https://exploding-kitten-game-backend-production.up.railway.app/record-game",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: userName }),
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log(data, "record game");
        } catch (error) {
          console.error("Error:", error);
        }
      };
      sendData();
    }
  }, [deck, userName, dispatch]);

  const handlePlay = () => {
    dispatch(restartGame());
    dispatch(handleActiveCard(""));
  };

  const Cards = () => (
    <div className="cards-container">
      <div className="active-card">
        <h1>{activeCard}</h1>
      </div>
      <div className="cards">
        {deck.map((eachCard) => (
          <Card key={eachCard.id} eachCard={eachCard} />
        ))}
      </div>
    </div>
  );

  const Failure = () => (
    <div className="status-container">
      <h1>YOU LOST</h1>
      <button onClick={handlePlay} className="play-btn">
        Play Again
      </button>
    </div>
  );

  const Won = () => (
    <div className="status-container">
      <h1>YOU WON</h1>
      <button onClick={handlePlay} className="play-btn">
        Play Again
      </button>
    </div>
  );

  switch (gameStatus) {
    case "ongoing":
      return <Cards />;
    case "lost":
      return <Failure />;
    case "won":
      return <Won />;
    default:
      return null;
  }
};

export default CardsContainer;
