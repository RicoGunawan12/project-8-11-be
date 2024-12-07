import express from 'express';
import { createFAQ, deleteFAQ, getAllFAQ, updateFAQ } from '../controllers/faq.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { faqSchema } from '../schema/model/faq.schema.js';
import { validateSchema } from '../validator/validate.js';

const FAQRoute = express.Router();

FAQRoute.get('/', getAllFAQ);
FAQRoute.post('/', adminMiddleware, generalValidator(faqSchema), validateSchema, createFAQ);
FAQRoute.delete('/:id', adminMiddleware, deleteFAQ);
FAQRoute.put('/:id', adminMiddleware, generalValidator(faqSchema), validateSchema, updateFAQ);


export default FAQRoute;
