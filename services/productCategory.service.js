import ProductCategory from "../models/productCategory.model.js"


export const getCategoriesService = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
}

export const createCategoryService = async (category_name) => {
    const insertedCategory = await ProductCategory.create({ category_name });
    return insertedCategory;
}