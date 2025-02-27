import { ProductCategoryModel, ProductCoverModel, ProductModel, ProductVariantModel, TransactionDetailModel, TransactionHeaderModel, UserAddressModel, UserModel } from "../association/association.js"
import { createOrderKomship, deliveryDetailKomship, historyAWB, printLabelKomship, requestPickUpKomship } from "../integration/komship.integration.js";
import { checkOutVATransactionXendit, createCreditCardTransactionXendit, createPlanXendit, createQrisTransactionXendit, getTransactionXendit } from "../integration/xendit.integration.js";
import { Op, Sequelize, where } from "sequelize";
import { generateReadableId } from "../utils/utility.js";
import { getPickUpPointService } from "./address.service.js";
import sequelize from "../config/database.js";
import { getContactToSendService } from "./contact.service.js";
import { read } from "fs";
import { getEmailTemplateService, sendEmailPostPayment } from "./email.service.js";

export const getAllTransactionsService = async (status, startDate, endDate, search, offset, limit) => {
    const whereConditions = {
        status: status
            ? { [Op.and]: [{ [Op.eq]: status }, { [Op.ne]: 'Unpaid' }] }
            : { [Op.ne]: 'Unpaid' },
    };

    if (startDate && endDate && startDate === endDate) {
        // const date = new Date(startDate);
        // const nextDay = new Date(date);
        // nextDay.setDate(date.getDate() + 1);
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);

        whereConditions.transactionDate = {
            [Op.gte]: startDate,
            [Op.lt]: endOfDay,
        };
    } else {
        if (startDate) {
            whereConditions.transactionDate = { [Op.gte]: new Date(startDate) };
        }

        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            whereConditions.transactionDate = whereConditions.transactionDate
                ? { ...whereConditions.transactionDate, [Op.lte]: endOfDay }
                : { [Op.lte]: endOfDay };
        }
    }

    const transactions = await TransactionHeaderModel.findAll({
        include: [
            {
                model: TransactionDetailModel,
                include: {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel,
                    },
                },
            },
            {
                model: UserModel,
                attributes: ["userId", "fullName", "email"],
            },
            {
                model: UserAddressModel
            }
        ],
        where: {
            [Op.or]: [
                {
                    readableId: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    userId: {
                        [Op.in]: sequelize.literal(`
                            (SELECT user_id FROM users WHERE full_name like '%${search}%')
                        `)
                    }
                }
            ],
            ...whereConditions
        },
        order: [["transactionDate", "DESC"]],
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
    });

    return transactions;
};

export const countTransactionsService = async (status, startDate, endDate) => {
    const whereConditions = {
        status: status
            ? { [Op.and]: [{ [Op.eq]: status }, { [Op.ne]: 'Unpaid' }] }
            : { [Op.ne]: 'Unpaid' }
    };

    if (startDate && endDate && startDate === endDate) {
        const date = new Date(startDate);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        whereConditions.transactionDate = {
            [Op.gte]: date,
            [Op.lt]: nextDay,
        };
    } else {
        if (startDate) {
            whereConditions.transactionDate = { [Op.gte]: new Date(startDate) };
        }

        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            whereConditions.transactionDate = whereConditions.transactionDate
                ? { ...whereConditions.transactionDate, [Op.lte]: endOfDay }
                : { [Op.lte]: endOfDay };
        }
    }


    const transactionCount = await TransactionHeaderModel.count({
        where: whereConditions,
    });

    return transactionCount;
};


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
                attributes: ['userId', 'fullName', 'email'],
            },
            {
                model: UserAddressModel
            }
        ],
        where: {
            userId: userId,
            status: {
                [Op.like]: `%${status}%`
            }
        },
        order: [['transactionDate', 'DESC']]
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
                attributes: ['userId', 'fullName', 'email'],
            },
            {
                model: UserAddressModel
            }
        ],
        where: { transactionId: transactionId }
    })
    return transactions;
}

