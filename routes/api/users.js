// routes/api/users.js
import express from 'express';
import { signup } from '#controllers/users/signup.js';
import { login } from '#controllers/users/login.js';
import { logout } from '#controllers/users/logout.js';
import { currentUser } from '#controllers/users/currentUser.js'; 

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current', currentUser); 

export default router;
