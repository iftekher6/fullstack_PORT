import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type : String,
        // required : true,
    },
    description : {
        type: String
    },
    brief : {
        type: String,
    },
    copy: String,
    keywords: [String],
    // date: Date,
    tools: [String],
    date: {
        type: Date,
        // default: Date.now,
      },
    video : [String],
    thumbnail : [String],
    
    contentType: String,
    client : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Client',
        // required : true
    },
    icon: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Client'
    }
    
},{ timestamps : true })

export const Work = mongoose.model('Work', schema)