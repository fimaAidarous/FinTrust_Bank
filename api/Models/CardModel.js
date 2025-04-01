import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    card_number: {
      type: String,
      required: true,
      unique: true,
    },
    card_type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
