import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  handleUserName,
  handlePoints,
  handleStartGame,
} from "../../features/game/gameSlice";

import "./index.css";

const Home = () => {
  const userName = useSelector((state) => state.game.userName);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log("home page");
  useEffect(() => {
    if (userName !== "") {
      navigate("/game");
    }
  }, [userName, navigate]);

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const onClickStartGame = async (e) => {
    e.preventDefault();
    if (name !== "") {
      try {
        const response = await fetch(
          "https://exploding-kitten-game-backend-production.up.railway.app/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: name }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data, "data from server");
        dispatch(handleUserName(data.userName));
        dispatch(handlePoints(data.points));
        dispatch(handleStartGame());
        navigate("/game");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Exploding Kittens</h1>
      <div>
        <label htmlFor="username">Enter your username to start the game:</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={name}
          onChange={handleInput}
          required
        />
        <button type="button" onClick={onClickStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
