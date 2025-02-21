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
        ref:'Product',
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
    total:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
}
)
const Order=mongoose.model('Order',orderSchema)

export default Order;