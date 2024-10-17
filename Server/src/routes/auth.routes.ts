import express from 'express';
import { auth, signup } from '../controllers/auth.controller';
const authRouter = express.Router();

authRouter.post('/login',auth);
authRouter.post('/signup',signup);

export default authRouter;