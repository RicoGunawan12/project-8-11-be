import { Op } from "sequelize";
import { ProductCategoryModel } from "../association/association.js";


export const getCategoriesService = async (search) => {
    const categories = await ProductCategoryModel.findAll({
        where: {
            productCategoryName: {
                [Op.like]: `%${search}%`
            }
        }
    });
    return categories;
}

export const createCategoryService = async (productCategoryName) => {
    const existingCategory = await ProductCategoryModel.findOne({ where: { productCategoryName } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }
    const insertedCategory = await ProductCategoryModel.create({ productCategoryName });
    return insertedCategory;
}

export const getCategoryByName = async (productCategoryName) => {
    const categoryByName = await ProductCategoryModel.findOne({ where: { productCategoryName } });
    if (!categoryByName) {
        throw new Error('There is no ' + productCategoryName + " category");
    }
    return categoryByName;
}