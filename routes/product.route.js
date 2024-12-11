import express from 'express';
import { createProduct, deleteProduct, getBestSeller, getPaginateProduct, getProductById, getProducts, updateBestSeller, updateProductQuantity, updatePromo, updateVariant } from '../controllers/product.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';


const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.get('/paginate', getPaginateProduct)
ProductRoute.get('/getCount', getProductCount)
ProductRoute.get('/bestseller', getBestSeller)
ProductRoute.get('/:id', getProductById);
// ProductRoute.post('/', adminMiddleware, productsValidator, validateSchema, createProduct);
ProductRoute.post('/', 
    adminMiddleware, 
    // productsValidator, validateSchema,
    upload.fields([
        { name: 'productImage', maxCount: 20 },
        { name: 'defaultImage', maxCount: 20 }
    ]), 
    createProduct
    );

ProductRoute.delete('/:id', adminMiddleware, deleteProduct);
ProductRoute.put('/promo/:id', adminMiddleware, 
    // generalValidator(updateProductSchema),
    // validateSchema, 
    updatePromo)
ProductRoute.put('/quantity/:id', adminMiddleware, updateProductQuantity)

ProductRoute.put('/update/variant', adminMiddleware, updateVariant)

ProductRoute.put('/update/bestseller/:id', adminMiddleware, updateBestSeller)

export default ProductRoute;
