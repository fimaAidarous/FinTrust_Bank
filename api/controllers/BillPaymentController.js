import BillPayment from "../Models/BillPaymentModel.js";
import User from "../Models/UserModel.js";
import Account from "../Models/AccountModel.js";

export const createBillPayment = async (req, res, next) => {
    try {
        const { user_id, account_id, bill_type, amount } = req.body;

        const user = await User.findById(user_id);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }

        const account = await Account.findById(account_id);
        if (!account) {
            return next({ status: 404, message: "Account not found" });
        }

        const newBillPayment = new BillPayment({
            user_id,
            account_id,
            bill_type,
            amount,
            status: "pending"
        });

        await newBillPayment.save();
        res.status(201).json({ message: "Bill payment created successfully", billPayment: newBillPayment });
    } catch (error) {
        next(error);
    }
};

export const getAllBillPayments = async (req, res, next) => {
    try {
        const billPayments = await BillPayment.find().populate("user_id", "name email").populate("account_id", "account_name");
        if (billPayments.length === 0) {
            return res.status(404).json({ message: "No bill payments found" });
        }
        res.status(200).json(billPayments);
    } catch (error) {
        next(error);
    }
};

export const updateBillPayment = async (req, res, next) => {
    try {
        const updatedBillPayment = await BillPayment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBillPayment) {
            return next({ status: 404, message: "Bill payment not found" });
        }
        res.status(200).json({
            message: "Bill payment updated successfully",
            billPayment: updatedBillPayment
        });
    } catch (error) {
        next(error);
    }
};

export const getBillPaymentById = async (req, res, next) => {
    try {
        const billPayment = await BillPayment.findById(req.params.id).populate("user_id", "name email").populate("account_id", "account_name");
        if (!billPayment) {
            return next({ status: 404, message: "Bill payment not found" });
        }
        res.status(200).json(billPayment);
    } catch (error) {
        next(error);
    }
};