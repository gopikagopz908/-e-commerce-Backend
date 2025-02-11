import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/dbconfig.js';
import userRouter from './src/routes/userRoute.js'
import productRouter from './src/routes/productRoute.js'
import cartRouter from './src/routes/cartRoute.js'
import wishlistRouter from './src/routes/wishlistRoute.js'
import errorHandler from './src/Middlewares/errorhandler.js';

dotenv.config();
const app=express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/wishlist',wishlistRouter)



// app.use(errorHandler)
const PORT = process.env.PORT || 5000;
 connectDB();

app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    
    
   
    
   