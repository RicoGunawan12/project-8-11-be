import express from 'express';
import { createPost, deletePost, getAllPost, getPostById, updatePost } from '../controllers/post.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { postSchema } from './../schema/model/post.schema.js';
import { validateSchema } from '../validator/validate.js';

const PostRoute = express.Router();

PostRoute.get("/", getAllPost);
PostRoute.get("/:id", getPostById);
PostRoute.post("/", adminMiddleware, generalValidator(postSchema), validateSchema, createPost);
PostRoute.put("/:id", adminMiddleware, generalValidator(postSchema), validateSchema, updatePost);
PostRoute.delete("/:id", adminMiddleware, deletePost);

export default PostRoute;