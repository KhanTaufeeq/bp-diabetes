import { addSugar, getSugar } from "../controller/sugarController.js";
import { authMiddleware } from "../middlewares/authenticateMiddleware.js";
import express from 'express';

export const sugarRoutes = express.Router();

// user register route
sugarRoutes.post('/add', addSugar);

// user login route 
sugarRoutes.get('/get', authMiddleware, getSugar);
