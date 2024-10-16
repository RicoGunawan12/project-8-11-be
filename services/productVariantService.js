import { ProductVariantModel } from "../association/association.js";


export const createProductVariantService = async (productId, variant) => {
    const { sku, productVariantName, productPrice, productStock, productWeight, productImage } = variant;
    const product_variant = await ProductVariantModel.create({ productId, sku, productVariantName, productPrice, productStock, productImage, productWeight })
    return product_variant;
}