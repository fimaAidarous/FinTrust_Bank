import express from 'express';
import { test, createUser,
    getUser,updateUser
 } 
from "../controllers/userController.js";

const router = express.Router();

router.get('/test', test);
router.post('/createUser', createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;