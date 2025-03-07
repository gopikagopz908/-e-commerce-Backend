import asyncHandler from "../Middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import { addOrderService, showOrderService, verifyPaymentService } from "../service/orderService.js";
import { STATUS } from "../utils/constant.js";



export const addOrder=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const{name,address,paymentMethod,items,date,total,phoneNumber,state,pincode}=req.body;
  
   const {order,razorpayOrderId} =await addOrderService(name,address,paymentMethod,userId,items,date,total,phoneNumber,state,pincode)

    res.status(200).json({
        status:STATUS.SUCCESS,
        message:"order placed successfully",
        order,
        razorpayOrderId
    })
})
export const verifyPayment = asyncHandler(async (req, res) => {
    const { paymentId, orderId } = req.body;
    try {
      const isPaymentVerified = await verifyPaymentService(paymentId, orderId);
  
      if (isPaymentVerified) {
        res.status(200).json({
          message: "Payment verified successfully",
        });
      } else {
        throw new CustomError("Payment verification failed", 400);
      }
    } catch (error) {
      console.error("Error in payment verification endpoint:", error);
      res.status(error.status || 500).json({
        message: "Something went wrong during payment verification.",
      });
    }
  });
  

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


