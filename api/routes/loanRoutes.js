import express from "express";
import {
  createLoan,getAllLoans, getLoanById 
} from "../controllers/loanController.js"; 

const router = express.Router();

router.post("/", createLoan);
router.get('/', getAllLoans);
router.get("/:id", getLoanById);

export default router;
