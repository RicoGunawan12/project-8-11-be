import ProductVariant from "../models/productVariant.model.js";


export const createProductVariantService = async (product_id, variant) => {
    const { sku, product_variant_name, product_price, product_stock, product_image } = variant;
    const product_variant = await ProductVariant.create({ product_id, sku, product_variant_name, product_price, product_stock, product_image })
    return product_variant;
}