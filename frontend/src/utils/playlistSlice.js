import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists: [],
    currentPlaylist: null,
    loading: false,
    error: null
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
            state.error = null;
        },
        setCurrentPlaylist: (state, action) => {
            state.currentPlaylist = action.payload;
            state.error = null;
        },
        addPlaylist: (state, action) => {
            state.playlists.push(action.payload);
        },
        updatePlaylistInList: (state, action) => {
            const index = state.playlists.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.playlists[index] = action.payload;
            }
            if (state.currentPlaylist?._id === action.payload._id) {
                state.currentPlaylist = action.payload;
            }
        },
        removePlaylist: (state, action) => {
            state.playlists = state.playlists.filter(p => p._id !== action.payload);
            if (state.currentPlaylist?._id === action.payload) {
                state.currentPlaylist = null;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { 
    setPlaylists, 
    setCurrentPlaylist, 
    addPlaylist, 
    updatePlaylistInList, 
    removePlaylist, 
    setLoading, 
    setError, 
    clearError 
} = playlistSlice.actions;

export default playlistSlice.reducer;
