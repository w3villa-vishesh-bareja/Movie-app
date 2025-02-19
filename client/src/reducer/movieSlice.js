import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topratedMovies : [],
  trendingMovies : [],
  details : {} , 
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setTopratedMovies: (state, action) => {
      state.topratedMovies = action.payload;
    },
    setTrendingMoves: (state, action) => {
      state.trendingMovies = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setDetails, setTopratedMovies, setTrendingMoves} = movieSlice.actions;
export default movieSlice.reducer; 