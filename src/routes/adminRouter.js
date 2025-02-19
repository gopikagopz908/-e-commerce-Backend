import express from 'express'
import authenticate from '../Middlewares/authMiddleware.js'
import isAdmin from '../Middlewares/isAdmin.js'
import { allUser, orderDetails, Profit, singleUser, totalProductsPurchased, userBlock } from '../controllers/adminController.js'

const  router=express.Router()

router.get('/allusers',authenticate,isAdmin,allUser)

router.put('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/singleuser/:id',authenticate,isAdmin,singleUser)
router.get('/orders',authenticate,isAdmin,orderDetails)

router.get('/profit',authenticate,isAdmin,Profit)
router.get('/totalpurchase',authenticate,isAdmin,totalProductsPurchased)


export default router