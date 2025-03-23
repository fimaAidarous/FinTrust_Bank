import express from "express";
import { createTransfer,getAllTransfers
    
} from "../controllers/transferController.js";

const router = express.Router();

router.post("/", createTransfer);
router.get("/", getAllTransfers);

export default router;
