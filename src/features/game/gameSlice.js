import { createSlice } from "@reduxjs/toolkit";

const CardNames = {
  CAT: "Cat",
  DEFUSE: "Defuse",
  EXPLODING_KITTEN: "Exploding Kitten",
  SHUFFLE: "Shuffle",
};

const shuffleCards = (newArray) => {
  let array = [...newArray];
  console.log(array, "shuffled fn array ");
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    console.log(i, j, "i j");
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
  deck: generateRandomDeck(),
  drawnCards: [],
  startGame: false,
  defuseCard: 0,
  gameStatus: "ongoing", // 'ongoing', 'won', 'lost'
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drawCard: (state, action) => {
      const drawnCard = action.payload;
      console.log(drawnCard);
      let drawnCardIndex = state.deck.findIndex(
        (card) => card.cardName === drawnCard
      );
      // console.log(state.deck[drawnCardIndex].cardName);
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
          state.gameStatus = "lost";
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
  },
});

export const { drawCard, handleStartGame } = gameSlice.actions;

export default gameSlice.reducer;

// displayedCards -> [cat,defuse,shuffle,bomb,cat]

// removedCards  -> []

// defuseCards:1 if find defuse card then defuseCard++

// card == bomb then exit game loss
//  if displayCards == 0 then player wins
