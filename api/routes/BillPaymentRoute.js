import express from 'express';
import { createBillPayment
 } 
from "../controllers/BillPaymentController.js";

const router = express.Router();

router.post('/', createBillPayment);

export default router;