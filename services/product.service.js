import { Op } from "sequelize";
import { ProductModel, ProductCategoryModel, ProductVariantModel } from "../association/association.js";
import { deleteDirectory } from "../utils/uploader.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async (search, category, limit) => {
    const products = ProductModel.findAll({
        attributes: ['productId', 'productName', 'productDescription', 'defaultImage'],
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['productCategoryName'],
                where: category ? { productCategoryName: category } : undefined,
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'productSize', 'productColor', 'sku', 'productPrice', 'productStock', 'productImage', 'productWeight', 'productLength', 'productWidth', 'productHeight'],
            },   
        ],
        where: {
            productName: {  [Op.like]: `%${search}%` }
        },
        limit: parseInt(limit) || null,
    });
    return products;
}

export const getProductPaginationService = async (limit, offset, search) => {

    const whereCondition = {}
    whereCondition.productName = {
        [Op.like] : `%${search}%`
    }
    console.log(limit, offset, search)
    const products = await ProductModel.findAll({
        attributes: ['productId', 'productName', 'productDescription', 'defaultImage'],
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['productCategoryName'],
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'productSize', 'productColor', 'sku', 'productPrice', 'productStock', 'productImage', 'productWeight', 'productLength', 'productWidth', 'productHeight'],
            },   
        ],
        where: whereCondition,
        limit: parseInt(limit) || null,
        offset: parseInt(offset) || 0,
    });

    if (!products || products.length === 0) {
        throw new Error('No products match the query parameters');
    }

    return products;
};

export const getProductCountService = async (search) => {
    const whereCondition = {}
    whereCondition.productName = {
        [Op.like] : `%${search}%`
    }
    console.log(search)

    const count = await ProductModel.count({
        where: whereCondition,
    });
    console.log(count)

    return count;
};

export const getProductByIdService = async (productId) => {
    const product = await ProductModel.findOne({
        attributes: ['productId', 'productName', 'productDescription', 'defaultImage'],
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['productCategoryName']
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'productSize', 'productColor', 'sku', 'productPrice', 'productStock', 'productImage', 'productWeight', 'productLength', 'productWidth', 'productHeight'],
            }
        ],
        where: { productId }, 
    });

    if (!product) {
        throw new Error("Product not found!sdsdwds");
    }
    return product
}

export const createProductService = async (productName, productDescription, productCategoryName, defaultImage) => {
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
    
    const product = await ProductModel.create({ productName, productDescription, productCategoryId, defaultImage });
    return product;
}

export const deleteProductService = async (productId) => {
    const product = await ProductModel.findOne({ where: { productId }});
    deleteDirectory(product.productName);

    const deletedProduct = await ProductModel.destroy({ where: { productId: productId }});
    return deletedProduct;
}