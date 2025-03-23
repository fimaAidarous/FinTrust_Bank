import express from "express";
import { createTransfer,getAllTransfers,
    deleteTransfer,getTransfer
} from "../controllers/transferController.js";

const router = express.Router();

router.post("/", createTransfer);
router.get("/", getAllTransfers);
router.delete("/:id", deleteTransfer);
router.get("/:id", getTransfer);
export default router;
