import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getAboutPage, getPage, getWhyContent, updateBackgroundPage, updateEngAboutPage, updateEngPage, updateIndoAboutPage, updateIndoPage, updateWhyPhoto } from '../controllers/page.controller.js';
import { uploadBackground, uploadWhyPhoto } from '../utils/uploader.js';

const PageRoute = express.Router();

PageRoute.get('/', getPage);
PageRoute.put('/eng/:id', adminMiddleware, updateEngPage);
PageRoute.put('/indo/:id', adminMiddleware, updateIndoPage);
PageRoute.put('/background/:id', 
    adminMiddleware, 
    uploadBackground.fields([
        { name: 'background', maxCount: 20 },
        { name: 'photo', maxCount: 20 }
    ]), 
    updateBackgroundPage
);

PageRoute.get('/about', getAboutPage);
PageRoute.put('/about/eng/:id', adminMiddleware, updateEngAboutPage);
PageRoute.put('/about/indo/:id', adminMiddleware, updateIndoAboutPage);

PageRoute.get('/about/why', getWhyContent);
PageRoute.put('/about/why/photo', 
    adminMiddleware, 
    uploadWhyPhoto.fields([
        { name: 'photo', maxCount: 20 }
    ]),
    updateWhyPhoto
)
// PageRoute.get('/contact', getPage);
// PageRoute.put('/contact/:id', adminMiddleware,updatePage);


export default PageRoute;
