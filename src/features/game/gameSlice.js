import { createSlice } from "@reduxjs/toolkit";

const CardNames = {
  CAT: "Cat",
  DEFUSE: "Defuse",
  EXPLODING_KITTEN: "Exploding Kitten",
  SHUFFLE: "Shuffle",
};

const shuffleCards = (newArray) => {
  let array = [...newArray];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const generateRandomDeck = () => {
  let randomCards = [];
  const cardTypes = [
    CardNames.CAT,
    CardNames.DEFUSE,
    CardNames.EXPLODING_KITTEN,
    CardNames.SHUFFLE,
  ];

  for (let i = 0; i < 5; i++) {
    if (i >= 3) {
      const randomIndex = Math.floor(Math.random() * cardTypes.length);
      randomCards.push({ id: i + 1, cardName: cardTypes[randomIndex] });
      continue;
    }
    randomCards.push({ id: i + 1, cardName: cardTypes[i] });
    randomCards = shuffleCards(randomCards);
  }

  return randomCards;
};

const initialState = {
  userName: "",
  points: 0,
  deck: generateRandomDeck(),
  drawnCards: [],
  startGame: false,
  defuseCard: 0,
  gameStatus: "ongoing",
  activeCard: "",
};
const persistedStateJSON = localStorage.getItem("gameState");

const persistedState = persistedStateJSON
  ? JSON.parse(persistedStateJSON)
  : initialState;

const gameSlice = createSlice({
  name: "game",
  initialState: persistedState,
  reducers: {
    wonGame: (state) => {
      state.points += 1;
    },
    handleUserName: (state, action) => {
      state.userName = action.payload;
    },
    handlePoints: (state, action) => {
      state.points = action.payload;
    },
    handleActiveCard: (state, action) => {
      state.activeCard = action.payload;
    },
    drawCard: (state, action) => {
      const drawnCard = action.payload;

      let drawnCardIndex = state.deck.findIndex(
        (card) => card.cardName === drawnCard
      );

      switch (drawnCard) {
        case CardNames.CAT:
          state.deck.splice(drawnCardIndex, 1);
          state.drawnCards.push(drawnCard);
          break;
        case CardNames.DEFUSE:
          state.deck.splice(drawnCardIndex, 1);
          state.drawnCards.push(drawnCard);
          state.defuseCard += 1;
          break;
        case CardNames.EXPLODING_KITTEN:
          console.log(CardNames.EXPLODING_KITTEN);
          state.deck.splice(drawnCardIndex, 1);
          state.drawnCards.push(drawnCard);
          if (state.defuseCard > 0) {
            state.defuseCard -= 1;
          } else {
            state.gameStatus = "lost";
          }

          break;
        case CardNames.SHUFFLE:
          state.deck = generateRandomDeck();
          break;
        default:
          break;
      }
      if (state.deck.length === 0) {
        state.gameStatus = "won";
      }
    },
    handleStartGame: (state) => {
      state.startGame = true;
    },
    restartGame: (state) => {
      state.deck = generateRandomDeck();
      state.gameStatus = "ongoing";
      state.defuseCard = 0;
      state.drawnCards = [];
      state.activeCard = "";
    },
    exitGame: (state) => {
      return initialState;
    },
  },
});

export const {
  drawCard,
  handleStartGame,
  wonGame,
  handleUserName,
  restartGame,
  handlePoints,
  handleActiveCard,
  exitGame,
} = gameSlice.actions;

export default gameSlice.reducer;
