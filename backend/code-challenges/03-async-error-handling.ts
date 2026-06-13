// ─────────────────────────────────────────────────────────────────────────────
// Backend Challenge 03 — Async Error Handling
//
// The goal: ensure async errors reach the central error handler safely, and the
// client always gets a safe message (never a raw stack trace).
//
// Part A — asyncHandler wrapper
// Write a higher-order function `asyncHandler(fn)` that:
//   - takes a RequestHandler that may return a Promise
//   - returns a new RequestHandler that catches any rejection and calls next(err)
// This is needed in Express 4 (Express 5 handles this automatically).
//
// Part B — central error handler
// Write a 4-argument Express error handler `errorHandler(err, req, res, next)` that:
//   - logs the full error server-side (console.error)
//   - sends 500 + { message: 'Internal server error' } to the client (safe, no stack trace)
//   - is mounted LAST in the Express app (after all routes)
//
// Part C — a route that uses it
// Write a `getUser` handler (wrapped with asyncHandler) that:
//   - awaits fetchUserFromDb(req.params.id) — provided below, can throw
//   - returns 200 + { user } on success
//
// Type-check: cd backend/code-challenges && npx tsc --noEmit
// ─────────────────────────────────────────────────────────────────────────────
import type { Request, Response, NextFunction, RequestHandler } from 'express';

// Provided — simulates a DB call that can throw
declare function fetchUserFromDb(id: string): Promise<{ id: string; name: string }>;

// ── Part A — asyncHandler ─────────────────────────────────────────────────────
export function asyncHandler(fn: RequestHandler): RequestHandler {
  // TODO: return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
  return fn; // remove this placeholder
}

// ── Part B — central error handler ───────────────────────────────────────────
// Express detects a 4-arg function as an error handler
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // TODO: console.error(err); res.status(500).json({ message: 'Internal server error' })
}

// ── Part C — route using asyncHandler ────────────────────────────────────────
export const getUser = asyncHandler(async (req, res) => {
  // TODO: const user = await fetchUserFromDb(req.params.id); res.json({ user })
});
