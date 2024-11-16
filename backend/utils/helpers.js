async function secure_urls(files,cloudinary){
    // if (!files || !Array.isArray(files)) return null;
   try {
    const cloudinaryURL_Thumbnail = files.map(async (file)=> {
       
        const response = await cloudinary(file.path) 
        
        return response
    })

    const thumbnailPromisify = await Promise.all(cloudinaryURL_Thumbnail)
    const thumbnail_secureURLS = thumbnailPromisify.map(url=> url.secure_url)
    
    return thumbnail_secureURLS
    
   } catch (error) {
   
    // Promise.reject(error)
    console.log(error)
   
}
}
export default secure_urls;
