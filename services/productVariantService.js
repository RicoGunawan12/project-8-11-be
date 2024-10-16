import { ProductVariantModel } from "../association/association.js";


export const createProductVariantService = async (productId, variant) => {
    const { sku, productVariantName, productPrice, productStock, productWeight, productImage } = variant;
    const productVariant = await ProductVariantModel.create({ productId, sku, productVariantName, productPrice, productStock, productImage, productWeight })
    return productVariant;
}

export const updatePromoService = async (productId, productPromo, productPromoExpiry) => {
    const updatedProduct = await ProductVariantModel.update({ productPromo: productPromo, productPromoExpiry: productPromoExpiry}, { where: { productVariantId: productId } });
    return updatedProduct;
}