import express from 'express';
import { checkOutCreditTransaction, checkOutQrisTransaction, checkOutVATransaction, createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser, requestPickupTransaction, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { generalValidator } from './../validator/general/general.validator.js';
import { transactionSchema } from '../schema/model/transaction.schema.js';
import { validateSchema } from './../validator/validate.js';
import { checkoutCreditSchema } from '../schema/transaction/checkout/checkoutCredit.schema.js';
import { checkoutQrisSchema } from '../schema/transaction/checkout/checkoutQris.schema.js';
import { checkoutVASchema } from './../schema/transaction/checkout/checkoutVA.schema.js';
import { updateStatusValidator } from './../validator/transaction/updateStatus.validator.js';
import { transactionIdSchema } from '../schema/general/transactionId.schema.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, generalValidator(transactionSchema), validateSchema, createTransaction);

TransactionRoute.post('/checkout-credit', userMiddleware,generalValidator(checkoutCreditSchema), validateSchema, checkOutCreditTransaction);

TransactionRoute.post('/checkout-qris', userMiddleware, generalValidator(checkoutQrisSchema), checkOutQrisTransaction);

TransactionRoute.post('/checkout-va', userMiddleware,generalValidator(checkoutVASchema), validateSchema, checkOutVATransaction);

TransactionRoute.post('/update-status', userMiddleware, updateStatusValidator, validateSchema, updateTransactionStatus);

TransactionRoute.post('/pickup', adminMiddleware,generalValidator(transactionIdSchema), validateSchema, requestPickupTransaction);

export default TransactionRoute;
