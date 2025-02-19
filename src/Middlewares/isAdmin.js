import CustomError from "../utils/customError.js";
import asyncHandler from "./asyncHandler.js";



const isAdmin=asyncHandler((req,res,next)=>{
    // if(!req.user||!req.user.isAdmin){
    //     throw new CustomError("Access denied.Admin only",403)
    // }
    // next()
    console.log(req.body)
    if(req.user && req.user.role === "admin"){
        
        next()
    }else{
        throw new CustomError("Access denied.Admin only",403)
    }
})

export default isAdmin