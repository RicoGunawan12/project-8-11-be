import ProductVariant from "../models/productVariant.model.js";


export const createProductVariantService = async (productId, variant) => {
    console.log(variant);
    
    const { sku, productVariantName, productPrice, productStock, productImage } = variant;
    const product_variant = await ProductVariant.create({ productId, sku, productVariantName, productPrice, productStock, productImage })
    return product_variant;
}