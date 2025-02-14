import express from 'express'
import { registerUser,loginUser } from '../controllers/userController.js';
// import userSchema from '../model/userSchema'

const router = express.Router()

router.post('/register' , registerUser);
router.post('/login' , loginUser);

export default router;