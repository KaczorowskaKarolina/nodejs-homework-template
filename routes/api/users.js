// routes/api/users.js
import express from 'express';
import { signup } from '#controllers/users/signup.js';
import { login } from '#controllers/users/login.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
