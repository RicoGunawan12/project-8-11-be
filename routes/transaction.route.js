import express from 'express';
import { generalValidator } from './../validator/general/general.validator.js';
import { transactionSchema } from '../schema/model/transaction.schema.js';
import { validateSchema } from './../validator/validate.js';
import { checkoutCreditSchema } from '../schema/transaction/checkout/checkoutCredit.schema.js';
import { checkoutQrisSchema } from '../schema/transaction/checkout/checkoutQris.schema.js';
import { checkoutVASchema } from './../schema/transaction/checkout/checkoutVA.schema.js';
import { updateStatusValidator } from './../validator/transaction/updateStatus.validator.js';
import { transactionIdSchema } from '../schema/general/transactionId.schema.js';
import { allMonthSalesAnalytic, cancelPaidTransaction, cancelTransaction, changeTransactionStatus, checkOutCreditTransaction, checkOutQrisTransaction, checkOutVATransaction, createTransaction, deliveryDetail, fetchSalesByCategory, getAllTransactions, getTransactionById, getTransactionCount, getTransactionsByUser, monthlySalesReport, onReviewReturnTransaction, onReviewTransaction, payTransaction, printLabel, refundTransaction, refundTransactionCallback, rejectReviewTransaction, requestPickupTransaction, returnTransaction, updateQRTransactionStatus, updateTransactionDelivery, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, generalMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { getSearchTransaction } from '../services/transaction.service.js';

const TransactionRoute = express.Router();


/* Web hook */
TransactionRoute.put('/update/delivery', updateTransactionDelivery);
TransactionRoute.post('/update-status', updateTransactionStatus);
TransactionRoute.post('/update-status-qr', updateQRTransactionStatus);
TransactionRoute.post('/update-refund', refundTransactionCallback);

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/count', adminMiddleware, getTransactionCount);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/searchTransaction', adminMiddleware, getSearchTransaction)

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, generalValidator(transactionSchema), validateSchema, createTransaction);

TransactionRoute.post('/checkout-credit', userMiddleware,generalValidator(checkoutCreditSchema), validateSchema, checkOutCreditTransaction);

TransactionRoute.post('/checkout-qris', userMiddleware, generalValidator(checkoutQrisSchema), checkOutQrisTransaction);

TransactionRoute.post('/checkout-va', userMiddleware,generalValidator(checkoutVASchema), validateSchema, checkOutVATransaction);


TransactionRoute.post('/pickup', adminMiddleware,generalValidator(transactionIdSchema), validateSchema, requestPickupTransaction);

TransactionRoute.post('/delivery/detail', generalMiddleware, deliveryDetail);

TransactionRoute.post('/print/label', adminMiddleware, printLabel);

TransactionRoute.post('/analytic/sales', adminMiddleware, monthlySalesReport);

TransactionRoute.post('/analytic/all/month', adminMiddleware, allMonthSalesAnalytic);

TransactionRoute.post('/analytic/category', adminMiddleware, fetchSalesByCategory);


TransactionRoute.put('/cancel/:id', generalMiddleware, cancelTransaction);

TransactionRoute.put('/paid/cancel/:id', adminMiddleware, cancelPaidTransaction);

TransactionRoute.put('/on-review-cancel/:id', userMiddleware, onReviewTransaction);

TransactionRoute.put('/on-review-return/:id', userMiddleware, onReviewReturnTransaction);

TransactionRoute.post('/pay', userMiddleware, payTransaction);

TransactionRoute.post('/return', adminMiddleware, returnTransaction);

TransactionRoute.post('/refund', adminMiddleware, refundTransaction);

TransactionRoute.put('/reject/:id', adminMiddleware, rejectReviewTransaction);

TransactionRoute.put('/change/:id', adminMiddleware, changeTransactionStatus);

export default TransactionRoute;