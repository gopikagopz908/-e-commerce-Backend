import Cart from "../models/cartModel.js"
import CustomError from "../utils/customError.js"
import Product from "../models/productModels.js"

//addtocart and checks the stock


export const addProductToCart=async(productId,userId)=>{
    const existingProduct=await Product.findById(productId) //product in the db
    if(!existingProduct){
        throw new CustomError('product is not found',401)


    }
    let cart=await Cart.findOne({user:userId})//checks user has already cart
    if(!cart){
        cart=new Cart({user:userId,product:[]})
    }

    const existingIndex=cart.products.findIndex((item)=>item.product.toString()===productId)
    if(existingIndex>-1){
        const currentQuantity=cart.products[existingIndex].quantity;
        if(currentQuantity+1>existingProduct.stock){
            throw new CustomError('you cannot add the product to the cart.insufficient stock.',400)
        }
        cart.products[existingIndex].quantity+=1
        await cart.save()
        return;
    }else{
        cart.products.push({product:productId,quantity:1}) //no product ,added new product so the product is incremented
    }
    await cart.save()
}

export const getUserCart=async(userId)=>{
    const cart=await Cart.findOne({user:userId}).populate('products.product');
    return cart
}

export const removeProductFromCart=async(userId,ProductId)=>{
    const result=await Cart.updateOne(
        {user:userId},
        {$pull:{products:{product:ProductId}}} //removes the doc
    )
    if(result.modifiedCount===0){
        throw new CustomError("failed to remove the product from the cart",500)
    }
}