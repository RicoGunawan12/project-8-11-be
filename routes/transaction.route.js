import express from 'express';
import { checkOutTransaction, createTransaction, getAllTransactions, getTransactionById, getTransactionsByUser, updateTransactionStatus } from '../controllers/transaction.controller.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.get('/:id', userMiddleware, getTransactionById);

TransactionRoute.post('/', userMiddleware, createTransaction);

TransactionRoute.post('/checkout', userMiddleware, checkOutTransaction);

TransactionRoute.post('/test', userMiddleware, updateTransactionStatus);

export default TransactionRoute;
