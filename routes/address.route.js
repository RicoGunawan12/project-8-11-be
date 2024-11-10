import express from 'express';
import { userMiddleware } from '../middleware/auth.middleware.js';
import { calculateDeliveryFee, createAddress, getAddressByUserId, searchDestination } from '../controllers/address.controller.js';

const AddressRoute = express.Router();

AddressRoute.get('/', userMiddleware, getAddressByUserId);
AddressRoute.post('/', userMiddleware, createAddress);
AddressRoute.get('/destination', userMiddleware, searchDestination);
AddressRoute.get('/calculate', userMiddleware, calculateDeliveryFee);

export default AddressRoute;
