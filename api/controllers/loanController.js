import Loan from "../Models/loanModel.js"; 
import User from "../Models/userModel.js";

export const createLoan = async (req,res, next) => {
    try {
      const { user_id, amount, loan_type,status } = req.body;
      
      const user = await User.findById(user_id);
      if (!user) {
        return next ({ status: 404, message: "User not found"});
      }

      const newLoan = new Loan({
        user_id,
        amount,
        loan_type,
        status,
      });

      res.status(201).json({ message: "Loan created successfully",
        loan: newLoan});
    } catch (error) {
        next(error);
    }
};

