import FreeOngkir from "../models/freeOngkir.model.js"

export const getFreeOngkirService = async () => {
    const freeOngkir = await FreeOngkir.findAll();
    return freeOngkir[0];
}

export const migrateFreeOngkirService = async () => {
    const current = await getFreeOngkirService();
    if (!current) {
        await FreeOngkir.create({ 
            minimumPaymentAmount: 0,
            maximumFreeOngkir: 0,
            status: "Inactive"
        })
    }
}

export const updateFreeOngkirService = async (freeOngkirId, status, maximumFreeOngkir, minimumPaymentAmount) => {
    await FreeOngkir.update(
        {
            status: status ? "Active" : "Inactive",
            maximumFreeOngkir: maximumFreeOngkir,
            minimumPaymentAmount: minimumPaymentAmount
        },
        { where: { freeOngkirId } }
    )
}

export const updateFreeOngkirStatusService = async (freeOngkirId, status) => {
    await FreeOngkir.update(
        {
            status: status ? "Active" : "Inactive"
        },
        { where: { freeOngkirId } }
    )
}