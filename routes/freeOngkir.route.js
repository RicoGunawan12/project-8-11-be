import express from 'express';
import { getFreeOngkir, updateFreeOngkir, updateFreeOngkirStatus } from '../controllers/freeOngkir.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';

const FreeOngkirRoute = express.Router();

FreeOngkirRoute.get('/', getFreeOngkir);
FreeOngkirRoute.put('/status/:id', adminMiddleware, updateFreeOngkirStatus);
FreeOngkirRoute.put('/:id', adminMiddleware, updateFreeOngkir);

export default FreeOngkirRoute;
