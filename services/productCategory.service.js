import { Op, Sequelize } from "sequelize";
import { ProductCategoryModel, ProductCoverModel, ProductModel, ProductVariantModel, PromoDetailModel, PromoModel, RatingModel } from "../association/association.js";
import sequelize from "../config/database.js";


export const getCategoriesService = async (search, limit) => {
    const query = {
        where: {
            productCategoryName: {
                [Op.like]: `%${search}%`
            }
        }
    };

    if (limit) {
        query.limit = limit;
    }

    const categories = await ProductCategoryModel.findAll(query);
    return categories;
};

export const createCategoryService = async (productCategoryName, productCategoryPhoto) => {
    const existingCategory = await ProductCategoryModel.findOne({ where: { productCategoryName } });
    if (existingCategory) {
        throw new Error('Product category already exists');
    }
    const insertedCategory = await ProductCategoryModel.create({ productCategoryName, productCategoryPhoto });
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


export const updateCategoryService = async (productCategoryId, productCategoryName, productCategoryPhoto) => {
    const category = ProductCategoryModel.findOne({ productCategoryId });
    if (!category) {
        throw new Error(`Category not found!`);
    }

    const existingCategory = await ProductCategoryModel.findOne({ where: { productCategoryName } });
    if (existingCategory && existingCategory.productCategoryId !== productCategoryId) {
        throw new Error('Product category already exists');
    }

    await ProductCategoryModel.update(
        { 
            productCategoryName: productCategoryName,
            productCategoryPhoto: productCategoryPhoto
        },
        { where: { productCategoryId: productCategoryId } }
    );

    return { message: 'Category updated successfully' };
}

export const getCategoryWithProductService = async () => {
    // First get categories
    const categories = await ProductCategoryModel.findAll({
        attributes: [
            ['product_category_name', 'productCategoryName'],
            'productCategoryId'  // or whatever your primary key is
        ]
    });
    console.log("categoriy: ", categories)
    // Then for each category, get products with variants
    const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
            // console.log(category.productCategoryName);
            // console.log(category.productCategoryId);
            
            const products = await ProductModel.findAll({
                where: {
                    productCategoryId: category.productCategoryId,
                    productActivityStatus: "active"
                },
                attributes: [
                    "productId",
                    "productName",
                    "productSize",
                    "productCode",
                    "productDescription",
                    "defaultImage",
                    "productWeight",
                    "productLength",
                    "productWidth",
                    "productHeight",
                    "isBestSeller",
                    [sequelize.literal('(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)'), 'averageRating'],
       [sequelize.literal('(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)'), 'countRating']
                ],
                include: [
                    {
                        model: ProductVariantModel,
                        attributes: [
                            "productVariantId",
                            "productColor",
                            "sku",
                            "productPrice",
                            "productStock",
                            "productImage",
                        ]
                    },
                    {
                        model: PromoDetailModel,
                        attributes: ['promoDetailId'],
                        required: false,
                        include: [
                            {
                                model: PromoModel,
                                required: false,
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
                      },
                    //   {
                    //     model: RatingModel,
                    //     required: false,
                    //     attributes: [],
                    //     // attributes: ['rating', 'comment'],
                    //   }
                      
                ],
                // group: ["products.product_id"],
                limit: 8
            });

            return {
                ...category.dataValues,
                products
            };
        })
    );

    const allProducts = await ProductModel.findAll({
        attributes: [
            "productId",
            "productName",
            "productSize",
            "productCode",
            "productDescription",
            "defaultImage",
            "productWeight",
            "productLength",
            "productWidth",
            "productHeight",
            [sequelize.literal('(SELECT AVG(rating) FROM ratings WHERE ratings.product_id = products.product_id)'), 'averageRating'],
       [sequelize.literal('(SELECT COUNT(rating) FROM ratings WHERE ratings.product_id = products.product_id)'), 'countRating']
        ],
        include: [
            {
                model: ProductVariantModel,
                attributes: [
                    "productVariantId",
                    "productColor",
                    "sku",
                    "productPrice",
                    "productStock",
                    "productImage",
                ]
            },
            {
                model: PromoDetailModel,
                attributes: ['promoDetailId'],
                required: false,
                include: [
                    {
                        model: PromoModel,
                        required: false,
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
            },
            {
              model: ProductCoverModel,
              attributes: ["productCover"],
              order: [['productCover', "DESC"]]
            }
            // {
            //     model: RatingModel,
            //     required: false,
            //     // attributes: [],
            //     attributes: ['rating', 'comment'],
            // }
        ],
        // group: ["products.product_id"],
        limit: 8
    });

    categoriesWithProducts.unshift({
        productCategoryName: "All",
        productCategoryId: null, 
        products: allProducts
    });

    return categoriesWithProducts;
};