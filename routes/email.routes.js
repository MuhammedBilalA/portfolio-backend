

import express from 'express';
import { sendMail } from '../controllers/emailController.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// Send email route
router.post('/send-email', sendMail);

export default router;