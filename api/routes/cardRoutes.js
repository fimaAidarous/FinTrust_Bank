import express from "express";
import {
    createCard,
    getAllCards,
    getCardById
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);
router.get("/", getAllCards);
router.get("/:id", getCardById);

export default router;
