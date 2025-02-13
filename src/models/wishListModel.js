import mongoose from "mongoose";


const wishlistSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    wishlist:[
        {
            type:mongoose.Types.ObjectId,
            ref:'product',
        }
    ]
})

const wishlist=mongoose.model('Wishlist',wishlistSchema)
export default wishlist