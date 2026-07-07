import cookieParser from "cookie-parser";
import express from "express"
import path from 'path';

import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/index.js";
import { isAllowedOrigin } from "./constant.js";


dotenv.config({
    path: './.env',
})

const port = process.env.PORT || 8000;

const app = express()
app.use('/uploads', express.static('uploads'));
app.use(cookieParser())

const corsOptions = {
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
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
