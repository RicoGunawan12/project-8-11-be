import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createPromo, getPromo } from '../controllers/promo.controller.js';

const PromoRoute = express.Router();

PromoRoute.get('/', getPromo);
PromoRoute.post('/', adminMiddleware, createPromo);

export default PromoRoute;