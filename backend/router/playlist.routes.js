import { Router } from "express";
import { 
    createPlaylist, 
    getUserPlaylists, 
    getPlaylistById, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    deletePlaylist,
    updatePlaylist
} from "../controller/playlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Protected routes (require authentication)
router.route("/create").post(verifyJWT, createPlaylist);
router.route("/my-playlists").get(verifyJWT, getUserPlaylists);
router.route("/:playlistId").get(verifyJWT, getPlaylistById);
router.route("/add-song").post(verifyJWT, addSongToPlaylist);
router.route("/remove-song").post(verifyJWT, removeSongFromPlaylist);
router.route("/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/:playlistId").put(verifyJWT, updatePlaylist);

export default router;
