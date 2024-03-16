import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { drawCard } from "../../features/game/gameSlice";
import { wonGame } from "../../features/user/userSlice";
import Card from "../Card";
import "./index.css";

const CardsContainer = () => {
  const deck = useSelector((state) => state.game.deck);
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deck.length === 0) {
      dispatch(wonGame());
    }
  }, [deck, dispatch]);

  return (
    <div className="cards-container">
      {deck.map((eachCard) => (
        <Card key={eachCard.id} eachCard={eachCard} />
      ))}
    </div>
  );
};

export default CardsContainer;
