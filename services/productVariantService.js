import { ProductModel, ProductVariantModel } from "../association/association.js";
import { deletePostImage } from "../utils/uploader.js";


export const createProductVariantService = async (productId, variant) => {
    const { sku, productColor, productPrice, productStock, productImage } = variant;
    const productVariant = await ProductVariantModel.create({ productId, sku, productColor, productPrice, productStock, productImage })
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

export const updateVariantService = async (productVariantId, fieldsToUpdate) => {
    await ProductVariantModel.update(fieldsToUpdate, {
        where: { productVariantId },
    });
}

export const updateProductVariantService = async (productId, variant) => {
  const {
    productVariantId, // Ensure this ID exists in the `variant` object for identification
    sku,
    productColor,
    productPrice,
    productStock,
    productImage,
  } = variant;

  // Find the product variant by its unique ID
  const productVariant = await ProductVariantModel.findOne({
    where: { productVariantId, productId },
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }
  
  await deletePostImage(productVariant.productImage);
 

  // Update the product variant fields
  await productVariant.update({
    sku,
    productColor,
    productPrice,
    productStock,
    productImage,
  });

  return productVariant;
};
