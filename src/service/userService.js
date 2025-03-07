import bcrypt from 'bcrypt'

import User from '../models/userModels.js'

import CustomError from '../utils/customError.js'
import { generateAccessToken, verifyToken } from '../utils/jwt.js'
//service of new user
export const userRegister=async(data)=>{
    const {name,email,password,username}=data
    const userExists=await User.findOne({email})
    if(userExists){
        throw new CustomError("user already exists",400)
    }

     
    const hashedpassword=await bcrypt.hash(password,8);
    
    const newuser=new User({
        name,
        email,
        password:hashedpassword,
        username
    })

    const saveduser=await newuser.save()
    return saveduser;
}

//service of login user

export const loginuser=async(email,password)=>{
    const userData=await User.findOne({email})
    if(!userData){
        throw new CustomError("please create an account,email is invalid",400)
    }
    const isMatch=await bcrypt.compare(password,userData.password);   //compare user entered pwd and hashed pwd stored in the db
    if(!isMatch){
        throw new CustomError("invalid password/email,try again",400)
    }
    if(userData.isBlocked){
        throw new CustomError("your account is blocked",403)
    }
    if(userData.role==="admin"){
        throw new CustomError("user not found",404)
    }

    return userData;
}

export const refreshAccessTokenService=async(refreshToken)=>{

    //refresh token exists
    if(!refreshToken){
         throw new CustomError("Refresh token missing",401)
    }
    //verify refresh token
    const decoded=verifyToken(refreshToken,process.env.JWT_REFRESH_SECRET)
    console.log(decoded,"decoded data.......")
    if(!decoded){
        throw new CustomError("Invalid or expired refresh token", 403)
    }
    const user=await User.findById(decoded.id)
    console.log(user,"user data")
    if(!user){
        throw new CustomError("User not found",404)
    }
    const newAccessToken=generateAccessToken(user)
    return {newAccessToken}
  }