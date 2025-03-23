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
