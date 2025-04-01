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
