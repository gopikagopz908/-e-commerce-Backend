import CustomError from "../utils/customError.js";
import asyncHandler from "./asyncHandler.js";



const isAdmin=asyncHandler((req,res,next)=>{

    if(req.user && req.user.role === "admin"){
        
        next()// if the user is admin, allow the req to proceed
    }else{
        throw new CustomError("Access denied.Admin only",403)
    }
})

export default isAdmin