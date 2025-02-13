import  express from 'express'
import { addOrder, showOrders } from '../controllers/orderController.js'
import authenticate from '../Middlewares/authMiddleware.js'


const router=express.Router()

router.post('/addorder',authenticate,addOrder)
router.get('/showorder',authenticate,showOrders)

export default router;