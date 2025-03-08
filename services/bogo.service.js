import { Op } from "sequelize";
import  Bogo  from "../models/bogo.model.js";
import { getProductVariantByIdSevice } from "./productVariantService.js";

export const getBogoService = async () => {
    try {
        const bogos = await Bogo.findAll({
            attributes:[
                "bogoId",
                "bogoName",
                "startDate",
                "endDate"
            ],
        });



        return bogos;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createBogoService = async (productId, bogoName, startDate, endDate, listVariantId) => {
    try {
        const bogo = await Bogo.create({
            product_id : productId,
            bogoName : bogoName,
            variant : listVariantId,
            startDate : startDate,
            endDate : endDate,
        });

        return bogo;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteBogoService = async (bogoId) => {
    try {
        const deletedBogo = await Bogo.destroy({ where: { bogoId } });
        if (deletedBogo === 0) {
            throw new Error("Bogo not found!");
        }
        return deletedBogo;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getBogoByIdService = async (bogoId) => {
    try {
        const bogo = await Bogo.findOne({
            where: { bogoId }
        });

        const variants = bogo.variant.split(',');

        const variantData = [];
        
        for (const variant of variants) {
            const productVariant = await getProductVariantByIdSevice(variant);
            variantData.push(productVariant);
        }

 



        return {bogo, variantData};
    } catch (error) {
        throw new Error(error.message);
    }
};
export const updateBogoService = async (bogoId, productId, startDate, endDate, listVariant) => {
    try {
        const updatedBogo = await Bogo.update(
            { productId, startDate, endDate, variant: listVariant },
            { where: { bogoId } }
        );
        return updatedBogo;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createBogoDetailService = async (listVariantId, bogoId) => {
    const result = [];

    for (const variantId of listVariantId) {
        try {
            const bogoDetail = await BogoDetail.create({
                variant: variantId,
                bogoId: bogoId
            });

            result.push(bogoDetail);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return result;
}
