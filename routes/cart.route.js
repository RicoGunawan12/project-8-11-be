import express from 'express';
import { addCartItem, getCartItemsByUser, removeCartItem, updateCartItem } from '../controllers/cart.controller.js';
import { userMiddleware } from '../middleware/auth.middleware.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { cartSchema } from '../schema/model/cart.schema.js';
import { validateSchema } from '../validator/validate.js';
import { updateCartSchema } from '../schema/cart/updateCartItem.schema.js';

const CartRoute = express.Router();

CartRoute.get('/', userMiddleware, getCartItemsByUser);
CartRoute.post('/', userMiddleware, generalValidator(cartSchema), validateSchema, addCartItem);
CartRoute.delete('/:id', userMiddleware, removeCartItem);
CartRoute.put('/:id', userMiddleware,generalValidator(updateCartSchema),validateSchema, updateCartItem);


export default CartRoute;
