import CustomError from "../utils/customError.js";

import { verifyToken } from "../utils/jwt.js";

import User from "../models/userModels.js";

const authenticate=async(req,res,next)=>{
    
    try{
        const token=req.cookies.accessToken;
        // console.log(token)
        if(!token){
            throw new CustomError('Access token miising',401)
        }

        const decoded=verifyToken(token,process.env.JWT_SECRET)
        if(!decoded){
            throw new CustomError('invalid or expired access token',403)
        }
        const user=await User.findById(decoded.id)
        if(!user){
            throw new CustomError('user not found',404)
        }
        
        req.user=user;
        next()

    }catch(err){
        console.log(err)
        next(err)
    }
}

export default authenticate;