import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getAboutPage, getPage, updateEngAboutPage, updateEngPage, updateIndoAboutPage, updateIndoPage } from '../controllers/page.controller.js';

const PageRoute = express.Router();

PageRoute.get('/', getPage);
PageRoute.put('/eng/:id', adminMiddleware, updateEngPage);
PageRoute.put('/indo/:id', adminMiddleware, updateIndoPage);

PageRoute.get('/about', getAboutPage);
PageRoute.put('/about/eng/:id', adminMiddleware, updateEngAboutPage);
PageRoute.put('/about/indo/:id', adminMiddleware, updateIndoAboutPage);

// PageRoute.get('/contact', getPage);
// PageRoute.put('/contact/:id', adminMiddleware,updatePage);


export default PageRoute;
