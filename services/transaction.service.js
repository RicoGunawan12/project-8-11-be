import { ProductModel, ProductVariantModel, TransactionDetailModel, TransactionHeaderModel, UserAddressModel, UserModel } from "../association/association.js"
import { createOrderKomship } from "../integration/komship.integration.js";
import { checkOutVATransactionXendit, createCreditCardTransactionXendit, createQrisTransactionXendit } from "../integration/xendit.integration.js";
import { Op } from "sequelize";

export const getAllTransactionsService = async (status) => {
    const transactions = await TransactionHeaderModel.findAll({
        include: [
            {
                model: TransactionDetailModel,
                include: {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel
                    }
                }
            },
            {
                model: UserModel,
                attributes: ['userId', 'username', 'email'],
                include: {
                    model: UserAddressModel,
                }
            }
        ],
        where: { 
            status: {
                [Op.like]: `%${status}%`
            } 
        }
    })
    return transactions;
}

export const getTransactionsByUserService = async (userId, status) => {
    const transactions = await TransactionHeaderModel.findAll({
        include: [
            {
                model: TransactionDetailModel,
                include: {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel
                    }
                }
            },
            {
                model: UserModel,
                attributes: ['userId', 'username', 'email'],
                include: {
                    model: UserAddressModel,
                }
            }
        ],
        where: { 
            userId: userId, 
            status: {
                [Op.like]: `%${status}%`
            } 
        }
    })
    return transactions;
}

export const getTransactionsByIdService = async (transactionId) => {
    const transactions = await TransactionHeaderModel.findOne({
        include: [
            {
                model: TransactionDetailModel,
                include: {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel
                    }
                }
            },
            {
                model: UserModel,
                attributes: ['userId', 'username', 'email'],
                include: {
                    model: UserAddressModel,
                }
            },
            
        ],
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
    expedition,
    shippingType,
    deliveryFee,
    deliveryCashback,
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
        expedition,
        shippingType,
        deliveryFee,
        deliveryCashback,
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
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'Waiting for shipping',
            gatewayResponse: JSON.stringify(gatewayResponse)
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    return updatedTransaction;
}

export const createKomshipOrderService = async (transaction) => {

    const createdKomshipOrder = await createOrderKomship(transaction);
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            komshipOrderNumber: createdKomshipOrder.komshipResponse.data.order_no,
            komshipOrderId: createdKomshipOrder.komshipResponse.data.order_id,
            status: 'Shipping'
        },
        {
            where: {
                transactionId: transaction.transactionId
            },
        }
    )

    return createdKomshipOrder
}

export const requestPickupTransactionService = async (transaction) => {
    
}