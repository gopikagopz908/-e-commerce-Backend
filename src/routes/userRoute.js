import express from 'express'
import { createValidator } from 'express-joi-validation'
import { loginUser, registerUser } from '../controllers/userController.js'
import { loginvalidation, signupvalidation } from '../validation/userValidation.js'
const router =express.Router()
const validator=createValidator({passError:true})


router.post('/signup',validator.body(signupvalidation),registerUser)
router.post('/login',validator.body(loginvalidation),loginUser)

export default router

