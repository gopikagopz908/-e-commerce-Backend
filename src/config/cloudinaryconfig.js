import {v2 as cloudinary} from 'cloudinary'
import{CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'

import dotenv from 'dotenv'

dotenv.config()
//cloundinary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//cloudinary storage setup

const storage=new CloudinaryStorage({
    cloudinary,
    params:{   
        folder:'prodcuts',
        allowedFormats:['jpg','jpeg','png','webp']
    }
})

const upload=multer({storage})
export {cloudinary,upload}