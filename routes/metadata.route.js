import { getAllMetadata, getMetadata, insertMetadata } from "../controllers/metadata.controller.js";
import express from 'express';
import { processImage } from "../utils/imageconverter.js";
import { upload } from "../utils/uploader.js";

const MetadataRoute = express.Router();

MetadataRoute.get('/:slug', getMetadata)
MetadataRoute.get('/', getAllMetadata)
MetadataRoute.post('/', upload.fields([
        { name: 'openGraphImage', maxCount: 20 }
    ]), 
    // validateProduct,
    processImage,insertMetadata)

export default MetadataRoute;
