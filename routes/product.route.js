import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controller.js';
import { userMiddleware, adminMiddleware } from '../middleware/auth.middleware.js'

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.post('/', adminMiddleware, createProduct);

export default ProductRoute;
