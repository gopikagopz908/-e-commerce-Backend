import User from "../models/userModels.js";
import CustomError from '../utils/customError.js'
import Order from '../models/userModels.js'

export const userBlockService=async(id)=>{
    const userDetails=await User.findById(id)
    if(!userDetails){
        throw new CustomError("user not found",400)
    }
    userDetails.isBlocked=!userDetails.isBlocked; //If user found block anekil unblock akkum illel vice versa
    await userDetails.save()
    return userDetails;
}
//get all user-non-admin users
export const getAllUserServices=async(limit,skip)=>{
    const usersList=await User
    .find({isAdmin:{$ne:true}})
    .skip(skip)
    .limit(limit)
    const totalUsers=await User.countDocuments({isAdmin:{$ne:true}});
    return {usersList,totalUsers}
}

//specific user

export const singleUserService=async(id)=>{
    const users=await User.findById(id)
    if(!users)
        throw CustomError("user not found",400)
    else return users;
}
//order list
export const getAllOrderService=async(id)=>{
  const orderdata=await Order.find();
  return orderdata
}

//get total revenue

export const getProfitService=async()=>{
    const result=await Order.aggregate([{$group:{_id:null,totalRevenue:{$sum:"$total"}}}])
    return result;
}


export const getTotalProductsPurchasedServices=async()=>{
    const result=await Order.aggregate([
        {$unwind:"$items"},  //unwind the products array to count each product separately
        {$group:{_id:null,totalProductsPurchased:{$sum:"$items.quantity"}}}
    ])
    return result;
}