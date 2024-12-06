import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProductQuantity, updatePromo } from '../controllers/product.controller.js';
import { userMiddleware, adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.get('/:id', getProductById);
// ProductRoute.post('/', adminMiddleware, createProduct);
ProductRoute.post('/', 
    adminMiddleware, 
    upload.fields([
        { name: 'productImage', maxCount: 20 },
        { name: 'defaultImage', maxCount: 20 }
    ]), 
    createProduct
);

ProductRoute.delete('/:id', adminMiddleware, deleteProduct);
ProductRoute.put('/quantity/:id', adminMiddleware, updateProductQuantity)
ProductRoute.put('/promo/:id', adminMiddleware, updatePromo)


export default ProductRoute;
