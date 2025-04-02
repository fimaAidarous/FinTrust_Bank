import express from 'express';
import { createBillPayment,getAllBillPayments,
    updateBillPayment
 } 
from "../controllers/BillPaymentController.js";

const router = express.Router();

router.post('/', createBillPayment);
router.get('/', getAllBillPayments);
router.put("/:id", updateBillPayment);

export default router;