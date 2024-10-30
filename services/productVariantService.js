import { ProductVariantModel } from "../association/association.js";


export const createProductVariantService = async (productId, variant) => {
    const { sku, productSize, productColor, productPrice, productStock, productWeight, productImage } = variant;
    const productVariant = await ProductVariantModel.create({ productId, sku, productSize, productColor, productPrice, productStock, productImage, productWeight })
    return productVariant;
}

export const updatePromoService = async (productId, productPromo, productPromoExpiry) => {
    const updatedProduct = await ProductVariantModel.update({ productPromo: productPromo, productPromoExpiry: productPromoExpiry}, { where: { productVariantId: productId } });
    return updatedProduct;
}