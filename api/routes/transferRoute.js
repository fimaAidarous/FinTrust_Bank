import express from "express";
import { createTransfer,
} from "../controllers/transferController.js";

const router = express.Router();

router.post("/", createTransfer);

export default router;
