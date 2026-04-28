import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required: true
    }
},{timestamps:true});

const Category = mongoose.model("Category",categorySchema);

export default Category;


// import Music from './models/Music'; // Import the Music model
// import Category from './models/Category'; // Import the Category model

// // Define a function to add music with a category
// const addMusicWithCategory = async (musicData) => {
//     try {
//         // Extract music data
//         const { musicName, singerName, musicImage, musicAudioURL, categoryName } = musicData;

//         // Find or create the category
//         let category = await Category.findOne({ name: categoryName });
//         if (!category) {
//             category = await Category.create({ name: categoryName });
//         }

//         // Create the music with a reference to the category
//         const music = await Music.create({
//             musicName,
//             singerName,
//             musicImage,
//             musicAudioURL,
//             category: category._id // Reference to the category
//         });

//         return music;
//     } catch (error) {
//         // Handle errors
//         console.error('Error adding music with category:', error);
//         throw error;
//     }
// };

// // Example usage
// const musicData = {
//     musicName: 'Song Name',
//     singerName: 'Singer Name',
//     musicImage: 'image_url_here',
//     musicAudioURL: 'audio_url_here',
//     categoryName: 'Category Name'
// };

// addMusicWithCategory(musicData)
//     .then(music => {
//         console.log('Music added with category:', music);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
