import asyncHandler from "../Middlewares/asyncHandler.js"
import { loginuser, userRegister } from "../service/userService.js";
import { STATUS } from "../utils/constant.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";



export const registerUser=asyncHandler(async(req,res)=>{
    const data=req.body;
    const createuser=await userRegister(data)
    res.status(201).json({
        status:STATUS.SUCCESS,
        message:`user registered successfully`,
        user:{
        id:createuser._id,
            username:createuser.username,
            email:createuser.email,
            

        }
    })


})


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await loginuser(email,password)

    const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set cookies in the response  store token in cookies

  res
    .cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000, path: '/' })   //res.cookie(name, value, options(expiration, security))
    .cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })

    .status(200).json({
      status: STATUS.SUCCESS,
      message: 'user logged in successfull',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },accessToken,refreshToken
    }
  )
})

