import express from 'express';
import { createProduct, getProductById, getProducts } from '../controllers/product.controller.js';
import { userMiddleware, adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.get('/:id', getProductById);
// ProductRoute.post('/', adminMiddleware, createProduct);
ProductRoute.post('/', 
    adminMiddleware, 
    upload.fields([
        { name: 'productImage', maxCount: 10 }
    ]), 
    createProduct
);



export default ProductRoute;
