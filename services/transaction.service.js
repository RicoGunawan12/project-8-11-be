import { ProductModel, ProductVariantModel, TransactionDetailModel, TransactionHeaderModel } from "../association/association.js"
import { checkOutVATransactionXendit, createCreditCardTransactionXendit, createQrisTransactionXendit } from "../integration/xendit.integration.js";


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

export const getTransactionsByIdService = async (transactionId) => {
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
        where: { transactionId: transactionId }
    })
    return transactions;
}

export const createTransactionService = async (
    userId,
    addressId,
    voucherId,
    transactionDate,
    paymentMethod,
    gatewayResponse,
    status,
    deliveryFee,
    paymentDeadline,
    notes,
    totalPrice,
    totalWeight
) => {
    const transaction = await TransactionHeaderModel.create({
        userId,
        addressId,
        voucherId,
        transactionDate,
        paymentMethod,
        gatewayResponse,
        status,
        deliveryFee,
        paymentDeadline,
        notes,
        totalPrice,
        totalWeight
    })
    return transaction;
}

export const createTransactionDetailService = async (products) => {
    const transactionDetails = await TransactionDetailModel.bulkCreate(products);
    return transactionDetails;
}

export const checkOutCreditTransactionService = async (
    transactionId,
    amount,
    card_number,
    card_exp_month,
    card_exp_year,
    card_cvn,
    is_multiple_use,
    should_authenticate,
    card_holder_email,
    card_holder_first_name,
    card_holder_last_name,
    card_holder_phone_number,
) => {
    const response = await createCreditCardTransactionXendit(
        transactionId,
        amount,
        card_number,
        card_exp_month,
        card_exp_year,
        card_cvn,
        is_multiple_use,
        should_authenticate,
        card_holder_email,
        card_holder_first_name,
        card_holder_last_name,
        card_holder_phone_number
    )
    return response;
}

export const checkOutQrisTransactionService = async (transactionId, amount) => {
    const response = await createQrisTransactionXendit(transactionId, amount);
    return response;
}

export const checkOutVATransactionService = async (transactionId, amount, bank) => {
    const response = await checkOutVATransactionXendit(transactionId, amount, bank);
    return response;
}

export const updateTransactionStatusService = async (transactionId, gatewayResponse) => {
    TransactionHeaderModel.update(
        {
            status: 'PAID',
            gatewayResponse: gatewayResponse.stringify()
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
}