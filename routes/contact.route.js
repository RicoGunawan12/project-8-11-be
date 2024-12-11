import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createContact, deleteContact, getContact, updateContact } from '../controllers/contact.controller.js';

const ContactRoute = express.Router();

ContactRoute.get('/', getContact);
ContactRoute.post('/', adminMiddleware, createContact);
ContactRoute.put('/:id', adminMiddleware, updateContact);
ContactRoute.delete('/:id', adminMiddleware, deleteContact);

export default ContactRoute;