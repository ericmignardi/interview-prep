// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 01 — Auth Middleware
//
// Write Express middleware that authenticates requests via a JWT stored in an
// httpOnly cookie. This mirrors the real pattern in dropzone's authMiddleware.ts.
//
// Requirements:
// 1. Read the token from req.cookies.token (cookie-parser must be in the chain)
// 2. If no token → 401 { message: 'Unauthorized - token required' }
// 3. Verify with jwt.verify(token, process.env.JWT_SECRET!)
// 4. On success → attach the payload to req.user and call next()
// 5. On invalid/expired token → 401 { message: 'Invalid token' }
//
// Type augmentation: Express's Request type doesn't have `user` by default.
// You can either:
//   a) augment it inline with `declare global { namespace Express { ... } }`
//   b) cast `req` to a local interface that extends Request
// Option (a) is the real-world pattern (see src/types/express/index.d.ts in dropzone).
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Augment Express's Request type so req.user is recognized everywhere
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // TODO: implement
  // 1. const token = req.cookies?.token
  // 2. if (!token) → res.status(401).json(...)  and return
  // 3. try { req.user = jwt.verify(...) as { userId: string }; next(); }
  // 4. catch { res.status(401).json(...) }
}
