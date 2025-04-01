import express from "express";
import {
    createCard,
    getAllCards,
    getCardById,
    updateCard 
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.get("/:id", getCardById);
router.put("/:id", updateCard);

export default router;
