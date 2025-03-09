import express from 'express';
import { createAccount,getAllAccounts,
    updateAccount
 } 
from "../controllers/accountController.js";

const router = express.Router();

router.post('/createAccount', createAccount);
router.get('/', getAllAccounts);
router.put("/:id", updateAccount);

export default router;