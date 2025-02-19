import mongoose from "mongoose";
import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        validate:validator.isEmail,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },

})

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword , this.password)
    return isMatch
}

userSchema.methods.createJWT = async function(){
    return await jwt.sign({id:this.id ,name:this.name ,email:this.email} ,process.env.JWT_SECRET,{expiresIn : '1d'})

}

export default mongoose.model('user' , userSchema);