import express from 'express';
import { addBP, getBP, editBP, deleteBP } from '../controller/bpController.js';
import { authMiddleware } from '../middlewares/authenticateMiddleware.js';


export const bpRoutes = express.Router();


bpRoutes.post('/add', authMiddleware, addBP);

bpRoutes.get('/', authMiddleware, getBP);

bpRoutes.put('/edit/:id', authMiddleware, editBP);

bpRoutes.delete('/delete/:id', authMiddleware, deleteBP);
