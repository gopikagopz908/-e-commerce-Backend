import asyncHandler from "../Middlewares/asyncHandler.js";
import { addProductToWishlist } from "../service/wishListService.js";
import { STATUS } from "../utils/constant.js";



export const addToWishlist=asyncHandler(async(req,res)=>{
    const{productId}=req.params;
    const userId=req.user.id;
    const wishListProduct=await addProductToWishlist(productId,userId)
    if(wishListProduct){
        res.status(200).json({
            status:STATUS.SUCCESS,
            message:"product added  to wishlist successfully"
        })
    }
})
//remove wishlist
export const removeSingleWishlist=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const{id}=req.params;  // product id
    await removeWishlistService(userId,id)
    res.json({
        status:STATUS.SUCCESS,
        message:"product removed from favourites successfully"
    })

})
//get all wishlist

export const getAllWishlist=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const userWishlist=await getAllWishlistService(userId)
    if(!userWishlist||userWishlist.wishlist.length===0) {
        res.status(200).json({
            status:STATUS.SUCCESS,
            message:'wishlist is empty'
        })
    }else{
        res.status(200).json({
            status:STATUS.SUCCESS,
            message:
        })
    }
})