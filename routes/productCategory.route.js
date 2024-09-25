import express from 'express';
import { createCategory, getCategories } from '../controllers/productCategory.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';

const ProductCategoryRoute = express.Router();

ProductCategoryRoute.get('/', getCategories);

ProductCategoryRoute.post('/', adminMiddleware, createCategory)

export default ProductCategoryRoute;
