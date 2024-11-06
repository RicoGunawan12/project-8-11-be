import { getAllTransactionsService, getTransactionsByUserService } from "../services/transaction.service.js";


export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactionsService();
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTransactionsByUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const transactions = await getTransactionsByUserService(userId);
        return res.status(200).json({ message: "Transaction fetched successfully", transactions })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createTransaction = async (req, res) => {
    const { addressId, paymentMethod } = req.body;
    const userId = req.user.userId;

    if (!addressId) {
        return res.status(400).json({ message: "address id must be filled" });
    }
    else if (paymentMethod.length <= 0) {
        return res.status(400).json({ message: "Payment method must be filled" });
    }

    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}