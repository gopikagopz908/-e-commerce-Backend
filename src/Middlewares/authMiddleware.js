import CustomError from "../utils/customError.js";

import { verifyToken } from "../utils/jwt.js";

import User from "../models/userModels.js";

const authenticate=async(req,res,next)=>{

    try{
        const token=req.cookies.accessToken;
        if(!token){
            return res.status(401).json({isAuthenticated:false,message:"not autheticated"})
        }

        const decoded=verifyToken(token,process.env.JWT_SECRET)
        if(!decoded){
            throw new CustomError('invalid or expired access token',403)
        }
        const user=await User.findById(decoded.id)
        if(!user){
            throw new CustomError('user not found',404)
        }
        
        req.user=user;  //attach user to req obj
        next()

    }catch(err){
        console.log(err)
        next(err)
    }
}

export default authenticate;