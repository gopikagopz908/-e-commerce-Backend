// export const passwrdvalidator=[{
//     validator:function(password){
//         return password.length>=8;
//     },
//     message:"password must be at least 8 characters long."
// },{
//     validator:function(password){
//         return/[A-Z]/.test(password);
//     },
//     message:"password must contain at least one uppercase letter"
// },{
//     validator:function(password){
//         return/[0-9]/.test(password);
//     },
//     message:"password must contain at least one number"
    
// }
// ];

import Joi from 'joi';

export const signupvalidation=Joi.object({
    name: Joi.string().required().min(3).max(25),
    username: Joi.string().required().min(3).max(25),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})
 export const loginvalidation=Joi.object({  
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
})