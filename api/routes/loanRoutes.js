import express from "express";
import {
  createLoan,getAllLoans, getLoanById,
  updateLoan
} from "../controllers/loanController.js"; 

const router = express.Router();

router.post("/", createLoan);
router.get('/', getAllLoans);
router.get("/:id", getLoanById);
router.put("/:id", updateLoan);

export default router;
