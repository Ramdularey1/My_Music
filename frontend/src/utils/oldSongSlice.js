// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const oldSongSlice = createSlice({
//     name: "oldSong",
//     initialState: {
//         oldSong: []
//     },

//     reducers: {
//      updateoldSong: (state, action) => {
//         state.oldSong = action.payload
//      }
//     }
// })

// export const {updateoldSong} = oldSongSlice.actions;
// export default oldSongSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const oldSongSlice = createSlice({
  name: "oldSong",
  initialState: {
    oldSongs: []  // Adjusted property name to plural `oldSongs`
  },
  reducers: {
    updateOldSongs: (state, action) => {
      state.oldSongs = action.payload;  // Ensuring immutability by assigning a new value
    }
  }
});

export const { updateOldSongs } = oldSongSlice.actions;
export default oldSongSlice.reducer;
