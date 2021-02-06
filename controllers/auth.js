import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const signin = async (req,res) => {
    const {email,password} = req.body;

    try {
        let existingUser = await User.findOne({email})

        if(!existingUser) return res.status(401).json({message:'User not found'})

        const passwordMatch = bcrypt.compare(password,existingUser.password)

        if(!passwordMatch) return res.status(401).json({message:'Invalid Credentials'})

        const token = jwt.sign({email:existingUser.email,id:existingUser._id}, "test", {expiresIn:"1h"})

        res.status(200).json({result:existingUser,token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Error'})
    
    }
    

}
export const signup = async (req,res) => {
    const {email,password,confirmPassword,firstName,lastName,selectedFile} = req.body;

    try {
        let existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({message:'User already exists'})

        if(password !== confirmPassword)  return res.status(400).json({message:'Password dont match'})

        const hashedPass = await bcrypt.hash(password,12)

        const result = await User.create({email,password:hashedPass,name:`${firstName} ${lastName}`,selectedFile:selectedFile})

        const token = jwt.sign({email:result.email,id:result._id}, "test", {expiresIn:"1h"})

        res.status(200).json({result,token})

    } catch (error) {

        return res.status(500).json({message:'Error'})
    
    }
    

}

export const addFavourites = async (req,res) => {
    const {id} = req.params; 
    const movieData = req.body


    const updatedPost = await User.findByIdAndUpdate(id,{
        $push:{favourite:movieData}
    },{new:true})

    res.json({result:updatedPost})
} 