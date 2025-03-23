import express from "express";
import { createTransfer,getAllTransfers,
    deleteTransfer
} from "../controllers/transferController.js";

const router = express.Router();

router.post("/", createTransfer);
router.get("/", getAllTransfers);
router.delete("/:id", deleteTransfer);

export default router;
