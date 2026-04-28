// import {configureStore} from "@reduxjs/toolkit"

// import allSongsSlice from "./allSongsSlice";
// import currentMusicSlice from "./currentMusicSlice";

//  const store = configureStore({
// reducer: {
   
//     "allSongs":allSongsSlice,
//     "currentMusic":currentMusicSlice
// }
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import allSongsReducer from "./allSongsSlice"; 
import currentMusicReducer from "./currentMusicSlice"; 
import authReducer from "./authSlice";
import playlistReducer from "./playlistSlice";

const store = configureStore({
  reducer: {
    allSongs: allSongsReducer,
    currentMusic: currentMusicReducer,
    auth: authReducer,
    playlist: playlistReducer
  }
});

export default store;
