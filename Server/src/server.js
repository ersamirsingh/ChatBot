import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import main from './Config/MongoDB.js'
import redisClient from './Config/RedisDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/AuthRoutes.js'
import chatRouter from './Routes/ChatRoutes.js'
import cors from 'cors'



app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/chat', chatRouter)



const InitializeConnection = async ()=>{

   try {
      
      await Promise.all([main(), redisClient.connect()])
      // await main()
      // await Promise.all([main()])
      console.log('DB connected successfully')
      
      app.listen(process.env.PORT || 3000, ()=>{
         console.log('Listening at PORT', process.env.PORT)
      })
      
   } catch (error) {
      console.log(error.message)
   }
}

InitializeConnection()