import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const postSchema = mongoose.Schema({
    title:String,
    message:String,
    tags:[String],
    comments:[{
        message:String,
        postedBy:{
            name:{type:String},
            selectedFile:{type:String}
        },
        postedAt:{
            type:Date,
            default: new Date().toISOString()
        }

    }],
    name:String,
    creator:String,
    creatorUrl:String,
    likes:{
        type:[String],
        default: [],
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;