export const getSearchTransactionService = async(search, startDate, endDate) => {
    let currentTransactionDateCondition = {}

    if (startDate !== null && startDate !== undefined && startDate !== "") 
        currentTransactionDateCondition = {
            ...currentTransactionDateCondition,
            [Op.gte]: new Date(startDate)
        }

    if (endDate !== null && endDate !== undefined && endDate !== "")
        currentTransactionDateCondition = {
            ...currentTransactionDateCondition,
            [Op.lte]: new Date(endDate)
        }

    const transactions = await TransactionHeaderModel.findAll({
        include: [
            {
                model: TransactionDetailModel,
                include : {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel
                    }
                }
            },
            {
                model: UserModel,
                attributes: ['userId', 'fullName', 'email']
            },
            {
                model: UserAddressModel
            }
        ],
        where: {
            [Op.or]: [
                {
                    readableId: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    '$user.full_name$': {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    status: {
                        [Op.like]: `%${search}%`
                    }
                }
            ],
            status: {
                [Op.ne]: 'Unpaid'
            },
            transactionDate: currentTransactionDateCondition
        },
    });

    return transactions
}

export const createTransactionService = async (
    userId,
    addressId,
    voucherCode,
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
    totalWeight,
    customerNotes,
    freeOngkir
) => {
    const transaction = await TransactionHeaderModel.create({
        readableId: generateReadableId(),
        userId,
        addressId,
        voucherCode,
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
        totalWeight,
        customerNotes,
        freeOngkir
    })
    return transaction;
}

export const createTransactionDetailService = async (products) => {
    for (const product of products) {
        const { productVariantId, quantity } = product;

        const productVariant = await ProductVariantModel.findOne({
            where: { productVariantId },
            attributes: ['productStock']
        });

        if (!productVariant) {
            throw new Error(`Product variant not found.`);
        }

        if (productVariant.productStock - quantity < 0) {
            throw new Error(
                `Insufficient stock. Available: ${productVariant.productStock}, Requested: ${quantity}.`
            );
        }
    }

    const transactionDetails = await TransactionDetailModel.bulkCreate(products);

    for (const product of products) {
        const { productVariantId, quantity } = product;

        await ProductVariantModel.update(
            { productStock: sequelize.literal(`product_stock - ${quantity}`) },
            { where: { productVariantId } }
        );
    }

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
    const getTransaction = await getTransactionsByIdService(transactionId);

    const response = await checkOutVATransactionXendit(transactionId, amount, bank, getTransaction.user.fullName);
    return response;
}

export const updateTransactionStatusService = async (transactionId, gatewayResponse, paymentMethod) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'Waiting for shipping',
            gatewayResponse: JSON.stringify(gatewayResponse),
            paymentMethod: paymentMethod
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    return updatedTransaction;
}

export const updateExpiredTransaction = async (transactionId, gatewayResponse) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'Failed',
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

export const getTransactionXenditService = async (actionId) => {
    const transaction = await getTransactionXendit(actionId);
    return transaction;
}

export const createKomshipOrderService = async (transaction) => {

    const adminAddress = await getPickUpPointService();
    
    const contact = await getContactToSendService();
    // if (adminAddress.length === 0) {

    // }
    const createdKomshipOrder = await createOrderKomship(transaction, adminAddress[0], contact);
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            komshipOrderNumber: createdKomshipOrder.komshipResponse.data.order_no,
            komshipOrderId: createdKomshipOrder.komshipResponse.data.order_id,
            // status: 'Shipping'
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
    try {
        const pickupResponse = await requestPickUpKomship(transaction.komshipOrderNumber);
        const updatedTransaction = await TransactionHeaderModel.update(
            {
                status: 'Shipping',
                awb: pickupResponse.data[0].awb ? pickupResponse.data[0].awb : "-"
            },
            {
                where: {
                    transactionId: transaction.transactionId
                },
            }
        )
        return updatedTransaction;
    } catch (error) {
 
        
        throw new Error("Failed to request pickup");
    }

    return null;
}

export const deliveryDetailService = async (orderNumber) => {
    const deliveryDetail = await deliveryDetailKomship(orderNumber);
    return deliveryDetail;
}

