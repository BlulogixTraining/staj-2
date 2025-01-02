import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Route to register a new user
router.post('/register', register);

// Route to login an existing user
router.post('/login', login);

export default router;
