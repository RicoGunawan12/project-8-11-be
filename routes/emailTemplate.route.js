import express from 'express';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { getEmailTemplate, updateEmailTemplate } from '../controllers/email.controller.js';
import { updateEmailTemplateSchema } from '../schema/email/updateEmailTemplate.schema.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { validateSchema } from '../validator/validate.js';

const EmailTemplateRoute = express.Router();

EmailTemplateRoute.get('/', adminMiddleware, getEmailTemplate);
EmailTemplateRoute.post('/', adminMiddleware, generalValidator(updateEmailTemplateSchema), validateSchema, updateEmailTemplate);

export default EmailTemplateRoute;
