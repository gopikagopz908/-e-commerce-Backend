import Product from "../models/productModels.js";
import wishlist from "../models/wishListModel.js";
import CustomError from "../utils/customError.js";


export const addProductToWishlist=async(ProductId,userId)=>{
    const existingProduct=await Product.findById(ProductId);

    if(!existingProduct){
        throw new CustomError('product not available',404)
    }
    let userWishlist=await wishlist.findOne({user:userId})
    if(!userWishlist){
        userWishlist=new wishlist({user:userId,wishlist:[]})
    }
    const productInWishlist=userWishlist.wishlist.find((item)=>item.toString()===ProductId.toString())
    if(productInWishlist){
        throw new CustomError('product is already in the wishlist',400)
    }
    userWishlist.wishlist.push(ProductId) //add the product to wishlist
    await userWishlist.save()
    return userWishlist

}
export const removeWishlistService=async(userId,productId)=>{
    const updateResult=await wishlist.updateOne(
        {user:userId},
        {$pull:{wishlist:productId}}
    );
    if(updateResult.matchedCount===0){
        throw new CustomError('no wishlists found for the user',404)
    }
    if(updateResult.modifiedCount===0){
        throw new CustomError('product not found in users wishlists',404)
    }
}