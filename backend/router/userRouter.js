import { registerUser, loginUser, logoutUser, createAdmin } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/authenticateMiddleware.js";
import express from 'express';

export const userRoutes = express.Router();

// user register route
userRoutes.post('/register', registerUser);

// user login route 
userRoutes.post('/login', loginUser);

// user logout route
userRoutes.post('/logout', logoutUser);

// admin user route
userRoutes.post('/admin', createAdmin);

