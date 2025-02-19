import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
   
    url:{
        type:String,
        required:true
    },
    category: {
        type: String,
        required: true
      },
    description:{
        type:String,
        required:true
    },
    isDelete:{   //delete flag instead of removing a db ,mark it as deleted 
        type:Boolean,
        default:false
    }

});

const Product=mongoose.model('product',productSchema)

export default Product;