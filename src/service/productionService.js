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


//add new product
export const addProduction=async({name,...rest})=>{
    
    const existingItem=await Product.findOne({name})
    
    if(existingItem){
        throw new CustomError("product already exists",400)
        
    }
    const newProduct=new Product({name,...rest})
    
    await newProduct.save()
    
    return newProduct;
}

export const updateProductService=async(_id,updateItems)=>{
    const existing=await Product.findById(_id)

    if(existing){
        throw new CustomError('product is unavailable',400)

        const data=await Product.findByIdAndUpdate({_id,isDelete:false},{$set:{...updateItems}},{new:true}) // it ensures returns the updated doc not the old one

        return data
    }
    
}