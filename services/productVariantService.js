import {
  ProductModel,
  ProductVariantModel,
} from "../association/association.js";
import { deletePostImage } from "../utils/uploader.js";

export const createProductVariantService = async (
  productId,
  sku,
  productColor,
  productPrice,
  productStock,
  productImage,
) => {
  const productVariant = await ProductVariantModel.create({
    productId,
    sku,
    productColor,
    productPrice,
    productStock,
    productImage
  });
  return productVariant;
};

export const getProductVariantByIdSevice = async(
  id
) => {

 
  return await ProductVariantModel.findOne({
    where: {productVariantId : id}
  })
}

export const updateProductQuantityService = async (
  productVariantId,
  quantity
) => {
  const updatedProduct = await ProductVariantModel.update(
    { productStock: quantity },
    { where: { productVariantId: productVariantId } }
  );
  if (updatedProduct[0] == 0) {
    throw new Error("Product variant not found!");
  }
  return updatedProduct;
};

export const updateVariantService = async (
  productVariantId,
  fieldsToUpdate
) => {
  await ProductVariantModel.update(fieldsToUpdate, {
    where: { productVariantId },
  });
};

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
export const bulkUpdateProductStockService = async (products) => {

  if(!products){
    throw new Error('Please input at least one data')
  }
  const skus = products.map((product) => product.sku);

  const existingProducts = await ProductVariantModel.findAll({
    where: {
      sku: skus,
    },
    attributes: ["sku"], 
  });
  const existingSkus = existingProducts.map((product) => product.sku);

  const missingSkus = skus.filter((sku) => !existingSkus.includes(sku));

 
  if (missingSkus.length > 0) {
    throw new Error(
      `The following SKUs were not found: ${missingSkus.join(", ")}`
    );
  }

  for (const product of products) {
    await ProductVariantModel.update(
      { productStock: product.productStock },
      { where: { sku: product.sku } }
    );
  }

  return { success: true, message: "Bulk update completed." };
};