export const printLabelService = async (komshipOrderNumbers) => {
    const formattedString = komshipOrderNumbers.join(',');
    const komshipLabel = await printLabelKomship(formattedString);
    return komshipLabel;
}

export const monthlySalesReportService = async (year, month) => {

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const prevStartDate = new Date(year, month - 2, 1);
    const prevEndDate = new Date(year, month - 1, 0, 23, 59, 59);

    const transactions1 = await TransactionHeaderModel.findAll({
        where: {
            transactionDate: {
                [Op.between]: [prevStartDate, prevEndDate],
            },
            status: {
                [Op.notIn]: ["Unpaid", "Cancelled", "Failed", "Return"],
            },
        },
    })

    const transactions2 = await TransactionHeaderModel.findAll({
        where: {
            transactionDate: {
                [Op.between]: [startDate, endDate],
            },
            status: {
                [Op.notIn]: ["Unpaid", "Cancelled", "Failed", "Return"],
            },
        },
    })

    const totalSales1 = transactions1.reduce((sum, transaction) => {
        return sum + transaction.totalPrice - transaction.deliveryFee;
    }, 0);

    const totalSales2 = transactions2.reduce((sum, transaction) => {
        return sum + transaction.totalPrice - transaction.deliveryFee;
    }, 0);

    const growthPercentage = totalSales1
        ? ((totalSales2 - totalSales1) / totalSales1) * 100
        : 100;

    const growthCountPercentage = transactions1.length !== 0
        ? ((transactions2.length - transactions1.length) / transactions1.length) * 100
        : 100;

    return {
        totalSales: totalSales2,
        transactionCount: transactions2.length,
        growthPercentage,
        growthCountPercentage
    }
}

export const allMonthSalesAnalyticService = async (year) => {
    const monthlySales = await TransactionHeaderModel.findAll({
        attributes: [
            [Sequelize.fn("MONTH", Sequelize.col("transaction_date")), "month"],
            [Sequelize.fn("SUM", Sequelize.literal("total_price - delivery_fee")), "totalSales"],
        ],
        where: {
            transactionDate: {
                [Op.between]: [
                    new Date(year, 0, 1),
                    new Date(year, 11, 31, 23, 59, 59),
                ],
            },
            status: {
                [Op.notIn]: ["Unpaid", "Cancelled", "Failed", "Return"],
            },
        },
        group: [Sequelize.fn("MONTH", Sequelize.col("transaction_date"))],
        order: [[Sequelize.fn("MONTH", Sequelize.col("transaction_date")), "ASC"]],
    });


    const salesByMonth = Array.from({ length: 12 }, (_, index) => {
        const monthData = monthlySales.find(
            (data) => data.dataValues.month === index + 1
        );
        return {
            // month: index + 1, 
            totalSales: monthData ? parseFloat(monthData.dataValues.totalSales) : 0,
        };
    });

    return salesByMonth
}

