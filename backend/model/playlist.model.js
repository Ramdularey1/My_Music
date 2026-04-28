import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: "music"
    }],
    image: {
        type: String,
        default: "https://via.placeholder.com/300?text=Playlist"
    }
}, { timestamps: true });

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
