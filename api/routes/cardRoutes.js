import express from "express";
import {
    createCard,
    getAllCards 
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);
router.get("/", getAllCards);

export default router;
