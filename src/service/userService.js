import bcrypt from 'bcrypt'

import User from '../models/userModels.js'

import CustomError from '../utils/customError.js'
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
    const isMatch=await bcrypt.compare(password,userData.password);
    if(!isMatch){
        throw new CustomError("invalid password/email,try again",400)
    }
    if(userData.isBlock){
        throw new CustomError("your account is blocked",403)
    }

    return userData;
}

