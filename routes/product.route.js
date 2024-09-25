import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controller.js';
import { userMiddleware, adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
// ProductRoute.post('/', adminMiddleware, createProduct);
ProductRoute.post('/', 
    userMiddleware, 
    upload.fields([
        { name: 'product_image', maxCount: 10 }
    ]), 
    createProduct
);

export default ProductRoute;
