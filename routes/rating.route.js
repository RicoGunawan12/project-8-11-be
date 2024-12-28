import express from 'express';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { getRatingByProduct, insertRating } from '../controllers/rating.controller.js';

const RatingRoute = express.Router();

RatingRoute.get("/:id", getRatingByProduct);
RatingRoute.post("/", userMiddleware, insertRating);

export default RatingRoute