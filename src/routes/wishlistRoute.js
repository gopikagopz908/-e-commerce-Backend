import { addToWishlist, removeSingleWishlist } from "../controllers/wishlistController.js"
import authenticate from "../Middlewares/authMiddleware.js"

import express from 'express'


const router=express.Router()

router.post('/wishlist/:productId',authenticate,addToWishlist)
router.delete('/wishlist/:productId',authenticate,removeSingleWishlist)

export default router