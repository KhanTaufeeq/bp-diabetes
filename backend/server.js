import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './router/userRouter.js';
import { sugarRoutes } from './router/sugarRouter.js';
import { bpRoutes } from './router/bpRouter.js';
import { connectDB } from './config/db.js';

dotenv.config();    // load environment variables

const app = express();

// Middleware
app.use(express.json())  // parse json request
app.use(cors())  // enable cors

connectDB();

// Route
app.use('/api/user', userRoutes);
app.use('/api/sugar', sugarRoutes);
app.use('/api/bp', bpRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
