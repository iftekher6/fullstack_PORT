import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
    
    client :{
        type: String,
        required: true,
        unique : true,
    },
    icon : {
        type: String
    }
  
    
  
}, { timestamps : true })

export const Client = mongoose.model('Client', clientSchema)