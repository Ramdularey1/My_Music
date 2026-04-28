import { Router } from "express";
import { registerUser, loginUser, logoutUser, myFavoriteMusic } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addMusic,getMusic } from "../controller/music.controller.js";

const router = Router();

router.route("/test").get((_,res) => {
    return res.json({
        success : true
    })
})
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/music").post(addMusic)
router.route("/favorite-music/:musicId").post(verifyJWT,myFavoriteMusic)
router.route("/getmusic").get(getMusic);


export default router;