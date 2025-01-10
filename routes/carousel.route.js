import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { uploadCarousel } from '../utils/uploader.js';
import { createCarousel, deleteCarousel, getCarousel, updateCarousel } from '../controllers/carousel.controller.js';

const CarouselRoute = express.Router();

CarouselRoute.get('/', getCarousel);
CarouselRoute.post(
    '/',
    adminMiddleware,
    uploadCarousel.fields([
        { name: 'carouselImage', maxCount: 20 },
        { name: 'carouselImageMobile', maxCount: 20 },
    ]),
    createCarousel
)
CarouselRoute.delete('/:id', adminMiddleware, deleteCarousel);
CarouselRoute.put('/:id',
    adminMiddleware,
    uploadCarousel.fields([
        { name: 'carouselImage', maxCount: 20 },
        { name: 'carouselImageMobile', maxCount: 20 }
    ]),
    updateCarousel
);

export default CarouselRoute;