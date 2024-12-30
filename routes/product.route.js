import express from 'express';
import { createProduct, deleteProduct, getBestSeller, getCategoryWithProduct, getNewestProduct, getPaginateProduct, getProductById, getProductCount, getProducts, updateBestSeller, updateProduct, updateProductQuantity, updatePromo, updateVariant, validateProduct, updateActiveBestSellers, updateInactiveBestSellers, deleteProducts } from '../controllers/product.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../utils/uploader.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { validateSchema } from '../validator/validate.js';
import { updateActiveBestSellersSchema } from '../schema/product/updateActiveBestSellers.schema.js';
import { updateInactiveBestSellersSchema } from '../schema/product/updateInactiveBestSellers.schema.js';
import { productMultipleDeleteSchema } from '../schema/product/multipleDelete.schema.js';


const ProductRoute = express.Router();

ProductRoute.get('/', getProducts);
ProductRoute.get('/category', getCategoryWithProduct)
ProductRoute.get('/paginate', getPaginateProduct)
ProductRoute.get('/getCount', getProductCount)
ProductRoute.get('/bestseller', getBestSeller)
ProductRoute.get('/newest', getNewestProduct)

ProductRoute.get('/:id', getProductById);
// ProductRoute.post('/', adminMiddleware, productsValidator, validateSchema, createProduct);
ProductRoute.post('/', 
    adminMiddleware, 
    // productsValidator, validateSchema,
    upload.fields([
        { name: 'productImage', maxCount: 20 },
        { name: 'defaultImage', maxCount: 20 }
    ]), 
    // validateProduct,
    createProduct
    );

ProductRoute.put('/:id', 
    adminMiddleware, 
    // productsValidator, validateSchema, 
    upload.fields([
        { name: 'productImage', maxCount: 20 },
        { name: 'defaultImage', maxCount: 20 }
    ]), 
    // validateProduct,
    updateProduct
    );

ProductRoute.delete('/:id', adminMiddleware, deleteProduct);
ProductRoute.put('/promo/:id', adminMiddleware, 
    // generalValidator(updateProductSchema),
    // validateSchema, 
    updatePromo)
ProductRoute.put('/quantity/:id', adminMiddleware, updateProductQuantity)

ProductRoute.put('/update/variant', adminMiddleware, updateVariant)

ProductRoute.put('/update/bestseller/:id', adminMiddleware, updateBestSeller)
ProductRoute.patch('/active', adminMiddleware, generalValidator(updateActiveBestSellersSchema), validateSchema, updateActiveBestSellers);
ProductRoute.patch('/inactive', adminMiddleware, generalValidator(updateInactiveBestSellersSchema), validateSchema, updateInactiveBestSellers);
ProductRoute.post('/delete/multiple', adminMiddleware, generalValidator(productMultipleDeleteSchema), validateSchema, deleteProducts);


export default ProductRoute;
