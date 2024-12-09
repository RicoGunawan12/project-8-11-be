import { createPostService, deletePostService, getAllPostService, getPostByIdService, updatePostService } from "../services/post.service.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";


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
    const postImageFile = req.files['postImage'];
    
    if (postTitle.length <= 0) {
        return res.status(400).json({ message: "Post title must be filled" });
    }
    else if (postTitle.content <= 0) {
        return res.status(400).json({ message: "Post content must be filled" });
    }
    else if (!postImageFile) {
        return res.status(400).json({ message: "Post image must be filled" });
    }
    
    const postImage = `/${UPLOAD_FOLDER}blog/${postImageFile[0].filename}`
    try {
        const post = await createPostService(postImage, postTitle, postContent);
        return res.status(200).json({ message: "Post created successfully", post });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { postTitle, postContent } = req.body
    const postId = req.params.id;
    const postImageFile = req.files['postImage'];
    
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }
    if (postTitle.length <= 0) {
        return res.status(400).json({ message: "Post title must be filled" });
    }
    else if (postTitle.content <= 0) {
        return res.status(400).json({ message: "Post content must be filled" });
    }
    else if (!postImageFile) {
        return res.status(400).json({ message: "Post image must be filled" });
    }
    
    
    
    const postImage = `/${UPLOAD_FOLDER}blog/${postImageFile[0].filename}`
    try {
        const updatedPost = await updatePostService(postId, postImage, postTitle, postContent);
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