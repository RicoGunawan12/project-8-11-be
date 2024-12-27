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

export const getProductsService = async (search, category, limit) => {
  const products = ProductModel.findAll({
    attributes: [
      "productId",
      "productName",
      "productDescription",
      "defaultImage",
      "isPromo",
      "productPromo",
      "startDate",
      "endDate",
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
          "productSize",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
          "productWeight",
          "productLength",
          "productWidth",
          "productHeight",
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

export const getProductPaginationService = async (limit, offset, search) => {
  const whereCondition = {};
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };

  console.log(search)

  const products = ProductModel.findAll({
    attributes: [
      "productId",
      "productName",
      "productDescription",
      "defaultImage",
      "isPromo",
      "productPromo",
      "startDate",
      "endDate",
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
          "productSize",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
          "productWeight",
          "productLength",
          "productWidth",
          "productHeight",
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
  console.log("asd")
  // if (!products || products.length === 0) {
  //   throw new Error("No products match the query parameters");
  // }
  console.log(products)
  return products;
};

export const getProductCountService = async (search) => {
  const whereCondition = {};
  whereCondition.productName = {
    [Op.like]: `%${search}%`,
  };
  console.log(search);

  const count = await ProductModel.count({
    where: whereCondition,
  });
  console.log(count);

  return count;
};

export const getProductByIdService = async (productId) => {
  const product = await ProductModel.findOne({
    attributes: [
      "productId",
      "productName",
      "productDescription",
      "defaultImage",
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
          "productSize",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
          "productWeight",
          "productLength",
          "productWidth",
          "productHeight",
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
    throw new Error("Product not found!sdsdwds");
  }
  return product;
};

export const createProductService = async (
  productName,
  productDescription,
  productCategoryName,
  defaultImage
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
  });
  return product;
};


export const updateProductService = async (
  productId,
  productName,
  productDescription,
  productCategoryName,
  defaultImage
) => {
  const category = await getCategoryByName(productCategoryName);
  if (!category) {
    throw new Error("There is no " + productCategoryName + " category");
  }

  const existingProduct = await ProductModel.findOne({
    where: { productName },
  });

  if (existingProduct && existingProduct.productId !== productId) {
    throw new Error("Product name already exists");
  }

  const product = await ProductModel.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await deletePostImage(product.defaultImage);
 
  const productCategoryId = category.productCategoryId;

  await product.update({
    productName,
    productDescription,
    productCategoryId,
    defaultImage,
  });

  return product;
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
          "productSize",
          "productColor",
          "sku",
          "productPrice",
          "productStock",
          "productImage",
          "productWeight",
          "productLength",
          "productWidth",
          "productHeight",
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
  console.log(updatedProduct);

  if (updatedProduct[0] == 0) {
    throw new Error("Product not found or no changes applied!");
  }
  return updatedProduct;
};
