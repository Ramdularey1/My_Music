import cookieParser from "cookie-parser";
import express from "express"
import path from 'path';

import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env',
})

const port = process.env.PORT || 8000;
const defaultAllowedOrigins = [
    "https://my-music-bice.vercel.app",
    "http://localhost:5173"
];
const allowedOrigins = [
    ...defaultAllowedOrigins,
    ...(process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
];

const app = express()
app.use('/uploads', express.static('uploads'));
app.use(cookieParser())

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions))
app.options("*", cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))



app.get("/",(req, res) => {
    res.send("HomePage")
})

import userRoute from "./router/user.routes.js";
import playlistRoute from "./router/playlist.routes.js";
import { upload } from "./multer/multer.js";
import { errorHandler } from "./middleware/error.middleware.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/playlists", playlistRoute);

// Error handling middleware (must be last)
app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})
