import { Op, where } from "sequelize";
import {
  ProductModel,
  ProductCategoryModel,
  ProductVariantModel,
  PromoDetailModel,
  PromoModel,
  RatingModel,
  ProductCoverModel,
} from "../association/association.js";
import { deleteDirectory, deletePostImage } from "../utils/uploader.js";
import { getCategoryByName } from "./productCategory.service.js";
import sequelize from "../config/database.js";
import { generateExcel } from "./excel.service.js";

export const getProductsService = async (
  search,
  category,
  limit,
  status = "active"
) => {
  const whereCondition = {
    isDeleted: false,
  };
  whereCondition.productName = { [Op.like]: `%${search}%` };

  if (status !== "all") whereCondition.productActivityStatus = status;

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
      "isBestSeller",
      "productActivityStatus",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
            order: [["created_at", "DESC"]],
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   attributes: [],
      // }
    ],
    where: whereCondition,
    // group: ["products.product_id"],
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
      "createdAt",
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   attributes: [],
      // }
    ],
    // group: ["products.product_id"],
    where: {
      productActivityStatus: "active",
      isDeleted: false
    },
    limit: 3,
    order: [["createdAt", "DESC"]],
  });
  return products;
};

export const getProductPaginationService = async (
  limit,
  offset,
  search,
  category
) => {
  const whereCondition = {
    isDeleted: false,
  };
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };
  whereCondition.productActivityStatus = "active";

 

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
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   attributes: [],
      // }
    ],
    where: whereCondition,
    // group: ["products.product_id"],
    limit: parseInt(limit) || 0,
    offset: parseInt(offset) || 0,
  });
 
  // if (!products || products.length === 0) {
  //   throw new Error("No products match the query parameters");
  // }
 
  return products;
};

export const getProductCountService = async (search, category) => {
  const whereCondition = {
    isDeleted: false,
  };
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };
  whereCondition.productActivityStatus = "active";
 

  const count = await ProductModel.count({
    where: whereCondition,
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
        where: category ? { productCategoryName: category } : undefined,
      },
    ],
  });
 

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
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   // attributes: ['rating', 'comment'],
      // }
    ],
    where: { productId, productActivityStatus: "active", isDeleted: false },
    // group: ["products.product_id"],
  });

  if (!product) {
    throw new Error("Product not found!");
  }
  return product;
};

