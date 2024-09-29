
import { ProductModel, ProductCategoryModel, ProductVariantModel } from "../association/association.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async () => {
    const products = ProductModel.findAll({
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['categoryName']
            },
            {
                model: ProductVariantModel,
                attributes: ['productVariantId', 'sku', 'productPrice', 'productStock', 'productImage'],
            }
        ]
    });
    return products;
}

export const getProductByIdService = async (productId) => {
    const product = await ProductModel.findOne({
        include: [
            {
                model: ProductCategoryModel,
                attributes: ['categoryName']
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

export const createProductService = async (productName, productDescription, categoryName) => {
    const category = await getCategoryByName(categoryName);
    if (!category) {
        throw new Error("There is no " + categoryName + " category");
    }
    
    const categoryId = category.categoryId;
    const product = await ProductModel.create({ productName, productDescription, categoryId });
    return product;
}