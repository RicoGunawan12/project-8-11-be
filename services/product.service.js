import { Op, where } from "sequelize";
import {
  ProductModel,
  ProductCategoryModel,
  ProductVariantModel,
  PromoDetailModel,
  PromoModel,
} from "../association/association.js";
import { deleteDirectory, deletePostImage } from "../utils/uploader.js";
import { getCategoryByName } from "./productCategory.service.js";
import sequelize from "../config/database.js";

export const getProductsService = async (search, category, limit) => {
  const products = ProductModel.findAll({
    attributes: [
      "productId",
      "productName",
      "productSize",
      "productDescription",
      "defaultImage",
      "productWeight",
      "productLength",
      "productWidth",
      "productHeight",
    ],
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
        where: category ? { productCategoryName: category } : undefined,
      },
      {
        model: ProductVariantModel,
        attributes: [
          "productVariantId",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
        ],
      },
      {
        model: PromoDetailModel,
        attributes: ['promoDetailId'],
        required: false,
        include: [
            {
                model: PromoModel,
                required: false,
                where: {
                    startDate: {
                        [Op.lte]: new Date(), 
                    },
                    endDate: {
                        [Op.gte]: new Date(),
                    },
                },
            },
        ]
      }
      
    ],
    where: {
      productName: { [Op.like]: `%${search}%` },
    },
    limit: parseInt(limit) || null,
  });
  return products;
};

export const getNewestProductsService = async () => {
  const products = await ProductModel.findAll({
    attributes: [
      "productId",
      "productName",
      "productSize",
      "productDescription",
      "defaultImage",
      "productWeight",
      "productLength",
      "productWidth",
      "productHeight",
      "createdAt"
    ],
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
      },
      {
        model: ProductVariantModel,
        attributes: [
          "productVariantId",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
        ],
      },
      {
        model: PromoDetailModel,
        attributes: ['promoDetailId'],
        required: false,
        include: [
            {
                model: PromoModel,
                required: false,
                where: {
                    startDate: {
                        [Op.lte]: new Date(), 
                    },
                    endDate: {
                        [Op.gte]: new Date(),
                    },
                },
            },
        ]
      }
    ],
    limit: 3,
    order: [['createdAt', 'DESC']],
  });
  return products;
};


export const getProductPaginationService = async (limit, offset, search) => {
  const whereCondition = {};
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };

  // console.log(search)

  const products = ProductModel.findAll({
    attributes: [
      "productId",
      "productName",
      "productSize",
      "productDescription",
      "defaultImage",
      "productWeight",
      "productLength",
      "productWidth",
      "productHeight",
    ],
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
      },
      {
        model: ProductVariantModel,
        attributes: [
          "productVariantId",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
        ],
      },
      {
        model: PromoDetailModel,
        attributes: ['promoDetailId'],
        required: false,
        include: [
            {
                model: PromoModel,
                required: false,
                where: {
                    startDate: {
                        [Op.lte]: new Date(), 
                    },
                    endDate: {
                        [Op.gte]: new Date(),
                    },
                },
            },
        ]
      }
    ],
    where: whereCondition,
    limit: parseInt(limit) || 0,
    offset: parseInt(offset) || 0,
  });
  // console.log("asd")
  // if (!products || products.length === 0) {
  //   throw new Error("No products match the query parameters");
  // }
  // console.log(products)
  return products;
};

export const getProductCountService = async (search) => {
  const whereCondition = {};
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };
  // console.log(search);

  const count = await ProductModel.count({
    where: whereCondition,
  });
  // console.log(count);

  return count;
};

export const getProductByIdService = async (productId) => {
  const product = await ProductModel.findOne({
    attributes: [
      "productId",
      "productName",
      "productSize",
      "productDescription",
      "defaultImage",
      "productWeight",
      "productLength",
      "productWidth",
      "productHeight",
    ],
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
      },
      {
        model: ProductVariantModel,
        attributes: [
          "productVariantId",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
        ],
      },
      {
        model: PromoDetailModel,
        attributes: ['promoDetailId'],
        required: false,
        include: [
            {
                model: PromoModel,
                required: false,
                where: {
                    startDate: {
                        [Op.lte]: new Date(), 
                    },
                    endDate: {
                        [Op.gte]: new Date(),
                    },
                },
            },
        ]
      }
    ],
    where: { productId },
  });

  if (!product) {
    throw new Error("Product not found!");
  }
  return product;
};

