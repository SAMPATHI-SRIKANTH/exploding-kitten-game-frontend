import React from "react";
import { useDispatch } from "react-redux";
import { drawCard, handleActiveCard } from "../../features/game/gameSlice";

import "./index.css";

const Card = ({ eachCard, setActiveCard }) => {
  const dispatch = useDispatch();
  const onClickCard = (val) => {
    dispatch(drawCard(val));
    dispatch(handleActiveCard(val));
  };
  return (
    <div className="card" onClick={() => onClickCard(eachCard.cardName)}>
      <h1>CARD</h1>
    </div>
  );
};

export default Card;
