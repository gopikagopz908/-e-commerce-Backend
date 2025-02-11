import Product from "../models/productModels.js";
import CustomError from "../utils/customError.js";

// //add a new product
// export const addProductService=async({name,...rest})=>{
//     const existingItem=await Product.findOne({name});

//     if(existingItem){
//         throw new CustomError("product already exists.",400)
//     }

//     const newProduct=new Product({name,...rest}); //new product means creating a new instance of the product

//     await newProduct.save();
//     return newProduct;
// }

//get all products

export const getAllProductService=async({category,page=1,limit=10,search})=>{
    const query={isDelete:false}

    if(category){
        query.category={$regex:`^${category}$`,$options:"i"}
    }
    if(search){
        query.$or=[
            {name:{$regex:search,$options:"i"}},
            {category:{$regex:search,$options:"i"}},
        ]
    }


const skip=(page-1)*limit;//calculates  howmany documents to skip
const total=await Product.countDocuments(query)//total product count

const products=await Product.find(query).skip(skip).limit(limit);
return{
    products,
    pagination:{
        page,
        limit,
        totalPages:Math.ceil(total/limit),
    },
}
}

//get product by id single product

export const getProductByIdService=async(id)=>{
    const productDetails=await Product.findById(id);
    if(!productDetails){
        throw new CustomError('product not found',404)
    }
    return productDetails
}