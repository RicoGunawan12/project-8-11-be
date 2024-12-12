import { ProductModel, PromoDetailModel, PromoModel } from "../association/association.js"


export const getPromoService = async () => {
    const promos = await PromoModel.findAll({
        include: [
            {
                model: PromoDetailModel,
                include: [
                    {
                        model: ProductModel,
                        attributes: ['productName', 'defaultImage']
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
        productId: product.id,
        promoId: promoId,
    }));
    PromoDetailModel.bulkCreate(promoDetails);
}