import Product from "../models/productModels.js";
import CustomError from "../utils/customError.js";


//get all products

export const getAllProductService=async({category,page=1,limit=10,search})=>{  //sets default values for pagination
    const query={isDelete:false}

    if(category){  //category filtering
        query.category={$regex:`^${category}$`,$options:"i"}  //mongodbs regular exprsn
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