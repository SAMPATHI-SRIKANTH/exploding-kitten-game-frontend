import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  points: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    wonGame: (state) => {
      state.points += 1;
    },
    handleUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { wonGame, handleUserName } = userSlice.actions;
export default userSlice.reducer;
