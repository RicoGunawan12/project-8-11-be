import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createLocation, deleteLocation, getLocations, updateLocation } from '../controllers/location.controller.js';

const LocationRoute = express.Router();

LocationRoute.get('/', getLocations);
LocationRoute.post('/', adminMiddleware, createLocation);
LocationRoute.delete('/:id', adminMiddleware, deleteLocation)
LocationRoute.put('/:id', adminMiddleware, updateLocation)

export default LocationRoute;