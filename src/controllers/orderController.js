import asyncHandler from "../Middlewares/asyncHandler.js";
import { addOrderService, showOrderService } from "../service/orderService.js";
import { STATUS } from "../utils/constant.js";



export const addOrder=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const{name,address,paymentMethod}=req.body;
    await addOrderService(name,address,paymentMethod,userId)

    res.status(200).json({
        status:STATUS.SUCCESS,
        message:"order placed successfully"
    })
})

//get all order

export const showOrders=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const{page}=req.query;

    const{orders,pagination}=await showOrderService(userId,parseInt(page,10)||1,10)

    const message=orders.length?"orders retrieved successfully":"no orders found";
    res.status(200).json({
        status:STATUS.SUCCESS,
        message,
        orders,
        pagination
    })
})