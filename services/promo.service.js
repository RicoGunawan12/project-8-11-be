import { Op } from "sequelize";
import { ProductCategoryModel, ProductCoverModel, ProductModel, ProductVariantModel, PromoDetailModel, PromoHistoryModel, PromoModel } from "../association/association.js"


export const getPromoService = async () => {
    const promos = await PromoModel.findAll({
        include: [
            {
                model: PromoDetailModel,
                include: [
                    {
                        model: ProductModel,
                        attributes: ['productName', 'defaultImage', 'productSize'],
                        include: [
                            {
                                model: ProductVariantModel,
                                attributes: ['productImage', 'productColor', 'productPrice'],
                            },
                            {
                                model: ProductCoverModel,
                                attributes: ["productCover"]
                            }
                        ]
                    },
                ],
            },
        ],
    });
    return promos;
};

export const createPromoService = async (promoName, promoAmount, startDate, endDate) => {
    const promo = await PromoModel.create({
        promoName, promoAmount, startDate, endDate
    });
    return promo;
}

export const createPromoDetailService = async (promoId, products) => {
    const promoDetails = products.map((product) => ({
        productId: product.productId,
        promoId: promoId,
    }));
    await PromoDetailModel.bulkCreate(promoDetails);
}

export const deletePromoService = async (promoId) => {
    const deletedPromo = await PromoModel.destroy({ where: { promoId: promoId } });
    if (deletedPromo === 0) {
        throw new Error("Promo not found!");
    }
    return deletedPromo;
}

export const checkPromoService = async (productId) => {
    try {
        const today = new Date();

        const promoDetail = await PromoDetailModel.findOne({
            where: { productId },
            include: [
                {
                    model: PromoModel,
                    as: "promo",
                    where: {
                        startDate: { [Op.lte]: today },
                        endDate: { [Op.gte]: new Date().setHours(0, 0, 0, 0) },
                    },
                },
            ],
        });
        return promoDetail;
    } catch (error) {
        console.error("Error checking promo:", error);
        throw new Error("Failed to check promotion status");
    }
}

export const getPromoByIdService = async (promoId) => {
    const promo = await PromoModel.findOne({
        include: [
            {
                model: PromoDetailModel,
                include: [
                    {
                        model: ProductModel,
                        attributes: [
                            "productId",
                            "productName",
                            "productDescription",
                            "defaultImage",
                            "productSize",
                            "productWeight",
                            "productLength",
                            "productWidth",
                            "productHeight",
                        ],
                        include: [
                            {
                                model: ProductCategoryModel,
                                attributes: ["productCategoryName"],
                            },
                            {
                                model: ProductVariantModel,
                                attributes: [
                                    "productVariantId",
                                    "productColor",
                                    "sku",
                                    "productPrice",
                                    "productStock",
                                    "productImage",
                                ],
                            },
                        ]
                    },
                ],
            },
        ],
        where: { promoId }
    });
    return promo;
}

export const updatePromoService = async (promoId, promoName, promoAmount, startDate, endDate, products) => {

    const existingPromoDetails = await PromoDetailModel.findAll({
        where: { promoId },
    });

    const existingProductIds = existingPromoDetails.map((detail) => detail.productId);

    const newProductIds = products.map((product) => product.productId);

    const productsToRemove = existingProductIds.filter(
        (productId) => !newProductIds.includes(productId)
    );

    const productsToAdd = products.filter(
        (product) => !existingProductIds.includes(product.productId)
    );

    if (productsToRemove.length > 0) {
        await PromoDetailModel.destroy({
            where: {
                promoId,
                productId: productsToRemove,
            },
        });
    }

    if (productsToAdd.length > 0) {
        const promoDetailsToAdd = productsToAdd.map((product) => ({
            productId: product.productId,
            promoId,
        }));
        await PromoDetailModel.bulkCreate(promoDetailsToAdd);
    }

    const updatedPromo = await PromoModel.update(
        {
            promoName,
            promoAmount,
            startDate,
            endDate,
        },
        {
            where: { promoId },
        }
    );

    return updatedPromo;
};



export const createPromoHistory = async (promoId, userId, productId) => {
    PromoHistoryModel.create({ promoId, userId, productId })
}