import express from 'express';
import { createBillPayment,getAllBillPayments,
    updateBillPayment, getBillPaymentById
 } 
from "../controllers/BillPaymentController.js";

const router = express.Router();

router.post('/', createBillPayment);
router.get('/', getAllBillPayments);
router.put("/:id", updateBillPayment);
router.get("/:id", getBillPaymentById);

export default router;