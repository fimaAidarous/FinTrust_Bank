import express from 'express';
import { test, createUser } 
from "../controllers/userController.js";

const router = express.Router();

router.get('/test', test);
router.post('/createUser', createUser);

export default router;