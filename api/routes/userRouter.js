import express from 'express';
import { test, createUser,
    getUser
 } 
from "../controllers/userController.js";

const router = express.Router();

router.get('/test', test);
router.post('/createUser', createUser);
router.get("/:id", getUser);

export default router;