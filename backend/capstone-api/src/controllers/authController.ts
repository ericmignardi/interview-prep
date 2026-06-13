// ── M2: Auth Controllers ───────────────────────────────────────────────────────
// TODO (Milestone 2): Implement register, login, logout, me
//
// register:
//   1. Validate body with Zod: { email (email), name (string), password (min 8) }
//   2. Call authService.registerUser(data) — returns { user, token }
//   3. Set cookie: res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
//   4. Return 201 + { user }  (never return the token in the body — it's in the cookie)
//
// login:
//   1. Validate body: { email, password }
//   2. Call authService.loginUser(data) — returns { user, token } or throws 401
//   3. Set cookie + return 200 + { user }
//
// logout:
//   1. res.clearCookie('token')
//   2. Return 200 + { message: 'Logged out' }
//
// me:
//   1. req.user is set by authMiddleware
//   2. Call authService.getUserById(req.user!.userId)
//   3. Return 200 + { user }

import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as authService from '../services/authService';

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export function logout(_req: Request, res: Response): void {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO
  res.status(501).json({ message: 'Not implemented yet' });
}
