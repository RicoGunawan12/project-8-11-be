import { deleteProductByProductIdService } from "../services/productCover.service.js";

export const deletePhotoByProductId = async (req, res, next) => {
    const productName = req.body.productName;
    const productId = req.params.id;
    try {
        await deleteProductByProductIdService(productId, productName);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    finally {
        next();
    }
}