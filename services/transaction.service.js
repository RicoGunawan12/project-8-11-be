import { ProductModel, ProductVariantModel, TransactionDetailModel, TransactionHeaderModel } from "../association/association.js"


export const getAllTransactionsService = async () => {
    const transactions = await TransactionHeaderModel.findAll({
        include: {
            model: TransactionDetailModel,
            include: {
                model: ProductVariantModel,
                include: {
                    model: ProductModel
                }
            }
        }
    })
    return transactions;
}

export const getTransactionsByUserService = async (userId) => {
    const transactions = await TransactionHeaderModel.findAll({
        include: {
            model: TransactionDetailModel,
            include: {
                model: ProductVariantModel,
                include: {
                    model: ProductModel
                }
            }
        },
        where: { userId: userId }
    })
    return transactions;
}

export const createTransactionService = async () => {
    // TransactionDetailModel.bulkCreate()
}