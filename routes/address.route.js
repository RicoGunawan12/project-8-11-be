import express from 'express';
import { adminMiddleware, generalMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { calculateDeliveryFee, createAddress, deleteAddress, getAddressById, getAddressByUserId, getAllCity, getAllProvince, getAllSubdistrict, getPickUpPoint, searchDestination, updateAddress, updatePickUpPoint } from '../controllers/address.controller.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { addressSchema } from '../schema/model/address.schema.js';
import { validateSchema } from '../validator/validate.js';

const AddressRoute = express.Router();

AddressRoute.get('/', userMiddleware, getAddressByUserId);
AddressRoute.post('/',generalValidator(addressSchema),validateSchema, userMiddleware, createAddress);
AddressRoute.delete('/:id', userMiddleware, deleteAddress);
AddressRoute.put('/:id', userMiddleware, updateAddress);

AddressRoute.get('/province', getAllProvince);
AddressRoute.get('/city', getAllCity);
AddressRoute.get('/subdistrict', getAllSubdistrict);

AddressRoute.get('/destination', searchDestination);
AddressRoute.get('/calculate', userMiddleware, calculateDeliveryFee);

AddressRoute.post('/admin', adminMiddleware, updatePickUpPoint);
AddressRoute.get('/admin', getPickUpPoint);

AddressRoute.get('/:id', userMiddleware, getAddressById)

export default AddressRoute;