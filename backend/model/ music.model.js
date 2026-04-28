import mongoose, {Schema} from "mongoose";

const musicSchema = new Schema({
    musicName:{
        type:String,
        required:true,
        unique:true
    },
    singerName:{
        type:String,
        required:true,
    },
    musicImage:{
        type: String,
        required:true
    },
    musicAudio:{
        type: String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true});

const Music = mongoose.model("music", musicSchema);

export default Music;