import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();   // Load .env

// Connect to Mongo 
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.URL);    // URL from .env file
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); 
    }
};

export default connectToDatabase;