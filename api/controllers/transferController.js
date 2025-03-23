import mongoose from "mongoose";
import Transfer from "../models/transferModel.js";
import Account from "../models/accountModel.js";
import { errorHandler } from "../utils/error.js";

export const createTransfer = async (req, res, next) => {
    const { from_account, to_account, amount, currency } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(from_account) || !mongoose.Types.ObjectId.isValid(to_account)) {
        return next(errorHandler(400, "Invalid account ID!"));
    }

    try {
        const senderAccount = await Account.findById(from_account);
        const receiverAccount = await Account.findById(to_account);

        if (!senderAccount || !receiverAccount) {
            return next(errorHandler(404, "One or both accounts not found!"));
        }

        if (senderAccount.balance < amount) {
            return next(errorHandler(400, "Insufficient balance!"));
        }

        senderAccount.balance -= amount;
        receiverAccount.balance += amount;

        await senderAccount.save();
        await receiverAccount.save();

        const newTransfer = new Transfer({ from_account, to_account, amount, currency, status: "completed" });
        await newTransfer.save();

        res.status(201).json("Transfer successful!");
    } catch (error) {
        next(error);
    }
};


export const getAllTransfers = async (req, res, next) => {
    try {
        const transfers = await Transfer.find()
            .populate("from_account", "account_number")
            .populate("to_account", "account_number");
        res.status(200).json(transfers);
    } catch (error) {
        next(error);
    }
};

export const deleteTransfer = async (req, res, next) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(errorHandler(400, "Invalid transfer ID!"));
    }

    try {
        const deletedTransfer = await Transfer.findByIdAndDelete(id);
        if (!deletedTransfer) return next(errorHandler(404, "Transfer not found!"));

        res.status(200).json("Transfer deleted successfully!");
    } catch (error) {
        next(error);
    }
};