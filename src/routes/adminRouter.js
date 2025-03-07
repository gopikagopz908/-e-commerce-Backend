import express from 'express'
import authenticate from '../Middlewares/authMiddleware.js'
import isAdmin from '../Middlewares/isAdmin.js'
import { allUser, loginAdmin, orderDetails, Profit, singleOrder, singleUser, totalProductsPurchased, userBlock, userCount } from '../controllers/adminController.js'
import { loginvalidation } from '../validation/userValidation.js'
import { createValidator } from 'express-joi-validation'
const validator=createValidator({passError:true})

const  router=express.Router()

router.get('/allusers',authenticate,isAdmin,allUser)
// router.post('/login',authenticate,isAdmin,allUser)

router.post('/login',validator.body(loginvalidation),loginAdmin)
router.put('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/singleuser/:id',authenticate,isAdmin,singleUser)
router.get('/orders',authenticate,isAdmin,orderDetails)

router.get('/singleOrder/:id',authenticate,isAdmin,singleOrder)

router.get('/profit',authenticate,isAdmin,Profit)
router.get('/totalpurchase',authenticate,isAdmin,totalProductsPurchased)

router.get('/usersCount',authenticate,isAdmin,userCount)


export default router