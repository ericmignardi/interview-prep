// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 06 — Rate-Limited Route
//
// Add a per-user rate limit to an existing Express route: max 10 requests per
// minute. Return 429 with a friendly message when the limit is exceeded.
//
// Requirements:
// 1. Use `rateLimit` from express-rate-limit
// 2. Key by req.user?.userId (authenticated users) — fall back to req.ip
//    (This ensures limits are per-user, not per IP, for logged-in users)
// 3. windowMs: 60_000 (1 minute), max: 10
// 4. Custom handler: res.status(429).json({ message: 'Too many requests, slow down' })
// 5. Apply it as middleware on a specific route (not globally)
//
// Discussion points (talk through in the drill, no code needed):
// Q: Why does in-memory rate limiting break in a multi-server deployment?
// A: Each server process has its own counter map. If 3 servers split 30 requests,
//    each sees 10 — the limit is never hit. Use Redis (shared store) in production.
//
// Q: What's the difference between rate limiting at the app vs at the gateway?
// A: Gateway (nginx/Cloudflare) is cheaper — rejects before your Node process wakes.
//    App-level is easier to implement and key by business logic (userId vs IP).
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import { rateLimit } from 'express-rate-limit';
import type { Request } from 'express';

// TODO: create the rate limiter
export const spendLimiter = rateLimit({
  // windowMs: ...
  // max: ...
  // keyGenerator: (req: Request) => req.user?.userId ?? req.ip ?? 'unknown',
  // handler: (_req, res) => res.status(429).json({ message: '...' }),
});

// Usage in your router:
// import { authMiddleware } from './01-auth-middleware';
// import { spendCredit } from './05-atomic-spend';
// router.post('/api/credits/spend', authMiddleware, spendLimiter, spendCredit);
