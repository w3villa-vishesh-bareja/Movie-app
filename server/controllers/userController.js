import express from 'express'
import userSchema from '../model/userSchema.js'

export const registerUser = async (req,res)=>{
    const {name , email , password} = req.body;

    if(!name || !email || !password){
       return res.status(400).send({message:"All fields are mandatory"});
    }
    
    try{
        const isExisting = await userSchema.findOne({email});
        if (isExisting){
           return res.status(400).send(
            {
                message:"Another user with this email already exists try logging in", 
            });
        }
        const user = await userSchema.create({name , email , password});
        await user.save;
        return res.status(201).send({
            success:true,
            message:"User registered!",
            user:{
                name:user.name,
                email:user.email,
            }
        })
    }catch(err){
       return res.status(500).send({
            success:false,
            message: `error in registering user : ${err.message}`
        })
    }
}

export const loginUser = async(req,res)=>{
    const { email , password} = req.body;
    try{

        if(!email || !password) {
            return res.status(400).send({message:"email and password are required to login"})
        }
        const user = await userSchema.findOne({email}).select("password");
        if(!user){
            return res.status(400).send({message:"user not found"});
        }
        console.log(user);
        const isMatch  = await user.comparePassword(password);
        console.log(isMatch);
        if(!isMatch){
            return res.status(400).send({message:"Incorrect email or password"});
        }
        // user.password=undefined;
        
        const token = await user.createJWT();
        console.log(token)
        return res.status(200).send(
            {
                success:true,
                message:"logged in",
                user:user,
                token:token
            }
        )
    }catch(err){
        return res.status(500).send({message:`${err.message}`})
    }
}