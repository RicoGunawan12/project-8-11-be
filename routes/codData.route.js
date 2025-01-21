import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getCODData, updateCODData } from '../controllers/codData.controller.js';

const CODRoute = express.Router();

CODRoute.get('/', getCODData);
CODRoute.put('/:id', adminMiddleware, updateCODData);

export default CODRoute;
