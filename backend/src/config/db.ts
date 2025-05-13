import mongoose, { mongo } from "mongoose";


export const databaseConnection = async() =>{
    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI){
        throw new Error('MONGO_URI is not defined in environment variables')
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    }catch(error){
        console.error("Error connecting to the database",error);
        process.exit(1);
    }
}