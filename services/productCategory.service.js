import ProductCategory from "../models/productCategory.model.js"


export const getCategoriesService = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
}

export const createCategoryService = async (category_name) => {
    const existingCategory = await ProductCategory.findOne({ where: { category_name } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }
    const insertedCategory = await ProductCategory.create({ category_name });
    return insertedCategory;
}

export const getCategoryByName = async (category_name) => {
    const categoryByName = await ProductCategory.findOne({ where: { category_name } });
    if (!categoryByName) {
        throw new Error('There is no ' + category_name + " category");
    }
    return categoryByName;
}