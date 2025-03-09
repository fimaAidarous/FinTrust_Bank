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

export const getAllAccounts = async (req, res, next) => {
    try {
      const accounts = await Account.find().populate("user_id", "email");
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
};

export const updateAccount = async (req, res, next) => {
    try {
      const updatedAccount = await Account.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedAccount) return next(errorHandler(404, "Account not found!"));
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  };