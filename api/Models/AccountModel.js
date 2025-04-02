import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    account_number: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    account_type: {
      type: String,
      enum: ["savings", "current", "fixed_deposit"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "SHILLING"],
      default: "USD",
    },
    status: {
      type: String,
      enum: ["active", "suspended", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
