import express from 'express'
import { addToCart, decrementProductQuantity, getCart, incrementProductQuantity, removeFromCart } from '../controllers/cartController.js'
import authenticate from '../Middlewares/authMiddleware.js';



const router=express.Router()

router.post('/addToCart/:productId',authenticate,addToCart)
router.get('/getCart',authenticate,getCart)
router.delete('/removeFromCart/:productId',authenticate,removeFromCart)

//increment and decrement routes

router.put('/increment/:productId',authenticate,incrementProductQuantity)
router.put('/decrement/:productId',authenticate,decrementProductQuantity)

export default router;