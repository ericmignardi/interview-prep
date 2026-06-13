import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  register,
  login,
  logout,
  me,
} from '../controllers/authController';

export const authRouter = Router();

// POST /api/auth/register
authRouter.post('/register', register);

// POST /api/auth/login
authRouter.post('/login', login);

// POST /api/auth/logout
authRouter.post('/logout', logout);

// GET /api/auth/me  (protected)
authRouter.get('/me', authMiddleware, me);
