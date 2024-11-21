import express from 'express';
import { createPost, deletePost, getAllPost, getPostById, updatePost } from '../controllers/post.controller.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';

const PostRoute = express.Router();

PostRoute.get("/", getAllPost);
PostRoute.get("/:id", getPostById);
PostRoute.post("/", adminMiddleware, createPost);
PostRoute.put("/:id", adminMiddleware, updatePost);
PostRoute.delete("/:id", adminMiddleware, deletePost);

export default PostRoute;