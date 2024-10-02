import express from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/productCategory.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';

const ProductCategoryRoute = express.Router();

ProductCategoryRoute.get('/', getCategories);

ProductCategoryRoute.post('/', adminMiddleware, createCategory)

ProductCategoryRoute.delete('/:id', adminMiddleware, deleteCategory)

ProductCategoryRoute.put('/:id', adminMiddleware, updateCategory)

export default ProductCategoryRoute;
