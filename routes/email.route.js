import express from 'express';
import { sendEmail } from '../controllers/email.controller.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { sendEmailSchema } from '../schema/email/sendEmail.schema.js';
import { validateSchema } from '../validator/validate.js';

const EmailRoute = express.Router();

EmailRoute.post('/',generalValidator(sendEmailSchema),sendEmail);
// EmailRoute.post('/',generalValidator(sendEmailSchema),validateSchema, sendEmail);
export default EmailRoute;