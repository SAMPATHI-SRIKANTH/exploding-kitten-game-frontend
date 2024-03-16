import React from "react";
import { useDispatch } from "react-redux";
import { drawCard } from "../../features/game/gameSlice";

import "./index.css";

const Card = ({ eachCard }) => {
  const dispatch = useDispatch();
  const onClickCard = (val) => {
    dispatch(drawCard(val));
  };
  return (
    <div className="card" onClick={() => onClickCard(eachCard.cardName)}>
      <h1>{eachCard.cardName}</h1>
    </div>
  );
};

export default Card;
