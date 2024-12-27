import { Op } from "sequelize";
import { ProductModel, ProductVariantModel, PromoDetailModel, PromoModel } from "../association/association.js"


export const getPromoService = async () => {
    const promos = await PromoModel.findAll({
        include: [
            {
                model: PromoDetailModel,
                include: [
                    {
                        model: ProductModel,
                        attributes: ['productName', 'defaultImage'],
                        include: [
                            {
                                model: ProductVariantModel,
                                attributes: ['productImage', 'productSize', 'productColor', 'productPrice'],
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
            endDate: { [Op.gte]: today },  
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