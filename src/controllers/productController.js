import asyncHandler from "../Middlewares/asyncHandler.js";
import {  addProduction, getAllProductService, getProductByIdService } from "../service/productionService.js";
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


//add product

export const addProduct=asyncHandler(async(req,res)=>{
    
    const{name,...rest}=req.body;
    let url;
    
    if(req.file&&req.file.path){  //it checks if the image file uploaded
        
        url=req.file.path; //to save the product data/image url
       
        
    }else{
        return res.status(400).json({
            success:STATUS.ERROR,
            message:'image upload failed.please include a valid image file'
        })
    }
    //get image path if file exists

    const data=await addProduction({name,url,...rest})  //to save the product data services

    res.status(201).json({
        success:STATUS.SUCCESS,
        message:"product added successfully",
        data
    })
})

//update product

export const updateProduct=asyncHandler(async(req,res)=>{
    const{_id,...updateItems}=req.body
    if(!_id){
        throw new CustomError('product is not found')
    }
    const updateProduct=await updateProductService(_id,updateItems)
    res.status(200).json({
        status:STATUS.SUCCESS,
        message:'product updated successfully',
        updateProduct
    })
})