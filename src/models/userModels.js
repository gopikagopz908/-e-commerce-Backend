import mongoose from 'mongoose';

// import { passwrdvalidator } from '../validation/userValidation.js';




const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique:true,
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    },
    password:{
        type:String,
        required:true,
        // validate:passwrdvalidator
    },
    name:{
        type:String,
        required:true
    }


},{
    timestamps: true,
  }
);


const User=mongoose.model('User',userSchema);

export default User;