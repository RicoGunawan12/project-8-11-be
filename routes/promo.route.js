import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createPromo, deletePromo, getPromo } from '../controllers/promo.controller.js';

const PromoRoute = express.Router();

PromoRoute.get('/', getPromo);
PromoRoute.post('/', adminMiddleware, createPromo);
PromoRoute.delete('/:id', adminMiddleware, deletePromo)

export default PromoRoute;