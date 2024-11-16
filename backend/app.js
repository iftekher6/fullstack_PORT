import express from 'express';
import {router} from './routes/work.routes.js';
import cors from 'cors'
import { companyRouter } from './routes/company.routes.js';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
// import {v2 as cloudinary} from 'cloudinary'
import cloudinary from 'cloudinary'
// import socket from 'socket.io';
import { Server } from 'socket.io';
import http from 'http'


dotenv.
    config({path : process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'})

  cloudinary.config({
    secure: true,
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    // timeout: 60000
})


  
export const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
      
      cb(null, 'public/videos')
    },
    filename : (req, file, cb) =>{
      cb(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
    } 
  
  })

// export const storage = multer.memoryStorage()

export const upload = multer ({ storage : storage})


export const app = express()
export const server = http.createServer(app)
export const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",  // URL of your React app
    methods: ["GET", "POST"]
}
})

const allowedOrigins = process.env.FRONTEND_URL

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}


app.use(credentials)
app.use(cors({
  origin : (origin, callback) =>{
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    }else{
      callback(new Error('Not Allowed By CORS'))
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,


}));

// app.use(cors())
app.use((req, res, next) => {
  res.setTimeout(600000, () => { // 600000 ms = 10 minutes
    console.log('Request has timed outsz.');
    res.sendStatus(408); // HTTP 408 Request Timeout
  });
  next();
});

app.use(express.static('public'));
app.use("/uploads", express.static("uploads"))
app.use(express.json());

app.use('/api/v1/work', upload.fields([{name: 'icon', maxCount: 10},{name:'video', 
  maxCount:10}, {name:'thumbnail',maxCount :10}]), router)
  
app.use('/api/v1/company', companyRouter)


app.get('/', (req, res)=>{
    res.send('Connection Successfull')
})

app.use(errorHandler)