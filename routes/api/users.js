// routes/api/users.js
import express from 'express';
import { signup } from '#controllers/users/signup.js';

const router = express.Router();

router.post('/signup', signup);

export default router;