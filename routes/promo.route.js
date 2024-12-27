import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createPromo, deletePromo, getPromo, getPromoById, updatePromo } from '../controllers/promo.controller.js';

const PromoRoute = express.Router();

PromoRoute.get('/', getPromo);
PromoRoute.post('/', adminMiddleware, createPromo);
PromoRoute.delete('/:id', adminMiddleware, deletePromo)
PromoRoute.get('/:id', adminMiddleware, getPromoById)
PromoRoute.put('/:id', adminMiddleware, updatePromo)

export default PromoRoute;