import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { createContact, deleteContact, getContact, updateContact } from '../controllers/contact.controller.js';
import { uploadContact } from '../utils/uploader.js';

const ContactRoute = express.Router();

ContactRoute.get('/', getContact);
ContactRoute.post('/', 
    adminMiddleware, 
    uploadContact.fields([
        { name: 'contactImage', maxCount: 20 }
    ]), 
    createContact
);
ContactRoute.put('/:id', adminMiddleware, updateContact);
ContactRoute.delete('/:id', adminMiddleware, deleteContact);

export default ContactRoute;