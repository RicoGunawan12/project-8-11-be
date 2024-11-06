import express from 'express';
import { createTransaction, getAllTransactions, getTransactionsByUser } from '../controllers/transaction.controller.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';

const TransactionRoute = express.Router();

TransactionRoute.get('/', adminMiddleware, getAllTransactions);

TransactionRoute.get('/user', userMiddleware, getTransactionsByUser);

TransactionRoute.post('/', userMiddleware, createTransaction);

export default TransactionRoute;
