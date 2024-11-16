import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_CONNECTION,
        {connectTimeoutMS:  30000, }
    )
              .then(()=> console.log('Database Connected'))
              .catch((err)=> console.log(err))
}