export const createProductService = async (
  productName,
  productDescription,
  productCategoryName,
  defaultImage,
  productSize,
  productWeight, 
  productLength, 
  productWidth, 
  productHeight
) => {
  const category = await getCategoryByName(productCategoryName);
  if (!category) {
    throw new Error("There is no " + productCategoryName + " category");
  }
  const insertedProduct = await ProductModel.findOne({
    where: { productName },
  });

  if (insertedProduct) {
    throw new Error("Product name already exists");
  }

  const productCategoryId = category.productCategoryId;

  const product = await ProductModel.create({
    productName,
    productDescription,
    productCategoryId,
    defaultImage,
    productSize,
    productWeight, 
    productLength, 
    productWidth, 
    productHeight
  });
  return product;
};


export const updateProductService = async (
  productId,
  productName,
  productDescription,
  productCategoryName,
  defaultImage,
  productSize,
  productWeight,
  productLength,
  productWidth,
  productHeight,
  variants
) => {
  const transaction = await sequelize.transaction();

  try {
    // Fetch the product and ensure it exists
    const product = await ProductModel.findByPk(productId, { transaction });
    if (!product) throw new Error("Product not found");

    // Update product details
    await product.update(
      {
        productName,
        productDescription,
        productCategoryName,
        defaultImage,
        productSize,
        productWeight,
        productLength,
        productWidth,
        productHeight,
      },
      { transaction }
    );

    // Fetch existing variants
    const existingVariants = await ProductVariantModel.findAll({
      where: { productId },
      transaction,
    });

    // Identify variants to add, update, or delete
    const existingVariantIds = existingVariants.map((v) => v.productVariantId);
    const updatedVariantIds = variants.map((v) => v.productVariantId).filter(Boolean);

    const variantsToDelete = existingVariantIds.filter((id) => !updatedVariantIds.includes(id));
    const variantsToUpdate = variants.filter((v) => updatedVariantIds.includes(v.productVariantId));
    const variantsToAdd = variants.filter((v) => !v.productVariantId);

    // Delete removed variants
    if (variantsToDelete.length > 0) {
      await ProductVariantModel.destroy({
        where: { productVariantId: variantsToDelete },
        transaction,
      });
    }
    console.log(variantsToUpdate);
    
    // Update existing variants
    for (const variant of variantsToUpdate) {
      const existingVariant = existingVariants.find((v) => v.productVariantId === variant.productVariantId);
      await existingVariant.update(
        {
          productColor: variant.productColor,
          productPrice: variant.productPrice,
          productStock: variant.productStock,
          productImage: variant.productImage,
        },
        { transaction }
      );
    }

    // Add new variants
    if (variantsToAdd.length > 0) {
      const newVariants = variantsToAdd.map((variant) => ({
        ...variant,
        productId,
      }));
      await ProductVariantModel.bulkCreate(newVariants, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    return product;
  } catch (error) {
    // Rollback the transaction on error
    await transaction.rollback();
    throw error;
  }
};


export const deleteProductService = async (productId) => {
  const product = await ProductModel.findOne({ where: { productId } });
  deleteDirectory(product.productName);

  const deletedProduct = await ProductModel.destroy({
    where: { productId: productId },
  });
  return deletedProduct;
};

export const updateBestSellerService = async (productId, isBestSeller) => {
  const update = ProductModel.update(
    { isBestSeller: isBestSeller },
    {
      where: {
        productId: productId,
      },
    }
  );
  return update;
};

export const getBestSellerService = async () => {
  const bestSellerProduct = await ProductModel.findAll({
    where: { isBestSeller: true },
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
      },
      {
        model: ProductVariantModel,
        attributes: [
          "productVariantId",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
        ],
      },
      {
        model: PromoDetailModel,
        attributes: ['promoDetailId'],
        required: false,
        include: [
            {
                model: PromoModel,
                required: false,
                where: {
                    startDate: {
                        [Op.lte]: new Date(), 
                    },
                    endDate: {
                        [Op.gte]: new Date(),
                    },
                },
            },
        ]
      }
    ],
  });
  console.log(bestSellerProduct);

  return bestSellerProduct;
};

export const updatePromoService = async (
  productId,
  isPromo,
  productPromo,
  startDate,
  endDate
) => {
  const updatedProduct = await ProductModel.update(
    {
      isPromo: isPromo,
      productPromo: productPromo,
      startDate: startDate,
      endDate: endDate,
    },
    { where: { productId: productId } }
  );
  // console.log(updatedProduct);

  if (updatedProduct[0] == 0) {
    throw new Error("Product not found or no changes applied!");
  }
  return updatedProduct;
};
