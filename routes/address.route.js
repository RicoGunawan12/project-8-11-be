import express from 'express';
import { userMiddleware } from '../middleware/auth.middleware.js';
import { createAddress, getAddressByUserId } from '../controllers/address.controller.js';

const AddressRoute = express.Router();

AddressRoute.get('/', userMiddleware, getAddressByUserId);
AddressRoute.post('/', userMiddleware, createAddress);


export default AddressRoute;
