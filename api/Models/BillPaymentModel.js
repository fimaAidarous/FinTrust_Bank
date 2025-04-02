import mongoose from "mongoose";

const billPaymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    account_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    bill_type: {
      type: String,
      enum: ["electricity", "water", "internet", "insurance"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BillPayment = mongoose.model("BillPayment", billPaymentSchema);

export default BillPayment;
