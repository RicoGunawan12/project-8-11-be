import express from 'express';
import { createCategory, getCategories } from '../controllers/productCategory.controller.js';

const ProductCategoryRoute = express.Router();

ProductCategoryRoute.get('/', getCategories);

ProductCategoryRoute.post('/', createCategory)

export default ProductCategoryRoute;
