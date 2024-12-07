import express from 'express';
import { userMiddleware } from '../middleware/auth.middleware.js';
import { calculateDeliveryFee, createAddress, deleteAddress, getAddressByUserId, getAllCity, getAllProvince, getAllSubdistrict, searchDestination, updateAddress } from '../controllers/address.controller.js';

const AddressRoute = express.Router();

AddressRoute.get('/', userMiddleware, getAddressByUserId);
AddressRoute.post('/', userMiddleware, createAddress);
AddressRoute.delete('/:id', userMiddleware, deleteAddress);
AddressRoute.put('/:id', userMiddleware, updateAddress);

AddressRoute.get('/province', userMiddleware, getAllProvince);
AddressRoute.get('/city', userMiddleware, getAllCity);
AddressRoute.get('/subdistrict', userMiddleware, getAllSubdistrict);

AddressRoute.get('/destination', userMiddleware, searchDestination);
AddressRoute.get('/calculate', userMiddleware, calculateDeliveryFee);

export default AddressRoute;
