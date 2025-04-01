import express from "express";
import {
    createCard,
    getAllCards,
    getCardById,
    updateCard,
    deleteCard 
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.get("/:id", getCardById);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;
