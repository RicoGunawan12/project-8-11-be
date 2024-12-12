import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getPage, updatePage } from '../controllers/page.controller.js';

const PageRoute = express.Router();

PageRoute.get('/', getPage);
PageRoute.put('/:id', adminMiddleware,updatePage);


export default PageRoute;
