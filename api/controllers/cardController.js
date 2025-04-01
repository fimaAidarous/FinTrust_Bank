import Card from "../Models/CardModel.js";
import User from "../Models/userModel.js";

export const createCard = async (req, res, next) => {
    try {
        const { user_id, card_number, card_type, cvv, expiry_date, status } = req.body;

        if (!expiry_date || isNaN(Date.parse(expiry_date))) {
            return res.status(400).json({ message: "Invalid or missing expiry_date" });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }

        const newCard = new Card({
            user_id,
            card_number,
            card_type,
            cvv,
            expiry_date: new Date(expiry_date),  
            status
        });

        await newCard.save();
        res.status(201).json({ message: "Card created successfully", card: newCard });
    } catch (error) {
        next(error);
    }
};

export const getAllCards = async (req, res, next) => {
    try {
        const cards = await Card.find().populate("user_id", "name email");
        if (cards.length === 0) {
            return res.status(404).json({ message: "No cards found" });
        }
        res.status(200).json(cards);
    } catch (error) {
        next(error);
    }
};

export const getCardById = async (req, res, next) => {
    try {
        const card = await Card.findById(req.params.id).populate("user_id", "name email");
        if (!card) {
            return next({ status: 404, message: "Card not found" });
        }
        res.status(200).json(card);
    } catch (error) {
        next(error);
    }
};

export const updateCard = async (req, res, next) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCard) {
            return next({ status: 404, message: "Card not found" });
        }
        res.status(200).json({
            message: "Card updated successfully",
            card: updatedCard
        });
    } catch (error) {
        next(error);
    }
};