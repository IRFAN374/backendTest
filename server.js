import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/dbConnect.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotenv.config();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/api/user',userRoutes);
app.use('/api/order',orderRoutes);

app.get('/',(req,res)=>{
    console.log("I am connected");
    res.status(200).json({
        suceess: true,
        message: 'Successfully connected  DB'
    })
})

const PORT = process.env.PORT || 5000;
const start = async()=>{
    try {
        await connectDB(process.env.DB_URL);
        app.listen(PORT,()=>{
            console.log(`Server is Listening on: http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Somethig Error in Connection of DB:::")
    }
}

start();