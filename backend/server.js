import { app, server } from "./app.js";
import { connectDB } from "./data/database.js";
import {v2 as cloudinary} from 'cloudinary'

//Cloudinary config
cloudinary.config({
    secure: true,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    // timeout: 60000
})

//Connect Database
connectDB()

//Listen to the server
server.listen(8000,()=>{
  
    console.log('Server Started..')

})