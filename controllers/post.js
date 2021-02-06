import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
import User from "../models/user.js";


export const getPosts = async (req,res) => {
    try{
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage)
    }
    catch (errors){
        res.status(501).json({message:errors.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage({...post,creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPost.save();

        res.status(200).json(newPost)
        console.log('message created')
    }
    catch (error){
        res.status(501).json({message:errors.message})
    }
}
export const updatePost = async (req,res) => {
    const {id : _id} = req.params; 
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Such id is found')
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

    res.json(updatePost)
    
    
}
export const deletePost = async (req,res) => {
    const {id} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Such id is found')
    await PostMessage.findByIdAndDelete(id)
    console.log("Deleted")
    res.send('Deleted Suuccesfully')
    
}

export const likeCount = async (req,res) => {
    const {id} = req.params; 
    
    if (!req?.userId)  return res.status(404).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Such id is found')
    const post = await PostMessage.findById(id)
    const index = post.likes.findIndex((id) => id === req.userId)

    if(index === -1){

        post.likes.push(String(req?.userId))

    } else {

        post.likes.filter((id) => id !== req?.userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new : true })
    res.json(updatedPost)
    console.log('like post')
}   


export const createComment = async (req,res) => {
    const {id} = req.params; 
    
    const cdata = req.body
    if (!req?.userId)  return res.status(404).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Such id is found')
    const updatedPost = await PostMessage.findByIdAndUpdate(id,{
        $push:{comments:cdata}
    },{new:true})

    res.json(updatedPost)
    console.log('comment added')
}   