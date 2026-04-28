import Playlist from "../model/playlist.model.js";
import Music from "../model/ music.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createPlaylist = async (req, res, next) => {
    try {
        const { playlistName, description, image } = req.body;
        const userId = req.user._id;

        if (!playlistName || playlistName.trim() === "") {
            throw new ApiError(400, "Playlist name is required");
        }

        const existingPlaylist = await Playlist.findOne({
            playlistName: playlistName.trim(),
            owner: userId
        });

        if (existingPlaylist) {
            throw new ApiError(409, "Playlist with this name already exists");
        }

        const playlist = await Playlist.create({
            playlistName: playlistName.trim(),
            description: description || "",
            owner: userId,
            image: image || "https://via.placeholder.com/300?text=Playlist",
            songs: []
        });

        return res.status(201).json({ 
            success: true, 
            data: playlist 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getUserPlaylists = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const playlists = await Playlist.find({ owner: userId })
            .populate("songs")
            .sort({ createdAt: -1 });

        return res.status(200).json({ 
            success: true, 
            data: playlists 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getPlaylistById = async (req, res, next) => {
    try {
        const { playlistId } = req.params;

        const playlist = await Playlist.findById(playlistId)
            .populate("songs")
            .populate("owner", "username fullname");

        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        return res.status(200).json({ 
            success: true, 
            data: playlist 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const addSongToPlaylist = async (req, res, next) => {
    try {
        const { playlistId, musicId } = req.body;
        const userId = req.user._id;

        if (!playlistId || !musicId) {
            throw new ApiError(400, "Playlist ID and Music ID are required");
        }

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // Check if user owns the playlist
        if (playlist.owner.toString() !== userId.toString()) {
            throw new ApiError(403, "You can only add songs to your own playlists");
        }

        // Check if music exists
        const music = await Music.findById(musicId);
        if (!music) {
            throw new ApiError(404, "Music not found");
        }

        // Check if song already in playlist
        if (playlist.songs.includes(musicId)) {
            throw new ApiError(409, "Song already exists in playlist");
        }

        playlist.songs.push(musicId);
        await playlist.save();

        const updatedPlaylist = await Playlist.findById(playlistId).populate("songs");

        return res.status(200).json({ 
            success: true, 
            data: updatedPlaylist 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const removeSongFromPlaylist = async (req, res, next) => {
    try {
        const { playlistId, musicId } = req.body;
        const userId = req.user._id;

        if (!playlistId || !musicId) {
            throw new ApiError(400, "Playlist ID and Music ID are required");
        }

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // Check if user owns the playlist
        if (playlist.owner.toString() !== userId.toString()) {
            throw new ApiError(403, "You can only remove songs from your own playlists");
        }

        // Remove song from playlist
        playlist.songs = playlist.songs.filter(id => id.toString() !== musicId);
        await playlist.save();

        const updatedPlaylist = await Playlist.findById(playlistId).populate("songs");

        return res.status(200).json({ 
            success: true, 
            data: updatedPlaylist 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deletePlaylist = async (req, res, next) => {
    try {
        const { playlistId } = req.params;
        const userId = req.user._id;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // Check if user owns the playlist
        if (playlist.owner.toString() !== userId.toString()) {
            throw new ApiError(403, "You can only delete your own playlists");
        }

        await Playlist.findByIdAndDelete(playlistId);

        return res.status(200).json({ 
            success: true, 
            message: "Playlist deleted successfully" 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const updatePlaylist = async (req, res, next) => {
    try {
        const { playlistId } = req.params;
        const { playlistName, description, image } = req.body;
        const userId = req.user._id;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            throw new ApiError(404, "Playlist not found");
        }

        // Check if user owns the playlist
        if (playlist.owner.toString() !== userId.toString()) {
            throw new ApiError(403, "You can only update your own playlists");
        }

        if (playlistName) playlist.playlistName = playlistName.trim();
        if (description !== undefined) playlist.description = description.trim();
        if (image) playlist.image = image;

        await playlist.save();

        return res.status(200).json({ 
            success: true, 
            data: playlist 
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
