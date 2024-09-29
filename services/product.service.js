
import { Product, ProductCategory } from "../association/product.association.js";
import ProductVariant from "../models/productVariant.model.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async () => {
    const products = Product.findAll({
        include: [
            {
                model: ProductCategory,
                attributes: ['categoryName']
            },
            {
                model: ProductVariant,
                attributes: ['productVariantId', 'sku', 'productPrice', 'productStock', 'productImage'],
            }
        ]
    });
    return products;
}

export const getProductByIdService = async (productId) => {
    const product = await Product.findOne({
        include: [
            {
                model: ProductCategory,
                attributes: ['categoryName']
            },
            {
                model: ProductVariant,
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
    const product = await Product.create({ productName, productDescription, categoryId });
    return product;
}