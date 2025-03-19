import express from 'express';
import { createTransaction,getAllTransactions,
    getTransaction
 } 
from "../controllers/transactionController.js";

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get("/:id", getTransaction);

export default router;