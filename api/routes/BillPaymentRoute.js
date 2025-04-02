import express from 'express';
import { createBillPayment,getAllBillPayments

 } 
from "../controllers/BillPaymentController.js";

const router = express.Router();

router.post('/', createBillPayment);
router.get('/', getAllBillPayments);

export default router;