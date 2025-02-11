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
            ref:'Product',
        }
    ]
})

const wishlist=mongoose.model('wishlist',wishlistSchema)
export default wishlist