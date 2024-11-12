import express from 'express';
import { checkOutCreditTransaction, checkOutQrisTransaction, createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { createVATransactionXendit } from '../integration/xendit.integration.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, createTransaction);

TransactionRoute.post('/checkout-credit', userMiddleware, checkOutCreditTransaction);

TransactionRoute.post('/checkout-qris', userMiddleware, checkOutQrisTransaction);

TransactionRoute.post('/checkout-va', userMiddleware, createVATransactionXendit);

TransactionRoute.post('/test', userMiddleware, updateTransactionStatus);

export default TransactionRoute;
