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

export const getAllLoans = async (req, res, next) => {
  try {
      const loans = await Loan.find();
      res.status(200).json(loans);
  } catch (error) {
      next(error);
  }
};

export const getLoanById = async (req, res, next) => {
  try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) {
          return next({ status: 404, message: "Loan not found" });
      }
      res.status(200).json(loan);
  } catch (error) {
      next(error);
  }
};

export const updateLoan = async (req, res, next) => {
  try {
      const updatedLoan = await Loan.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          { new: true, runValidators: true }
      );
      if (!updatedLoan) {
          return next({ status: 404, message: "Loan not found" });
      }
      res.status(200).json({
          message: "Loan updated successfully",
          loan: updatedLoan
      });
  } catch (error) {
      next(error);
  }
};

export const deleteLoan = async (req, res, next) => {
  try {
      const loan = await Loan.findByIdAndDelete(req.params.id);
      if (!loan) {
          return next({ status: 404, message: "Loan not found" });
      }
      res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
      next(error);
  }
};