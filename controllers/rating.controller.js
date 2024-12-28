import { getRatingByProductService, insertRatingService } from "../services/rating.service.js";


export const getRatingByProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "Id is required!" });
    }
    try {
        const ratings = await getRatingByProductService(id);
        return res.status(200).json({ message: "Rating fetched!", ratings })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const insertRating = async (req, res) => {
    
    const { productId, rating, comment } = req.body;
    const userId = req.user.userId;

    if (!productId || typeof productId !== "string" || productId.trim() === "") {
        return res.status(400).json({ message: "Product ID must not be null or empty." });
    }
    
    if (
        rating === undefined || 
        typeof rating !== "number" || 
        rating < 1 || 
        rating > 5
    ) {
        return res.status(400).json({ message: "Rating must be a number between 1 and 5." });
    }
    
    if (comment && (typeof comment !== "string" || comment.trim() === "")) {
        return res.status(400).json({ message: "Comment must be filled." });
    }

    try {
        const ratings = await insertRatingService(userId, productId, rating, comment);
        return res.status(200).json({ message: "Rating inserted!", ratings })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}