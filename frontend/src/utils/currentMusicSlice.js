// import {createSlice} from "@reduxjs/toolkit"

// const currentMusicSlice = createSlice({
//     name: "currentSong",
//     initialState: {
//         currentSongs : null
//     },
     
//     reducers:{
//         updateCurrentSong: (state,action) => {
//             state.currentSongs = action.payload;
//         }
//     }

// })

// export const {updateCurrentSong} = currentMusicSlice.actions;
// export default currentMusicSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const currentMusicSlice = createSlice({
  name: "currentSong",
  initialState: {
    currentSong: null  // Adjusted property name to singular `currentSong`
  },
  reducers: {
    updateCurrentSong: (state, action) => {
      state.currentSong = action.payload;  // Ensuring immutability by assigning a new value
    }
  }
});

export const { updateCurrentSong } = currentMusicSlice.actions;
export default currentMusicSlice.reducer;
