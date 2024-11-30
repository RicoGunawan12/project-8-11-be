import express from 'express';
import { checkOutCreditTransaction, checkOutQrisTransaction, checkOutVATransaction, createTransaction, deliveryDetail, getAllTransactions, getTransactionById, getTransactionsByUser, printLabel, requestPickupTransaction, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, generalMiddleware, userMiddleware } from '../middleware/auth.middleware.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, createTransaction);

TransactionRoute.post('/checkout-credit', userMiddleware, checkOutCreditTransaction);

TransactionRoute.post('/checkout-qris', userMiddleware, checkOutQrisTransaction);

TransactionRoute.post('/checkout-va', userMiddleware, checkOutVATransaction);

TransactionRoute.post('/update-status', userMiddleware, updateTransactionStatus);

TransactionRoute.post('/pickup', adminMiddleware, requestPickupTransaction);

TransactionRoute.post('/delivery/detail', generalMiddleware, deliveryDetail);

TransactionRoute.post('/print/label', adminMiddleware, printLabel);

export default TransactionRoute;