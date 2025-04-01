import express from "express";
import {
    createCard,
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);

export default router;
