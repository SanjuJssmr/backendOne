import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import { errorHandler } from './middleware/errorHandler.js'
import { connectDb } from './config/dbConnection.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()
connectDb()
const serverApp = express()

const port = process.env.PORT



serverApp.use(express.json())

serverApp.use('/api/contacts',router)
serverApp.use('/api/users',userRouter)

serverApp.use(errorHandler)


  
serverApp.listen(port, () => {
    console.log(`server running on ${port}`);
})