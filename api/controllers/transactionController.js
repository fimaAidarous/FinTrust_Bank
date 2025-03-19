import Transaction from "../Models/transactionModel .js";
import { errorHandler } from "../utils/error.js";

export const createTransaction = async (req,res, next) => {
    const { account_id, transaction_type, amount, currency, status } = req.body;
    try {
        const newTransaction = new Transaction({ account_id, transaction_type,
        amount, currency, status });
        await newTransaction.save();
        res.status(201).json("Transaction  created successfully!");
    } catch (error) {
        next(error);
    }
};

export const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find().populate("account_id", "account_number");
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};