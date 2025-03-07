import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/dbconfig.js'
import userRouter from './src/routes/userRoute.js'
import productRouter from './src/routes/productRoute.js'
import cartRouter from './src/routes/cartRoute.js'
import wishlistRouter from './src/routes/wishlistRoute.js'
import orderRouter from './src/routes/orderRouter.js'

import adminRouter from './src/routes/adminRouter.js'
// import bodyParser from "body-parser";
import errorHandler from './src/Middlewares/errorhandler.js';
import { refreshToken } from './src/controllers/userController.js';


dotenv.config();
const app=express()
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies/auth headers
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/order',orderRouter)

//admin routes
app.use('/api/admin',adminRouter)


app.use(errorHandler)
const PORT = process.env.PORT;
 connectDB();

app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    
    
   
    
   