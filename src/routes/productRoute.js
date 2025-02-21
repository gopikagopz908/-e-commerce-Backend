import express from 'express'
import { addProduct, deleteProduct, getAllProducts, singleProduct, updateProduct } from '../controllers/productController.js'
import authenticate from '../Middlewares/authMiddleware.js'
import isAdmin from '../Middlewares/isAdmin.js'

import { upload } from '../config/cloudinaryconfig.js'

const productRouter=express.Router()

//public routes

productRouter.get('',getAllProducts)
productRouter.get('/:id',singleProduct)

//admin route
productRouter.post('/addproduct',authenticate,isAdmin,upload.single('image'),addProduct)

productRouter.patch('/updateProduct',authenticate,isAdmin,upload.single('image'),updateProduct)

productRouter.patch('/deleteProduct/:id',authenticate,isAdmin,deleteProduct)




export default productRouter;

