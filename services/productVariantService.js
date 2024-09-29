import { ProductVariantModel } from "../association/association.js";


export const createProductVariantService = async (productId, variant) => {
    console.log(variant);
    
    const { sku, productVariantName, productPrice, productStock, productImage } = variant;
    const product_variant = await ProductVariantModel.create({ productId, sku, productVariantName, productPrice, productStock, productImage })
    return product_variant;
}