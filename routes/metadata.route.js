import { getMetadata } from "../controllers/metadata.controller.js";
import express from 'express';

const MetadataRoute = express.Router();

MetadataRoute.get('/:slug', getMetadata)

export default MetadataRoute;
