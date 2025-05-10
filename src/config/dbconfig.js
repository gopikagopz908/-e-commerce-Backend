import mongoose from "mongoose";

const dbConnect=async()=>{
    try {
        console.log(process.env.DB_URL)
await mongoose.connect(process.env.DB_URL)
        console.log('Db connected')
    } catch (error) {
       console.log(error,"db connection error") 
    }
}

export default dbConnect;