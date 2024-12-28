import express from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/productCategory.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { categorySchema } from '../schema/model/category.schema.js';
import { generalValidator } from './../validator/general/general.validator.js';
import { validateSchema } from '../validator/validate.js';
import { uploadCategory } from '../utils/uploader.js';

const ProductCategoryRoute = express.Router();

ProductCategoryRoute.get('/', getCategories);

ProductCategoryRoute.post('/', 
    adminMiddleware,
    uploadCategory.fields([
        { name: 'productCategoryPhoto', maxCount: 20 }
    ]),
    createCategory
)

ProductCategoryRoute.delete('/:id', adminMiddleware, deleteCategory)

ProductCategoryRoute.put('/:id', 
    adminMiddleware,
    uploadCategory.fields([
        { name: 'productCategoryPhoto', maxCount: 20 }
    ]),
    updateCategory
)

export default ProductCategoryRoute;
