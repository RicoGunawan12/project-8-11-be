import { getAllMetadata, getMetadata, insertMetadata, updateMetadata } from "../controllers/metadata.controller.js";
import { adminMiddleware } from '../middleware/auth.middleware.js';
import express from 'express';
import { insertMetadataSchema } from "../schema/metadata/insertMetadata.schema.js";
import { generalValidator } from "../validator/general/general.validator.js";
import { validateSchema } from "../validator/validate.js";
import { updateMetadataSchema } from "../schema/metadata/updateMetadata.schema.js";

const MetadataRoute = express.Router();

MetadataRoute.get('/:slug', getMetadata);

MetadataRoute.get('/', adminMiddleware, getAllMetadata);
MetadataRoute.post('/', adminMiddleware, generalValidator(insertMetadataSchema), validateSchema, insertMetadata);
MetadataRoute.patch('/:slug', adminMiddleware, generalValidator(updateMetadataSchema), validateSchema, updateMetadata);

export default MetadataRoute;
