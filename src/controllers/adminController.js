


import asyncHandler from "../Middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import { getAllOrderService, getAllUserServices, getProfitService, getTotalProductsPurchasedServices, loginAdminService, singleUserService, userBlockService } from "../service/adminService.js";
import { STATUS } from "../utils/constant.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

//user blocking

export const userBlock=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const user=await userBlockService(id)
  
    const message=user.isBlocked?"User is blocked":"User is unblocked";
    res.json({
        status:STATUS.SUCCESS,
        message
    })
    
    
})

//all users 
export const allUser=asyncHandler(async(req,res)=>{
    const{page}=req.query; //eg:users?page=2
    const pageInt=parseInt(page,10)||1  //converts page from string to number if page is missing default to 1
    const limit=10
    const skip=(pageInt-1)*limit
    const{usersList,totalUsers}=await getAllUserServices(limit,skip)

    const message=usersList.length?"User list":"no user found"
    const totalPages=Math.ceil(totalUsers/limit)

    res.json({
        status:STATUS.SUCCESS,
        message,
        data:{
            users:usersList,
            totalUsers,
            totalPages,
            curreentPage:pageInt,
        }
    })
})

//single user

export const singleUser=asyncHandler(async(req,res)=>{
    const{id}=req.params
    const user=await singleUserService(id)
    res.json({
        status:STATUS.SUCCESS,
        message:"user details...",user
    })
})

// getallorder list

export const orderDetails=asyncHandler(async(req,res)=>{
    const orderList=await getAllOrderService()
    res.json({
        status:STATUS.SUCCESS,
        message:"order list....",
        order:orderList,

    })
})

//user count

export const userCount=asyncHandler(async(req,res)=>{
    const{totalUsers}=await getAllUserServices(10,1)
    const message=totalUsers?"User list":"no users found"
    res.json({

        
        status:STATUS.SUCCESS,
        message:message,
        totalUsers
    })
})

//total revenue

export const Profit=asyncHandler(async(req,res)=>{
    const totalprofit=await getProfitService()
    const total=totalprofit.length>0?totalprofit[0].totalRevenue:0
    res.json({
        status:STATUS.SUCCESS,
        message:"total revenue",
        total
    })
})
//get total products purchased
export const totalProductsPurchased=asyncHandler(async(req,res)=>{
    const totalProducts=await getTotalProductsPurchasedServices()

    const total=totalProducts.length>0?totalProducts[0].totalProductsPurchased:0;
    res.json({
        status:STATUS.SUCCESS,
        message:"total products purchased",
        total
    })

})

export const singleOrder=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const order=await Order.findOne({user:id})
    
        .populate({
            path: 'items.productId',

          });
    
    

    
    res.status(200).json({
      status:STATUS.SUCCESS,
      message:"order viewed successfully",
      order,

  
    })
    
  })
  export const loginAdmin=asyncHandler(async(req,res)=>{
      const {email,password}=req.body;
      const admin=await loginAdminService(email,password)
  
      const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

  
    // Set cookies in the response  store token in cookies
  
    res
      .cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 3 * 24 * 60 * 60 * 1000, path: '/' })   //res.cookie(name, value, options(expiration, security))
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
  
      .status(200).json({
        status: STATUS.SUCCESS,
        message: 'admin logged in successfull',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role:admin.role
        },accessToken,refreshToken
      }
    )
  })
  