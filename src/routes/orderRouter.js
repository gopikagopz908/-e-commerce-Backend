import  express from 'express'
import { addOrder, showOrders, verifyPayment } from '../controllers/orderController.js'
import authenticate from '../Middlewares/authMiddleware.js'


const router=express.Router()

router.post('/addorder',authenticate,addOrder)
router.get('/showorder',authenticate,showOrders)
router.post("/verifypayment",authenticate,verifyPayment)
export default router;