import { ProductCoverModel } from "../association/association.js"

export const createProductCoverService = async (productId, productCover) => {
    const insertedProductCover = await ProductCoverModel.create({ productId, productCover });
    return insertedProductCover;
}