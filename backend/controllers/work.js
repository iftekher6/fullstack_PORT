
import {  Work } from "../models/work.model.js"
import { Client } from "../models/client.model.js"
// import {v2 as cloudinary} from 'cloudinary'
import {v2 as cloudinary} from 'cloudinary'
// import {v2 as cloudinary} 'cloudinary'
import fs from 'fs'
import secure_urls from "../utils/helpers.js"
import { io } from "../app.js"


export const workDetails = async(req, res)=>{
    try {

        const {client,title,date,description,
            copy,brief,tools,keywords,contentType} 
            = req.body
           
                     
            const uploadToCloudinary =(file)=>{
                return new Promise(
                         (resolve,reject) => {
                           
                             //  cloudinary.uploader.upload_large
                             const uploadStream = cloudinary.uploader.upload_large(file,
                                 {folder : "video-upload", resource_type: "auto", chunk_size: 6000000}, 
                                 (error, result) => {
                                     if(error) reject (error)
                                       else resolve(result )

                      }
                     )
                       
                       // uploadStream.end(file)
                   
                   
               }
             )
        }
        
            const toolsArray = tools? tools.split(',') : []
            const keywordsArray = keywords? keywords.split(',') : [] 
            console.log(toolsArray, "tools")
        
            const thumbnailFiles = req.files['thumbnail'] || []
            const videoFiles = req.files['video'] || []
            const iconFile = req.files['icon'] ? req.files['icon'][0] : null 
            

    const totalFiles = thumbnailFiles.length + videoFiles.length;
    let uploadedFiles = 0;
    let progress = 0;

    // Function to Emit Progress
    const emitProgress = (increment) => {
      progress += increment;
      console.log("Progress emitted:", progress);  // Log to verify progress
      io.emit('serverProgress', progress);
    };


            let clientName = await Client.findOne({client})
            //  console.log(clientName.icon)
               if(!clientName ) {
               const clientIcon = iconFile ? await uploadToCloudinary(iconFile.path) : null
               // console.log(icoon, 'icoon')
                 
               clientName = await Client.create({client : client.charAt(0).toUpperCase() + client.slice(1).toLowerCase() ,icon : clientIcon?.secure_url })
             }

                 // Upload Thumbnails
    const uploadThumbnails = thumbnailFiles.map(async (file) => {
        try {
          const result = await uploadToCloudinary(file.path);
          uploadedFiles += 1;
          emitProgress((50 / totalFiles)); // Allocate 50% for file uploads
          return result.secure_url;
        } catch (error) {
          console.error('Thumbnail upload error:', error);
          return { error: error.message };
        }
      });
  
      // Upload Videos
      const uploadVideos = videoFiles.map(async (file) => {
        try {
          const result = await uploadToCloudinary(file.path);
          uploadedFiles += 1;
          emitProgress((50 / totalFiles)); // Allocate 50% for file uploads
          return result.secure_url;
        } catch (error) {
          console.error('Video upload error:', error);
          return { error: error.message };
        }
      });
  
      // Wait for All Uploads to Complete
      const thumbnailUploads = await Promise.all(uploadThumbnails);
      const videoUploads = await Promise.all(uploadVideos);
  
      // Filter Successful and Failed Uploads
      const successfulThumbnails = thumbnailUploads.filter(upload => !upload.error);
      const failedThumbnails = thumbnailUploads.filter(upload => upload.error);
      const successfulVideos = videoUploads.filter(upload => !upload.error);
      const failedVideos = videoUploads.filter(upload => upload.error);
  
      // Emit Progress Before Saving to DB
      emitProgress(0); // Reset progress for DB operations
  
  
            //  console.log(thumbnailFile ,':thumbnailfile')
        
         
   
    //      // Upload thumbnails and videos
    //            const uploadFiles = async (files) => {
    //               return Promise.all(files.map(file => uploadToCloudinary(file.path).catch(error => ({ error }))));
    //                                                 };
             

                       
    //     const thumbnailUploads = await uploadFiles(thumbnailFiles);
    //     const videoUploads = await uploadFiles(videoFiles);

    //    // Filter successful and failed uploads
    //      const successfulThumbnails = thumbnailUploads.filter(upload => !upload.error).map(upload => upload.secure_url);
    //     const successfulVideos = videoUploads.filter(upload => !upload.error).map(upload => upload.secure_url);
    //     const failedThumbnails = thumbnailUploads.filter(upload => upload.error);
    //     const failedVideos = videoUploads.filter(upload => upload.error);
        
        

         const createWork = await Work.
                           create({client : clientName, title,date, description,copy,
                         brief,tools :toolsArray , keywords : keywordsArray, contentType , video: successfulVideos , thumbnail : successfulThumbnails })

        //  fs.unlinkSync(videoFile.path)
        //  fs.unlinkSync(thumbnailFile.path)
        console.log('upload success')
            // Emit Final Progress
    emitProgress(50); // Allocate remaining 50% for DB operations
    io.emit('serverProgress', 100);

         res.status(201).json({message: 'Post request successful', payload : createWork})

       
    } catch (error) {
        // console.log(error)
        console.error('Error in workDetails function:', error);
        res.status(500).json({ error: 'An error occurred during the operation' });
    }
}





export const deleteWorks=async(req,res)=>{
    const deletes = await Work.deleteMany()

    res.status(200).json('success')

}

export const getDetails = async(req, res)=>{
    try {
        //filter using query
        const {year} = req.query
       
        const query = {}
       
        if(year){
            query.date = {
                $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                $lt: new Date(`${year}-12-31T23:59:59.999Z`)
         }
        }

        //implement pagination
        const page = req.query.page || 1
        const limit = req.query.limit || 3
        // console.log(page, limit) 
        const skip = (page - 1) * limit
        
        const totalProjects = await Work.countDocuments()
        const hasMore = page * limit < totalProjects

        const getDetails = await Work.find(query)
                                     .sort({createdAt: -1})
                                     .populate('client')
                                     .limit(limit)
                                     .skip(skip)
        

        res.status(200).json({companies :getDetails, hasMore : hasMore})
    } catch (error) {
        console.log(error)
    }
}

export const getDetailsbyID = async (req,res)=>{
     const {id} = req.params
    try {
       const workByID = await Work.findById(id)
       res.status(200).json(workByID)
    } catch (error) {
        console.log(error)
    }
}








