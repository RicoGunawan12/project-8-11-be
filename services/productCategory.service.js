import { Op } from "sequelize";
import { ProductCategoryModel, ProductModel, ProductVariantModel, PromoDetailModel, PromoModel } from "../association/association.js";


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

export const deleteCategoryService = async (productCategoryId) => {
    try {
        const category = await ProductCategoryModel.destroy({
            where: {
                productCategoryId: productCategoryId
            }
        })

        if (category === 0) {
            throw new Error('Category not found');
        }

    } catch (error) {
        throw new Error(`Error deleting category: ${error.message}`);
    }
}


export const updateCategoryService = async (productCategoryId, productCategoryName) => {
    const category = ProductCategoryModel.findOne({ productCategoryId });
    if (!category) {
        throw new Error(`Category not found!`);
    }

    const existingCategory = await ProductCategoryModel.findOne({ where: { productCategoryName } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }

    await ProductCategoryModel.update(
        { productCategoryName: productCategoryName },
        { where: { productCategoryId: productCategoryId } }
    );

    return { message: 'Category updated successfully' };
}

export const getCategoryWithProductService = async () => {
    const category = ProductCategoryModel.findAll({
        include: [
            {
                model: ProductModel,
                include: [
                    {
                        model: ProductVariantModel
                    },
                    {
                        model: PromoDetailModel,
                        attributes: ['promoDetailId'],
                        include: [
                            {
                                model: PromoModel,
                                where: {
                                    startDate: {
                                        [Op.lte]: new Date(), 
                                    },
                                    endDate: {
                                        [Op.gte]: new Date(),
                                    },
                                },
                            },
                        ]
                      }
                ],
                limit: 8
            }
        ]
    })
    return category
}