import CODData from "../models/codData.model.js"

export const getCODDataService = async () => {
    const codData = await CODData.findAll();
    return codData[0];
}

export const updateCODDataService = async (codId, maximumPaymentAmount) => {
    await CODData.update({
            maximumPaymentAmount: maximumPaymentAmount
        },
        {
            where: { codId }
        }
    )
}

export const migrateCODDataService = async () => {
    const codData = await getCODDataService();
    if (!codData) {
        const body = {
            maximumPaymentAmount: 0
        }
        await CODData.create({ body });
    }
}