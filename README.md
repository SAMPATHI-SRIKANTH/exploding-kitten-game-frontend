# Exploding Kittens Game

This is a React-based web application for playing the Exploding Kittens card game.

This is url of the game [here](https://exploding-kitten-game-frontend.vercel.app/)

## Features

- Allows users to register with a username to start playing the game.
- Implements game logic for drawing cards, including Exploding Kittens, Defuse, and Cat cards.
- Tracks user points .


## Getting Started

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Debug  by redux extension

## Usage

Once the development server is running, you can access the application in your web browser. Use the following endpoints:

- `/`: Home page to register and start the game.
- `/game`: Game page to play the Exploding Kittens game.
-  Save game using save game button then user came where he left game
-  Exit Game using exit game button

##   Rules 
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

## API Documentation

The backend API provides endpoints for user registration, recording game scores, and retrieving leaderboard information. You can find the API documentation [here](https://github.com/SAMPATHI-SRIKANTH/exploding-kitten-game-backend).



