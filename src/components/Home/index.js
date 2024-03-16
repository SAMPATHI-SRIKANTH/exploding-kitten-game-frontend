import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleUserName } from "../../features/user/userSlice";
import { handleStartGame } from "../../features/game/gameSlice";

import "./index.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setUserName(e.target.value);
  };

  const onClickStartGame = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (userName !== "") {
      try {
        const response = await fetch(
          "https://exploding-kitten-game-backend.onrender.com/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch(handleUserName(data.username));
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
          value={userName}
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
