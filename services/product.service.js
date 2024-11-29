import { Op } from "sequelize";
import { ProductModel, ProductCategoryModel, ProductVariantModel } from "../association/association.js";
import { deleteDirectory } from "../utils/uploader.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async (search, category) => {
    const products = ProductModel.findAll({
        attributes: ['productId', 'productName', 'productDescription'],
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['productCategoryName'],
                where: category ? { productCategoryName: category } : undefined,
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'sku', 'productPrice', 'productStock', 'productImage'],
            },   
        ],
        where: {
            productName: {  [Op.like]: `%${search}%` }
        }
    });
    return products;
}

export const getProductByIdService = async (productId) => {
    const product = await ProductModel.findOne({
        attributes: ['productId', 'productName', 'productDescription'],
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['productCategoryName']
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'sku', 'productPrice', 'productStock', 'productImage'],
            }
        ],
        where: { productId }, 
    });

    if (!product) {
        throw new Error("Product not found!");
    }
    return product
}

export const createProductService = async (productName, productDescription, productCategoryName) => {
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
    
    const product = await ProductModel.create({ productName, productDescription, productCategoryId });
    return product;
}

export const deleteProductService = async (productId) => {
    const product = await ProductModel.findOne({ where: { productId }});
    deleteDirectory(product.productName);

    const deletedProduct = await ProductModel.destroy({ where: { productId: productId }});
    return deletedProduct;
}