import express from 'express';
import { addCartItem, getCartItemsByUser, removeCartItem } from '../controllers/cart.controller.js';
import { userMiddleware } from '../middleware/auth.middleware.js';

const CartRoute = express.Router();

CartRoute.get('/', userMiddleware, getCartItemsByUser);
CartRoute.post('/', userMiddleware, addCartItem);
CartRoute.delete('/:id', userMiddleware, removeCartItem);


export default CartRoute;
