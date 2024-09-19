import Product from "../models/product.model.js"
import { getCategoryByName } from "./productCategory.service.js";


export const getProductsService = async () => {
    const products = Product.findAll();
    return products;
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