import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process on failure
  }
};


// In your db.js or database configuration file
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export const connectDB = async () => {
//   try {
//     const username = encodeURIComponent('taufeeqyouth');
//     const password = encodeURIComponent('Ensmtkmtk@123m');
    
//     const uri = `mongodb+srv://${username}:${password}@cluster0.cy2fdy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
//     const conn = await mongoose.connect(uri);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error}`);
//     process.exit(1);
//   }
// };