export const fetchSalesByCategoryService = async (year, month) => {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const salesData = await TransactionHeaderModel.findAll({
            where: {
                transactionDate: {
                    [Op.between]: [startDate, endDate],
                },
                status: {
                    [Op.notIn]: ["Unpaid", "Cancelled", "Failed", "Return"],
                },
            },
            include: [
                {
                    model: TransactionDetailModel,
                    attributes: [],
                    include: [
                        {
                            model: ProductVariantModel,
                            attributes: [],
                            include: [
                                {
                                    model: ProductModel,
                                    attributes: [],
                                    include: [
                                        {
                                            model: ProductCategoryModel,
                                            attributes: ["productCategoryName"],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            attributes: [
                [Sequelize.fn("SUM", Sequelize.col("transaction_details.paid_product_price")), "totalSales"],
                [Sequelize.col("transaction_details->product_variant->product->product_category.product_category_name"), "categoryName"],
            ],
            group: [
                "transaction_details->product_variant->product->product_category.product_category_name",
                "transaction_details->product_variant->product->product_category.product_category_id",
            ], // Group by category name
            raw: true, // Return raw data
        });


        return salesData;
    } catch (error) {
        console.error("Error fetching sales by category:", error);
        throw error;
    }
};


export const updateTransactionDeliveryService = async (order_no, status) => {
    const response = TransactionHeaderModel.update({
        status: "Done",
    }, {
        where: {
            komshipOrderNumber: order_no
        }
    });
    return response;
}

export const cancelTransactionService = async (transactionId) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'Cancelled',
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
 
    
    // if (updatedTransaction[0] === 0) {
    //     throw new Error("There is no change or no transaction");
    // }
    return updatedTransaction;
}

export const onReviewTransactionService = async (transactionId, reason) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'On Review Cancel',
            notes: reason
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    if (updatedTransaction[0] === 0) {
        throw new Error("There is no change or no transaction");
    }
    return updatedTransaction;
}

export const onReviewReturnTransactionService = async (transactionId, reason) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'On Review Return',
            notes: reason
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    if (updatedTransaction[0] === 0) {
        throw new Error("There is no change or no transaction");
    }
    return updatedTransaction;
}

export const returnTransactionService = async (transactionId) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: 'Waiting for Return',
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    if (updatedTransaction[0] === 0) {
        throw new Error("There is no change or no transaction");
    }
    return updatedTransaction;
}

export const payTransactionService = async (transaction, productsInCart, disc, freeOngkir) => {
    const response = await createPlanXendit(transaction, productsInCart, disc, freeOngkir);
    // console.log(response);
    return response
}

export const checkTransactionWithVoucher = async (voucherCode, userId) => {
    try {
        const transaction = await TransactionHeaderModel.findOne({
            where: {
                voucherCode,
                userId,
                status: {
                    [Op.not]: "Cancelled"
                }
            }
        });

        if (transaction) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking transaction with voucher:", error);
        throw new Error("An error occurred while checking the transaction.");
    }
};

export const updatePaymentLinkService = async (transaction, paymentLink) => {
 
 

    const updatedTransaction = await TransactionHeaderModel.update(
        {
            paymentLink: paymentLink
        },
        {
            where: {
                transactionId: transaction.transactionId
            },
        }
    )
}

export const updateTransactionService = async (transactionId, status) => {
    const updatedTransaction = await TransactionHeaderModel.update(
        {
            status: status
        },
        {
            where: {
                transactionId: transactionId
            },
        }
    )
    return updatedTransaction;
}

export const rollbackTransaction = async (transactionId) => {
    const transaction = await sequelize.transaction();
  
    try {
      const transactionDetails = await TransactionDetailModel.findAll({
        where: { transactionId }
      });
  
      if (!transactionDetails || transactionDetails.length === 0) {
        throw new Error(`No transaction details found for transaction ID: ${transactionId}`);
      }
  
      for (const detail of transactionDetails) {
        const { productVariantId, quantity } = detail;
  
        const productVariant = await ProductVariantModel.findByPk(productVariantId, { transaction });
  
        if (!productVariant) {
          throw new Error(`Product variant not found: ${productVariantId}`);
        }
  
        productVariant.productStock = productVariant.productStock + quantity;
 
        
        await productVariant.save({ transaction });
      }
  
      await transaction.commit();
  
      return { message: `Transaction ${transactionId} has been rolled back successfully.` };
    } catch (error) {
      // Rollback on error
      await transaction.rollback();
      console.error(error);
      throw new Error(error.message);
    }
  };


export const trackDeliveryService = async (awb, shipping) => {
    const historyAwb = await historyAWB(awb, shipping);
    return historyAwb;
}

export const sendInvoiceByEmailService = async (id) => {
    const transaction = await TransactionHeaderModel.findOne({
        include: [
            {
                model: TransactionDetailModel,
                include: {
                    model: ProductVariantModel,
                    include: {
                        model: ProductModel,
                    },
                },
            },
            {
                model: UserModel
            }
        ],
        where: {
            transactionId: id
        }
    });

    await sendEmailPostPayment(transaction.user.email, transaction.user.fullName, "id", transaction);

    return transaction;
}