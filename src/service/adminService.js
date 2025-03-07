import User from "../models/userModels.js";
import CustomError from '../utils/customError.js'
import Order from '../models/orderModel.js'
import bcrypt from 'bcrypt'


export const userBlockService=async(id)=>{
    const userDetails=await User.findById(id)
    if(!userDetails){
        throw new CustomError("user not found",400)
    }
    userDetails.isBlocked=!userDetails.isBlocked; //If user found block anekil unblock akkum illel vice versa
    await userDetails.save()  //save to the db
    return userDetails;
}
//get all user-non-admin users
export const getAllUserServices=async(limit,skip)=>{
    const usersList=await User
    .find({role:{$ne:"admin"}})
    .skip(skip)
    .limit(limit)
    const totalUsers=await User.countDocuments({role:{$ne:"admin"}});
    return {usersList,totalUsers}
}

//specific user

export const singleUserService=async(id)=>{
    const users=await User.findById(id)
    if(!users)
        throw new CustomError("user not found",400)
    else return users;
}
//order list
// export const getAllOrderService=async(id)=>{
//   const orderdata=await Order.find()
//   console.log(orderdata)
//   return orderdata
// }
export const getAllOrderService = async () => {
    try {
      const orderData = await Order.find()
        .populate({
          path: "items.productId",
          model: "product",
          select: "name url price"
        });
  
      return orderData;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };
  
  

//get total revenue

export const getProfitService=async()=>{
    const result=await Order.aggregate([{$group:{_id:null,totalRevenue:{$sum:"$total"}}}])
    return result;
}


//total purchase

export const getTotalProductsPurchasedServices=async()=>{
    const result=await Order.aggregate([
        {$unwind:"$items"},  //unwind the products array to count each product separately
        {$group:{_id:null,totalProductsPurchased:{$sum:"$items.quantity"}}}
    ])
    return result;
}

export const loginAdminService=async(email,password)=>{
    const userData=await User.findOne({email})
    if(!userData){
        throw new CustomError("please create an account,email is invalid",400)
    }
    const isMatch=await bcrypt.compare(password,userData.password);   //compare user entered pwd and hashed pwd stored in the db
    if(!isMatch){
        throw new CustomError("invalid password/email,try again",400)
    }
    if(userData.isBlocked){
        throw new CustomError("your account is blocked",403)
    }
    if(userData.role==="user"){
         throw new CustomError("Admin not found",404)
    }

    return userData;
}