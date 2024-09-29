import ProductCategory from "../models/productCategory.model.js"


export const getCategoriesService = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
}

export const createCategoryService = async (categoryName) => {
    const existingCategory = await ProductCategory.findOne({ where: { categoryName } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }
    const insertedCategory = await ProductCategory.create({ categoryName });
    return insertedCategory;
}

export const getCategoryByName = async (categoryName) => {
    const categoryByName = await ProductCategory.findOne({ where: { categoryName } });
    if (!categoryByName) {
        throw new Error('There is no ' + categoryName + " category");
    }
    return categoryByName;
}