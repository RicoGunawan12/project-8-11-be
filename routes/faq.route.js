import express from 'express';
import { createFAQ, deleteFAQ, getAllFAQ, updateFAQ } from '../controllers/faq.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';

const FAQRoute = express.Router();

FAQRoute.get('/', getAllFAQ);
FAQRoute.post('/', adminMiddleware, createFAQ);
FAQRoute.delete('/:id', adminMiddleware, deleteFAQ);
FAQRoute.put('/:id', adminMiddleware, updateFAQ);


export default FAQRoute;
