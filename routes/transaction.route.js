import express from 'express';
import { generalValidator } from './../validator/general/general.validator.js';
import { transactionSchema } from '../schema/model/transaction.schema.js';
import { validateSchema } from './../validator/validate.js';
import { checkoutCreditSchema } from '../schema/transaction/checkout/checkoutCredit.schema.js';
import { checkoutQrisSchema } from '../schema/transaction/checkout/checkoutQris.schema.js';
import { checkoutVASchema } from './../schema/transaction/checkout/checkoutVA.schema.js';
import { updateStatusValidator } from './../validator/transaction/updateStatus.validator.js';
import { transactionIdSchema } from '../schema/general/transactionId.schema.js';
import { allMonthSalesAnalytic, checkOutCreditTransaction, checkOutQrisTransaction, checkOutVATransaction, createTransaction, deliveryDetail, fetchSalesByCategory, getAllTransactions, getTransactionById, getTransactionsByUser, monthlySalesReport, printLabel, requestPickupTransaction, updateTransactionDelivery, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, generalMiddleware, userMiddleware } from '../middleware/auth.middleware.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, generalValidator(transactionSchema), validateSchema, createTransaction);

TransactionRoute.post('/checkout-credit', userMiddleware,generalValidator(checkoutCreditSchema), validateSchema, checkOutCreditTransaction);

TransactionRoute.post('/checkout-qris', userMiddleware, generalValidator(checkoutQrisSchema), checkOutQrisTransaction);

TransactionRoute.post('/checkout-va', userMiddleware,generalValidator(checkoutVASchema), validateSchema, checkOutVATransaction);

TransactionRoute.post('/update-status', updateStatusValidator, validateSchema, updateTransactionStatus);

TransactionRoute.post('/pickup', adminMiddleware,generalValidator(transactionIdSchema), validateSchema, requestPickupTransaction);

TransactionRoute.post('/delivery/detail', generalMiddleware, deliveryDetail);

TransactionRoute.post('/print/label', adminMiddleware, printLabel);

TransactionRoute.post('/analytic/sales', adminMiddleware, monthlySalesReport);

TransactionRoute.post('/analytic/all/month', adminMiddleware, allMonthSalesAnalytic);

TransactionRoute.post('/analytic/category', adminMiddleware, fetchSalesByCategory);

TransactionRoute.post('/update/delivery', updateTransactionDelivery);

export default TransactionRoute;