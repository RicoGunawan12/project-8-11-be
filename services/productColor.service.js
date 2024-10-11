import { ColorVariantModel } from "../association/association.js";

export const createProductColorService = async (productVariantId, variant) => {
    const {productColor, productImage } = variant;
    const color_variant = await ColorVariantModel.create({ productVariantId, productColor, productImage })
    return color_variant;
}