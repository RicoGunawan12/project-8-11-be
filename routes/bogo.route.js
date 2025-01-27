import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createBogo, createBogoDetail, deleteBogo, getBogo, getBogoById, updateBogo } from '../controllers/bogo.controller.js';

const BogoRoute = express.Router();

BogoRoute.get('/', getBogo);
BogoRoute.post('/', adminMiddleware, createBogo);
BogoRoute.delete('/:id', adminMiddleware, deleteBogo)
BogoRoute.get('/:id', adminMiddleware, getBogoById)
BogoRoute.put('/:id', adminMiddleware, updateBogo)

export default BogoRoute;