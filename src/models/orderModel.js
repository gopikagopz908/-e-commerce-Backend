import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            productId:{
        type:mongoose.Types.ObjectId,
        ref:'product',
        required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }
    ],
   
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true
    },
    razorpayOrderId:{
        type:String,
    },
    total:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        
    },
    phoneNumber:{
        type:Number,
    },
    state:{
        type:String,
    },
    pincode:{
        type:Number,
    }


}    
,{
    timestamps:true,
}
)
const Order=mongoose.model('Order',orderSchema)

export default Order;