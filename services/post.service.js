import Post from "../models/post.model.js"

export const getAllPostService = async () => {
    const posts = await Post.findAll();
    return posts;
}

export const getPostByIdService = async (postId) => {
    const post = await Post.findOne({
        where: { postId: postId }
    })
    if (!post) {
        throw new Error("Post not found!");
    }
    return post;
}

export const createPostService = async (postTitle, postContent) => {
    const post = await Post.create({ 
        postTitle: postTitle,
        postContent: postContent,
        createdAt: new Date() 
    })
    
    return post;
}

export const updatePostService = async (postId, postTitle, postContent) => {
    const updatedPost = await Post.update(
        {
            postTitle: postTitle,
            postContent: postContent
        },
        {
            where: { postId: postId }
        }
    )
    return updatedPost;
}

export const deletePostService = async (postId) => {
    const deletedPost = await Post.destroy({
        where: { postId: postId }
    })
    return deletedPost;
}