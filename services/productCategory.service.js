import { ProductCategoryModel } from "../association/association.js";


export const getCategoriesService = async () => {
    const categories = await ProductCategory.findAll();
    return categories;
}

export const createCategoryService = async (categoryName) => {
    const existingCategory = await ProductCategoryModel.findOne({ where: { categoryName } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }
    const insertedCategory = await ProductCategoryModel.create({ categoryName });
    return insertedCategory;
}

export const getCategoryByName = async (categoryName) => {
    const categoryByName = await ProductCategoryModel.findOne({ where: { categoryName } });
    if (!categoryByName) {
        throw new Error('There is no ' + categoryName + " category");
    }
    return categoryByName;
}