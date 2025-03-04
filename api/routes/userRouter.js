import express from 'express';
import { test, createUser,
    getUser,updateUser,getAllUsers, deleteUser
 } 
from "../controllers/userController.js";

const router = express.Router();

router.get('/test', test);
router.post('/createUser', createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get('/', getAllUsers);
router.delete("/:id", deleteUser);

export default router;