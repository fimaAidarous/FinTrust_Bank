import express from 'express';
import { createAccount,getAllAccounts,
    updateAccount,getAccount,deleteAccount
 } 
from "../controllers/accountController.js";

const router = express.Router();

router.post('/', createAccount);
router.get('/', getAllAccounts);
router.put("/:id", updateAccount);
router.get("/:id", getAccount);
router.delete("/:id", deleteAccount);

export default router;