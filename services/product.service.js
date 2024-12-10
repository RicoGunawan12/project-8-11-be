import { Op, where } from "sequelize";
import { ProductModel, ProductCategoryModel, ProductVariantModel } from "../association/association.js";
import { deleteDirectory } from "../utils/uploader.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async (search, category, limit) => {
    const products = ProductModel.findAll({
        attributes: ['productId', 'productName', 'productDescription', 'defaultImage', 'isPromo', 'productPromo', 'startDate', 'endDate'],
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

export const getProductPaginationService = async (limit, offset) => {
    const products = ProductModel.findAll({
        attributes: ['productId', 'productName', 'productDescription', 'defaultImage', 'isPromo', 'productPromo', 'startDate', 'endDate'],
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
        limit: parseInt(limit) || null,
        offset: parseInt(limit * offset) || null
    })
}

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
        throw new Error("Product not found!");
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

export const updateBestSellerService = async (productId, isBestSeller) => {
    const update = ProductModel.update(
        { isBestSeller: isBestSeller },
        { 
            where: { 
                productId: productId 
            }
        }
    )
    return update;
}

export const getBestSellerService = async () => {
    const bestSellerProduct = await ProductModel.findAll({
        where: { isBestSeller: true }
    })
    console.log(bestSellerProduct);
    
    return bestSellerProduct;
}

export const updatePromoService = async (productId, isPromo, productPromo, startDate, endDate) => {
    const updatedProduct = await ProductModel.update({ isPromo: isPromo, productPromo: productPromo, startDate: startDate, endDate: endDate}, { where: { productId: productId } });
    console.log(updatedProduct);
    
    if (updatedProduct[0] == 0) {
        throw new Error("Product not found or no changes applied!");
    }
    return updatedProduct;
}