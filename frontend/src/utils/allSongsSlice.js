// import { createSlice } from "@reduxjs/toolkit";

// const allSongsSlice = createSlice({
//     name:"allSongs",

//     initialState:{
//         allSongs: []
//     },

//     reducers:{
//         updateAllSong :(state, action) => {
//             state.allSongs = action.payload
//         }
//     }
// })

// export const {updateAllSong} = allSongsSlice.actions
// export default allSongsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const allSongsSlice = createSlice({
  name: "allSongs",
  initialState: {
    allSongs: []
  },
  reducers: {
    updateAllSongs: (state, action) => {
      state.allSongs = action.payload;
    }
  }
});

export const { updateAllSongs } = allSongsSlice.actions;
export default allSongsSlice.reducer;