export const getProductByIdWithRelatedProductService = async (productId) => {
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
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: RatingModel,
        attributes: [
          [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
          [sequelize.fn("COUNT", sequelize.col("rating")), "countRating"],
        ],
        required: false,
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
    ],
    where: { productId, productActivityStatus: "active", isDeleted: false },
    group: [
      "productId",
      "productName",
      "productSize",
      "productDescription",
      "defaultImage",
      "productWeight",
      "productLength",
      "productWidth",
      "productHeight",
      "isBestSeller",
      "product_variants.product_variant_id",
      "promo_details.promo_detail_id",
      "ratings.rating_id",
      // "product_covers.product_cover_id",
    ],
  });

  const ratingDistribution = await RatingModel.findAll({
    attributes: [
      "rating",
      [sequelize.fn("COUNT", sequelize.col("rating")), "count"],
    ],
    where: {
      product_id: productId,
    },
    group: ["rating", "product_id"],
    raw: true,
  });

  const ratingDistributionObject = ratingDistribution.reduce((acc, curr) => {
    acc[curr.rating] = parseInt(curr.count);
    return acc;
  }, {});

  if (!product) {
    throw new Error("Product not found!");
  }

  const relatedProducts = await ProductModel.findAll({
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
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
    ],
    include: [
      {
        model: ProductCategoryModel,
        attributes: ["productCategoryName"],
        ...(product?.product_category?.productCategoryName != null
          ? {
              where: {
                productCategoryName:
                  product.product_category.productCategoryName,
              },
            }
          : {}),
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        separate: true,
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   // attributes: ['rating', 'comment'],
      // }
    ],
    where: {
      productId: { [Op.ne]: productId },
      productActivityStatus: "active",
      isDeleted: false
    },
    // group: [
    //   "productId",
    //   "ProductCategoryModel.productCategoryName",
    //   "ProductVariantModel.productVariantId", // Group by productVariantId
    //   "ProductVariantModel.productColor",
    //   "ProductVariantModel.sku",
    //   "ProductVariantModel.productPrice",
    //   "ProductVariantModel.productStock",
    //   "ProductVariantModel.productImage",
    //   "PromoDetailModel.promoDetailId",
    //   "PromoModel.startDate",
    //   "PromoModel.endDate",
    //   "ProductCoverModel.productCover",
    // ],
    limit: 8,
  });

  return { product, relatedProducts, ratingDistributionObject };
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
  productHeight,
  mode
) => {
  console.log("checking category");
  const category = await ProductCategoryModel.findOne({ where: { productCategoryName } });
  if (!category) {
    throw new Error("There is no " + productCategoryName + " category");
  }
  const insertedProduct = await ProductModel.findOne({
    where: { 
      productName,
      isDeleted: false
    },
  });

  if (insertedProduct && mode == "upload")  {
    return insertedProduct
  }
  else if (insertedProduct){
    throw new Error("Product already exists")
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
    productHeight,
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
    const category = await getCategoryByName(productCategoryName);
    if (!category) {
      throw new Error("There is no " + productCategoryName + " category");
    }

    const productCategoryId = category.productCategoryId;
    // Update product details
    await product.update(
      {
        productName,
        productDescription,
        productCategoryId,
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
    const updatedVariantIds = variants
      .map((v) => v.productVariantId)
      .filter(Boolean);

    const variantsToDelete = existingVariantIds.filter(
      (id) => !updatedVariantIds.includes(id)
    );
    const variantsToUpdate = variants.filter((v) =>
      updatedVariantIds.includes(v.productVariantId)
    );
    const variantsToAdd = variants.filter((v) => !v.productVariantId);

    // Delete removed variants
    if (variantsToDelete.length > 0) {
      await ProductVariantModel.update(
        { isDeleted: true },
        {
          where: { productVariantId: variantsToDelete },
          transaction,
        }
      );
    }

    // Update existing variants
    for (const variant of variantsToUpdate) {

      console.log(variant)

      const existingVariant = existingVariants.find(
        (v) => v.productVariantId === variant.productVariantId
      );
      await existingVariant.update(
        {
          productColor: variant.productColor,
          productPrice: variant.productPrice,
          productStock: variant.productStock,
          productImage: variant.productImage,
          sku: variant.sku
        },
        { transaction }
      );
    }

    // Add new variants
    if (variantsToAdd.length > 0) {
      const newVariants = variantsToAdd.map(
        ({ productVariantId, ...variant }) => ({
          ...variant,
          productId,
        })
      );
      await ProductVariantModel.bulkCreate(newVariants, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    return product;
  } catch (error) {
    // Rollback the transaction on error
 

    await transaction.rollback();
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("Duplicate color variant");
    }
  }
};

export const deleteProductService = async (productId) => {
  const product = await ProductModel.findOne({ where: { productId } });
  // deleteDirectory(`assets/product/${product.productName}`);

  const deletedProduct = await ProductModel.update(
    { isDeleted: true },
    {
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

export const updateActivityStatusService = async (productId, status) => {
  const update = ProductModel.update(
    { productActivityStatus: status },
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
    where: { isBestSeller: true, productActivityStatus: "active" },
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
      "isBestSeller",
      [
        sequelize.literal(
          "(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "averageRating",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)"
        ),
        "countRating",
      ],
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
        where: { isDeleted: false }
      },
      {
        model: PromoDetailModel,
        attributes: ["promoDetailId"],
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
                [Op.gte]: new Date().setHours(0, 0, 0, 0),
              },
            },
          },
        ],
      },
      {
        model: ProductCoverModel,
        attributes: ["productCover"],
        order: [["productCover", "ASC"]],
      },
      // {
      //   model: RatingModel,
      //   required: false,
      //   attributes: [],
      // }
    ],
    where: { isDeleted: false }
    // group: ["products.product_id"],
  });
 

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

  if (updatedProduct[0] == 0) {
    throw new Error("Product not found or no changes applied!");
  }
  return updatedProduct;
};

export const deleteProductsService = async (productId) => {
  const products = await ProductModel.findAll({ where: { productId } });
  products.forEach((product) => {
    deleteDirectory(product.productName);
  });

  const deletedProduct = await ProductModel.destroy({
    where: { productId: productId },
  });
  return deletedProduct;
};

export const generateUpdateStockExcelService = async () => {
  const columns = ["SKU", "Nama Produk", "Stock Produk"];

  const { excelBuffer, fileName } = await generateExcel(columns);

  return { excelBuffer, fileName };
};

export const getAllVariantService = async() => {
  const variants = await ProductVariantModel.findAll({
    where: { isDeleted: false }
  })

  return variants
}
