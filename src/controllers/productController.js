import asyncHandler from "../Middlewares/asyncHandler.js";
import {  getAllProductService, getProductByIdService } from "../service/productionService.js";
import { STATUS } from "../utils/constant.js";
import CustomError from "../utils/customError.js";


export const getAllProducts=asyncHandler(async(req,res)=>{
    const {category,page=1,limit=10,search}=req.query;//properties are extracted from req.query and assigned to variable

    const{products,pagination}=await getAllProductService({
        category, 
        page:parseInt(page,10),
        limit:parseInt(limit,10),
        search,
    })
    if(products.length===0){
        res.status(200).json({
            status:STATUS.SUCCESS,
            message:'no products found'  //no products match the filter criteria
        })
    }else{
        res.status(200).json({
            status:STATUS.SUCCESS,
            products,
            pagination
        })
    }
});

//get single product

export const singleProduct=asyncHandler(async(req,res)=>{
    
    const{id}=req.params;
    const productOne=await getProductByIdService(id)

    if(!productOne){
        throw new CustomError("product not found",404)
    }
    res.status(200).json({
        status:STATUS.SUCCESS,
        productOne
    })
})