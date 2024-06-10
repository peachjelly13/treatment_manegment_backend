import mongoose from 'mongoose'
import {DBNAME} from '../constants.js'

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DBNAME}`)
    }
    catch(error){
        console.log("MongoDB connection error",error)
        process.exit(1)

    }
}

export default connectDB;