import { addSugar, getSugar,deleteSugar,editSugar } from "../controller/sugarController.js";
import { authMiddleware } from "../middlewares/authenticateMiddleware.js";
import express from 'express';

export const sugarRoutes = express.Router();

// add sugar route
sugarRoutes.post('/add', authMiddleware,addSugar);

// get sugar route 
sugarRoutes.get('/', authMiddleware, getSugar);

// delete sugar route
sugarRoutes.delete('/delete/:id', authMiddleware, deleteSugar);


// edit sugar route
sugarRoutes.put('/edit/:id', authMiddleware, editSugar);
