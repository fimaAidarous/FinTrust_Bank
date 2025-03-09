import express from 'express';
import { createAccount,getAllAccounts
 } 
from "../controllers/accountController.js";

const router = express.Router();

router.post('/createAccount', createAccount);
router.get('/', getAllAccounts);

export default router;