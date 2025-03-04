import express from 'express';
import { test, createUser,
    getUser,updateUser,getAllUsers 
 } 
from "../controllers/userController.js";

const router = express.Router();

router.get('/test', test);
router.post('/createUser', createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get('/', getAllUsers);

export default router;