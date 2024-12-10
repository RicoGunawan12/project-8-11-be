import express from 'express';
import { createProduct, deleteProduct, getBestSeller, getPaginateProduct, getProductById, getProducts, updateBestSeller, updateProductQuantity, updatePromo, updateVariant } from '../controllers/product.controller.js';
import { userMiddleware, adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';
import { productsValidator } from '../validator/model/product.validator.js';
import { validateSchema } from '../validator/validate.js';
import { updateProductSchema } from '../schema/product/updateProduct.schema.js';
import { generalValidator } from '../validator/general/general.validator.js';

const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
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
ProductRoute.get('/paginate', getPaginateProduct)

ProductRoute.put('/update/bestseller/:id', adminMiddleware, updateBestSeller)

export default ProductRoute;
