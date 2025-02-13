import express from 'express'
import { getAllProducts, singleProduct } from '../controllers/productController.js'
import authenticate from '../Middlewares/authMiddleware.js'

const productRouter=express.Router()

//public routes

productRouter.get('',getAllProducts)
productRouter.get('/:id',singleProduct)

export default productRouter;

