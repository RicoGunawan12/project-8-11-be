import { ProductCoverModel } from "../association/association.js"
import { deleteDirectory } from "../utils/uploader.js";

export const createProductCoverService = async (productId, productCover) => {
    const insertedProductCover = await ProductCoverModel.create({ productId, productCover });
    return insertedProductCover;
}

export const deleteProductByProductIdService = async (productId, productName) => {
    console.log(`assets/product/${productName}`);
    
    deleteDirectory(`assets/product/${productName}`);
    await ProductCoverModel.destroy({ where: { productId }})
}