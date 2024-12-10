import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getPage } from '../controllers/page.controller.js';

const PageRoute = express.Router();

PageRoute.get('/', getPage);


export default PageRoute;
