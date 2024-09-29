
import { Product, ProductCategory } from "../association/product.association.js";
import ProductVariant from "../models/productVariant.model.js";
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async () => {
    const products = Product.findAll({
        include: [
            {
                model: ProductCategory,
                attributes: ['category_name']
            },
            {
                model: ProductVariant,
                attributes: ['product_variant_id', 'sku', 'product_price', 'product_stock', 'product_image'],
            }
        ]
    });
    return products;
}

export const getProductByIdService = async (product_id) => {
    const product = await Product.findOne({
        include: [
            {
                model: ProductVariant,
                attributes: ['product_variant_id', 'sku', 'product_price', 'product_stock', 'product_image'],
            },
            {
                model: ProductCategory,
                attributes: ['category_name']
            }
        ],
        where: { product_id }, 
    });

    if (!product) {
        throw new Error("Product not found!");
    }
    return product
}

export const createProductService = async (product_name, product_description, category_name) => {
    const category = await getCategoryByName(category_name);
    if (!category) {
        throw new Error("There is no " + category_name + " category");
    }
    
    const category_id = category.category_id;
    const product = await Product.create({ product_name, product_description, category_id });
    return product;
}