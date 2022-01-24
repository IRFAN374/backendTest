import mongoose from 'mongoose';


const connectDB = async(DB_URL)=>{
    try {
        await mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Successfully Connected to DB");
    } catch (error) {
        console.log("Error in Connection in DB::",error)
    }
}

export default connectDB;

// testing database

