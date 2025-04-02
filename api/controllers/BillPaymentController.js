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