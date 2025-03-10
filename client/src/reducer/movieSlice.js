import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topratedMovies : [],
  trendingMovies : [],
  topratedShows :[],
  searchResults : {},
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
    setSearchResults : (state , action)=>{
      state.searchResults = action.payload;
    },
    setTopratedShows : (state , action)=>{
      state.topratedShows = action.payload;
    }
  },
});

export const { setDetails, setTopratedMovies, setTrendingMoves ,setSearchResults , setTopratedShows} = movieSlice.actions;
export default movieSlice.reducer; 