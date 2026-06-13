// ── M2: Auth Middleware ────────────────────────────────────────────────────────
// TODO (Milestone 2): Implement JWT cookie auth middleware
//
// 1. Read token from req.cookies.token
// 2. If no token → res.status(401).json({ message: 'Unauthorized - token required' }) + return
// 3. jwt.verify(token, process.env.JWT_SECRET!) inside try/catch
// 4. On success: req.user = payload as { userId: string }; next()
// 5. On failure: res.status(401).json({ message: 'Invalid token' })

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // TODO
  next(); // remove this when implemented
}
