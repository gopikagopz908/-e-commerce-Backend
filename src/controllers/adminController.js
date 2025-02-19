


import asyncHandler from "../Middlewares/asyncHandler.js";
import { getAllOrderService, getAllUserServices, getTotalProductsPurchasedServices, singleUserService, userBlockService } from "../service/adminService.js";
import { STATUS } from "../utils/constant.js";

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
    const{page}=req.query;
    const pageInt=parseInt(page,10)||1
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
        message:"order list....",order:orderList
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