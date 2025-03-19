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

export const getTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("account_id", "account_number");
        if (!transaction) return next(errorHandler(404, "Transaction not found!"));
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req, res, next) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedTransaction) return next(errorHandler(404, "Transaction not found!"));
        res.status(200).json({ message: "Transaction updated successfully!", updatedTransaction });
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return next(errorHandler(404, "Transaction not found!"));
        res.status(200).json("Transaction deleted successfully!");
    } catch (error) {
        next(error);
    }
};