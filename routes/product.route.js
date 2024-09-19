import express from 'express';
import { createProduct, getProducts } from '../controllers/product.controller.js';

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.post('/', createProduct);

export default ProductRoute;
