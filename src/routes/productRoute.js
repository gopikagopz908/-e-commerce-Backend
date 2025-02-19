import express from 'express'
import { addProduct, getAllProducts, singleProduct, updateProduct } from '../controllers/productController.js'
import authenticate from '../Middlewares/authMiddleware.js'
import isAdmin from '../Middlewares/isAdmin.js'

import { upload } from '../config/cloudinaryconfig.js'

const productRouter=express.Router()

//public routes

productRouter.get('',getAllProducts)
productRouter.get('/:id',singleProduct)

//admin route
productRouter.post('/addproduct',authenticate,isAdmin,upload.single('image'),addProduct)

productRouter.put('/updateProduct',authenticate,isAdmin,updateProduct)




export default productRouter;

