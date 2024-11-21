import { createPostService, deletePostService, getAllPostService, getPostByIdService, updatePostService } from "../services/post.service.js";


export const getAllPost = async (req, res) => {
    try {
        const posts = await getAllPostService();
        return res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPostById = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }
    try {
        const post = await getPostByIdService(postId);
        return res.status(200).json({ message: "Post fetched successfully", post });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { postTitle, postContent } = req.body;
    try {
        const post = await createPostService(postTitle, postContent);
        return res.status(200).json({ message: "Post created successfully", post });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { postTitle, postContent } = req.body
    const postId = req.params.id;
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }
    try {
        const updatedPost = await updatePostService(postId, postTitle, postContent);
        return res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }
    try {
        const deletedPost = await deletePostService(postId);
        return res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}