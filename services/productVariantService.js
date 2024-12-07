import { ProductVariantModel } from "../association/association.js";


export const createProductVariantService = async (productId, variant) => {
    const { sku, productSize, productColor, productPrice, productStock, productWeight, productWidth, productLength, productHeight, productImage } = variant;
    const productVariant = await ProductVariantModel.create({ productId, sku, productSize, productColor, productPrice, productStock, productImage, productWeight, productWidth, productLength, productHeight })
    return productVariant;
}

export const updateProductQuantityService = async (productVariantId, quantity) => {
    
    const updatedProduct = await ProductVariantModel.update(
        { productStock: quantity },
        { where: { productVariantId: productVariantId }}
    );
    if (updatedProduct[0] == 0) {
        throw new Error("Product variant not found!");
    }
    return updatedProduct;
}

export const updatePromoService = async (productId, productPromo, productPromoExpiry) => {
    const updatedProduct = await ProductVariantModel.update({ productPromo: productPromo, productPromoExpiry: productPromoExpiry}, { where: { productVariantId: productId } });
    if (updatedProduct[0] == 0) {
        throw new Error("Product variant not found!");
    }
    return updatedProduct;
}
