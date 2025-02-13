import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
const app=express();
const port=process.env.PORT || 4000;
connectDB();
connectCloudinary();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)

app.get('/',(req,res)=>{
    res.send('api working great')
})

app.listen(port,()=>console.log("server started",port))