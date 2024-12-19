import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createPromo, deletePromo, getPromo } from '../controllers/promo.controller.js';
import { getBanner, updateBanner } from '../controllers/banner.controller.js';
import { uploadBanner } from '../utils/uploader.js';

const BannerRoute = express.Router();

BannerRoute.get('/', getBanner);
BannerRoute.put('/', 
    adminMiddleware, 
    uploadBanner.fields([
        { name: 'image', maxCount: 20 }
    ]), 
    updateBanner
);

export default BannerRoute;