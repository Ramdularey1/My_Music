import User from "../model/user.model.js";
import Music from "../model/ music.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");

    }
}

export const registerUser = asyncHandler(async (req, res, next) => {
    const { username, fullname, email, password } = req.body
    // console.log(req.body);
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(409, "User with this email or username already exist")

    }

    const user = await User.create({
        fullname: fullname,
        email: email,
        username: username,
        password: password

    });

    const createdUser = await User.findById(user._id).select("-refreshToken -password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");

    }

    return res.status(201).json({ data: createdUser });
})

export const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password, username } = req.body;
    //  console.log("Email",username)
    if (!(username || email)) {
        throw new ApiError(400, "username or email is required")
    }
    
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    // console.log("User",user)

    if (!user) {
        throw new ApiError(404, "User with this email does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000
    }
    console.log(refreshToken);

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({ data: loggedInUser, message: "User logged in successfully"});
})






export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out successfully" })
})

export const myFavoriteMusic = asyncHandler(async(req, res) => {
    const {musicId} = req.params;

    const user = req.user;
   
    if(!user){
        throw new ApiError(404, "User does not exist")
    }

    const music = await Music.findById(musicId);

    if(!music){
        throw new ApiError(404, "Music not found")
    }

    user.favoriteMusic.push(music);

    await user.save();
  
    return res.status(200).json({message:"Music added to favorites successfully"})
})

