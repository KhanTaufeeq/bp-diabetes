import express from 'express';
import { addBP, getBP } from '../controller/bpController.js';
import { authMiddleware } from '../middlewares/authenticateMiddleware.js';


export const bpRoutes = express.Router();


bpRoutes.post('/add', authMiddleware, addBP);

bpRoutes.get('/', authMiddleware, getBP);
