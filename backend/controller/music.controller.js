import Music from "../model/ music.model.js";
import Category from "../model/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { upload } from "../multer/multer.js";


const uploadFields = upload.fields([
    { name: 'musicImage', maxCount: 1 },
    { name: 'musicAudio', maxCount: 1 }
]);


export const addMusic = async (req, res) => {
    try {
        // Call the middleware to handle file upload
        uploadFields(req, res, async (err) => {
            if (err) {
                throw new ApiError(400, err.message); // Handle multer errors
            } else {
                const { musicName, singerName, categoryName } = req.body;
                const musicImageURL = req.files ? req.files['musicImage'][0].path  : ''; // Get the uploaded image URL
                const audiosongURL = req.files ? req.files['musicAudio'][0].path : '';

                if(!musicImageURL){
                    throw new ApiError(500, "Can not get musicImageURL")
                }

                if(!audiosongURL){
                    throw new ApiError(500, "Can not get audiosongURL")
                }



                const musicImage = `http://localhost:${process.env.PORT}/${musicImageURL}`
                const musicAudio = `http://localhost:${process.env.PORT}/${audiosongURL}`

                // Check if categoryName is provided
                if (!categoryName) {
                    throw new ApiError(400, "Category name is required");
                }

                // Find or create the category
                let category = await Category.findOne({ name: categoryName });
                if (!category) {
                    category = await Category.create({ name: categoryName });
                }

                // Create the music document
                const music = await Music.create({
                    musicName,
                    singerName,
                    musicImage,
                    musicAudio,
                    category: category._id
                });

                return res.status(200).json({ data: music, message: "Music created successfully" });
            }
        });
    }catch (error) {
        console.error("Error:", error);
        
        return res.status(500).json({ error: "Something went wrong while creating music" });
    }
};

export const getMusic = async (req,res) => {
try {
    const data = await Music.find()
    if(!data){
        throw new ApiError(500, "Data does not fetch correctly")
    }

    return res.status(200).json({
        data:data, Message:"Data fetch"
    })
} catch (error) {
    console.log("error:", error)
    return res.status(500).json({error:"Something went wrong while fetchimg data"})
}
}