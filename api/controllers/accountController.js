import Account from "../models/accountModel.js";
import { errorHandler } from "../utils/error.js";

export const createAccount = async (req,res,next) => {
    const { account_number, user_id, 
        account_type, balance, currency, status
    } = req.body;
    try {
       const newAccount = new Account ({ account_number, user_id,
        account_type, balance, currency, status }); 
        await newAccount.save();
        res.status(201).json("Account created successfully!");
    } catch (error) {
        next(error);
    }
};