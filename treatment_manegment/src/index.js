import dotenv from 'dotenv'
import connectDB from './db/index.js'
import app from './app.js'

dotenv.config({path:'./env'})

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR:",error)
    })
    app.listen(process.env.PORT || 8000, ()=>{ 
        console.log(`app is listening on port:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('MongoDB connection error',err)
})